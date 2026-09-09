import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { auditRepository, inspectSkill } from './audit-capabilities.mjs';

const relevantName = /arcanea|arcanean|canon-first|canon-guardian|cinematic-image|emotional-story|social-asset|visual-quality|wonder-series|^lumina$|^nero$/i;
const maxBytes = 512 * 1024;

function safeRoot(root) {
  const resolved = realpathSync(root);
  if (resolved === path.parse(resolved).root || resolved === realpathSync(homedir())) {
    throw new Error('Select an exact skill registry or pack, never the drive or home root');
  }
  if (!lstatSync(resolved).isDirectory()) throw new Error('Expected a directory');
  return resolved;
}

function contained(root, file) {
  const relative = path.relative(root, file);
  return relative === '' || !path.isAbsolute(relative) && relative !== '..' && !relative.startsWith(`..${path.sep}`);
}

function boundedText(file) {
  const stat = lstatSync(file);
  if (!stat.isFile() || stat.size > maxBytes) throw new Error('Expected a regular file no larger than 512 KiB');
  return readFileSync(file, 'utf8');
}

/** Only inspect explicit reference paths. Never execute commands or follow web links. */
export function localReferences(text, skillFile) {
  const withoutExamples = text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
  const matches = [
    ...withoutExamples.matchAll(/`([^`\r\n]+)`/g),
    ...withoutExamples.matchAll(/\[[^\]\r\n]*\]\(([^)\r\n]+)\)/g),
  ];
  const references = new Map();
  for (const match of matches) {
    const reference = match[1].replace(/^<|>$/g, '').split('#')[0];
    if (!/^(?:\.\.?\/)*(?:references|templates|scripts|agents)\/[^<>*]+\.(?:md|json|mjs|js|py|ya?ml|png|jpe?g|svg)$/.test(reference)) continue;
    const lineStart = withoutExamples.lastIndexOf('\n', match.index) + 1;
    const prefix = withoutExamples.slice(lineStart, match.index);
    const ownerSkill = prefix.match(/\b(?:see|via|from)\s+`([a-z0-9-]+)`\s*(?:→|->)\s*$/i)?.[1];
    const present = existsSync(path.resolve(path.dirname(skillFile), reference));
    references.set(`${ownerSkill ?? ''}:${reference}`, {
      reference,
      status: ownerSkill ? 'context-required' : present ? 'present' : reference.startsWith('scripts/') ? 'context-required' : 'missing',
      ...(ownerSkill ? { ownerSkill } : {}),
    });
  }
  return [...references.values()].sort((left, right) => left.reference.localeCompare(right.reference));
}

function stubTarget(text) {
  if (!text.includes('(installed stub)')) return null;
  return text.match(/\*\*Full skill path \(authoritative\):\*\*\s*`([^`]+)`/)?.[1] ?? null;
}

function inspectFile(file, context) {
  const resolved = realpathSync(file);
  const text = boundedText(resolved);
  return {
    ...context,
    path: file,
    realPath: resolved,
    ...inspectSkill(text),
    normalizedSha256: createHash('sha256').update(text.replace(/\r\n/g, '\n')).digest('hex'),
    references: localReferences(text, resolved),
    ...(text.includes('(installed stub)') ? { stubTarget: stubTarget(text) } : {}),
  };
}

function packSkills(root, origin, entries, errors, knownPacks) {
  let resolved;
  try { resolved = safeRoot(root); }
  catch { errors.push({ path: root, kind: 'invalid-pack-root' }); return; }
  knownPacks.add(resolved);
  let manifest = null;
  const manifestPath = path.join(resolved, '.codex-plugin', 'plugin.json');
  if (existsSync(manifestPath)) {
    try { manifest = JSON.parse(boundedText(manifestPath)); }
    catch { errors.push({ path: manifestPath, kind: 'invalid-plugin-manifest' }); return; }
  }
  // Use the standard skills/ directory; do not execute or trust manifest tool paths.
  const directory = path.join(resolved, 'skills');
  if (!existsSync(directory)) { errors.push({ path: root, kind: 'missing-pack-skills' }); return; }
  const skillsRoot = realpathSync(directory);
  if (!contained(resolved, skillsRoot)) { errors.push({ path: directory, kind: 'pack-skills-outside-root' }); return; }
  for (const name of readdirSync(skillsRoot).sort()) {
    const skillFile = path.join(skillsRoot, name, 'SKILL.md');
    if (!existsSync(skillFile)) continue;
    try {
      if (!contained(resolved, realpathSync(skillFile))) throw new Error('External pack member');
      entries.push(inspectFile(skillFile, {
        origin, kind: 'pack-skill', packRoot: resolved,
        pluginName: typeof manifest?.name === 'string' ? manifest.name : null,
        pluginVersion: typeof manifest?.version === 'string' ? manifest.version : null,
      }));
    } catch { errors.push({ path: skillFile, kind: 'unreadable-or-external-pack-skill' }); }
  }
}

/** Read only named surfaces. A pack is presence evidence, never activation evidence. */
export function auditSkillDelivery({ skillRoots = [], packRoots = [], repos = [] } = {}) {
  if (!skillRoots.length && !packRoots.length && !repos.length) throw new Error('Supply at least one exact skill-root, pack-root or repo');
  const entries = [];
  const errors = [];
  const knownPacks = new Set();
  const repositories = [];
  for (const root of repos) {
    const resolved = safeRoot(root);
    const repository = auditRepository(resolved);
    const { skills, ...metadata } = repository;
    repositories.push({ path: root, ...metadata });
    if (repository.status !== 'inspected') { errors.push({ path: root, kind: repository.status }); continue; }
    for (const skill of skills) {
      const file = path.join(resolved, skill.path);
      try { entries.push(inspectFile(file, { origin: root, kind: 'repository-source', sourceCommit: repository.commit, sourceBranch: repository.branch })); }
      catch { errors.push({ path: file, kind: 'unreadable-source-skill' }); }
    }
  }
  for (const root of packRoots) packSkills(root, root, entries, errors, knownPacks);
  for (const root of skillRoots) {
    // Broad-root mistakes are hard errors, not an invitation to scan deeper.
    if (!existsSync(root)) { errors.push({ path: root, kind: 'missing-skill-root' }); continue; }
    const resolved = safeRoot(root);
    for (const name of readdirSync(resolved).filter((name) => relevantName.test(name)).sort()) {
      const directory = path.join(resolved, name);
      const file = path.join(directory, 'SKILL.md');
      const hasSkill = existsSync(file);
      const hasPack = existsSync(path.join(directory, 'skills'));
      if (!hasSkill && !hasPack) {
        errors.push({ path: directory, kind: 'missing-or-unreadable-skill-entry' });
        continue;
      }
      if (hasSkill) {
        try { entries.push(inspectFile(file, { origin: root, kind: 'flat-skill' })); }
        catch { errors.push({ path: file, kind: 'unreadable-skill' }); }
      }
      if (hasPack) {
        packSkills(directory, root, entries, errors, knownPacks);
      }
    }
  }
  for (const entry of entries.filter((entry) => entry.stub)) {
    if (!entry.stubTarget || !path.isAbsolute(entry.stubTarget)) {
      entry.targetStatus = 'missing-or-nonabsolute-stub-target'; continue;
    }
    const target = path.resolve(entry.stubTarget);
    if (![...knownPacks].some((root) => contained(root, target))) {
      entry.targetStatus = 'stub-target-outside-explicit-pack-scope'; continue;
    }
    if (!existsSync(target)) { entry.targetStatus = 'missing-stub-target'; continue; }
    try {
      const resolved = realpathSync(target);
      if (![...knownPacks].some((root) => contained(root, resolved))) {
        entry.targetStatus = 'stub-target-outside-explicit-pack-scope'; continue;
      }
      const targetSkill = inspectSkill(boundedText(resolved));
      entry.targetStatus = targetSkill.name === entry.name && !targetSkill.stub ? 'resolved' : 'stub-target-identity-mismatch';
      entry.targetSha256 = targetSkill.sha256;
    } catch { entry.targetStatus = 'unreadable-stub-target'; }
  }
  for (const entry of entries) {
    for (const reference of entry.references.filter((reference) => reference.ownerSkill)) {
      const candidates = entries.filter((candidate) => candidate.name === reference.ownerSkill && candidate.origin === entry.origin && !candidate.stub);
      if (candidates.length !== 1) continue;
      reference.status = existsSync(path.resolve(path.dirname(candidates[0].realPath), reference.reference)) ? 'present' : 'missing';
      reference.resolvedOwner = candidates[0].realPath;
    }
  }
  const grouped = new Map();
  for (const entry of entries.filter((entry) => entry.name && !entry.stub)) {
    const group = grouped.get(entry.name) ?? [];
    group.push(entry);
    grouped.set(entry.name, group);
  }
  const variants = [...grouped.entries()]
    .filter(([, group]) => new Set(group.map((entry) => entry.normalizedSha256)).size > 1)
    .map(([name, group]) => ({
      name,
      distinctBodies: new Set(group.map((entry) => entry.normalizedSha256)).size,
      entries: group.map(({ path, origin, normalizedSha256, pluginName, pluginVersion }) => ({ path, origin, normalizedSha256, pluginName, pluginVersion })),
      meaning: 'Different bodies share a skill name. Namespacing and host loading determine whether they compete; inspect before changing either.',
    }));
  return {
    schemaVersion: 'arcanea.skill-delivery-audit.v1',
    observedAt: new Date().toISOString(),
    scope: 'Named skill registries, relevant immediate entries and their standard nested skills/ packs, explicit pack roots, and Git-listed skills in exact repositories. Git metadata is read; no skill commands, config contents, credentials, network requests or recursive estate scan.',
    limitations: 'References are explicit Markdown/code-span paths, excluding fenced examples. Structural checks are heuristics, not a YAML parser or capability certification. Cache presence does not prove enabled installation. Scope omissions require explicit additional roots.',
    entryCount: entries.length,
    uniquePhysicalFiles: new Set(entries.map((entry) => entry.realPath)).size,
    stubCount: entries.filter((entry) => entry.stub).length,
    resolvedStubCount: entries.filter((entry) => entry.targetStatus === 'resolved').length,
    missingReferenceCount: entries.reduce((count, entry) => count + entry.references.filter((reference) => reference.status === 'missing').length, 0),
    contextRequiredCount: entries.reduce((count, entry) => count + entry.references.filter((reference) => reference.status === 'context-required').length, 0),
    variantCount: variants.length,
    repositories, entries, variants, errors,
  };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const { values } = parseArgs({ options: { 'skill-root': { type: 'string', multiple: true }, 'pack-root': { type: 'string', multiple: true }, repo: { type: 'string', multiple: true } }, allowPositionals: false });
    const report = auditSkillDelivery({ skillRoots: values['skill-root'], packRoots: values['pack-root'], repos: values.repo });
    console.log(JSON.stringify(report, null, 2));
    if (report.errors.length) process.exitCode = 1;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
