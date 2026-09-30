import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const defaultRepos = path.resolve(import.meta.dirname, '../..');
const relevantSkill = /arcanea|arcanean|canon-first|canon-guardian|cinematic-image|emotional-story|social-asset|visual-quality|wonder-series/;

export function inspectSkill(text) {
  const findings = [];
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  if (!frontmatter) findings.push('missing-frontmatter');
  const name = frontmatter?.match(/^name:\s*(.+)$/m)?.[1]?.trim().replace(/^['"]|['"]$/g, '');
  if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) findings.push('invalid-skill-name');
  if (!frontmatter?.match(/^description:\s*\S/m)) findings.push('missing-description');
  const lines = text.split(/\r?\n/).length;
  if (lines > 500) findings.push('over-500-lines');
  if (/~[\\/](?:Arcanea|agentic-creator-os|sources)[\\/]/i.test(text)) findings.push('legacy-home-routing');
  if (/\b(?:verified|installed)\s+(?:on\s+)?2026-0[1-4]-\d\d/i.test(text)) findings.push('historical-install-claim');
  return { name: name ?? null, lines, stub: text.includes('(installed stub)'), sha256: createHash('sha256').update(text).digest('hex'), findings };
}

function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', timeout: 10000, maxBuffer: 8 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

export function safeOrigin(value) {
  if (/^https?:\/\//i.test(value)) {
    const url = new URL(value);
    url.username = ''; url.password = ''; url.search = ''; url.hash = '';
    return url.toString();
  }
  if (/^git@github\.com:[\w.-]+\/[\w.-]+(?:\.git)?$/.test(value)) return value;
  return value ? '[non-HTTP origin omitted]' : null;
}

function readSkill(file, relative) {
  try {
    if (lstatSync(file).size > 512 * 1024) return { path: relative, findings: ['over-size-limit'] };
    return { path: relative, ...inspectSkill(readFileSync(file, 'utf8')) };
  } catch { return { path: relative, findings: ['unreadable-skill'] }; }
}

export function auditRepository(directory) {
  const name = path.basename(directory);
  try {
    const resolved = realpathSync(directory);
    const top = realpathSync(git(directory, ['rev-parse', '--show-toplevel']));
    if (resolved !== top) return { name, status: 'not-an-exact-git-root' };
    const paths = git(directory, ['ls-files', '--cached', '--others', '--exclude-standard', '-z']).split('\0').filter(Boolean);
    const skillPaths = [...new Set(paths.filter(file => /(?:^|\/)SKILL\.md$/.test(file) && !/(?:^|\/)(?:node_modules|\.worktrees|dist|council)\//.test(file)))].sort();
    const packages = paths.filter(file => /(?:^|\/)package\.json$/.test(file) && !/(?:node_modules|\.worktrees|dist)\//.test(file));
    const mcpPackages = [];
    for (const file of packages) {
      try {
        const pkg = JSON.parse(readFileSync(path.join(directory, file), 'utf8'));
        if (/mcp/i.test(`${file} ${pkg.name ?? ''}`)) mcpPackages.push({ path: file, name: pkg.name, version: pkg.version, private: pkg.private === true });
      } catch { /* A malformed unrelated package is not interpreted as an MCP. */ }
    }
    return {
      name, status: 'inspected', commit: git(directory, ['rev-parse', 'HEAD']), branch: git(directory, ['branch', '--show-current']),
      origin: safeOrigin(git(directory, ['remote', 'get-url', 'origin'])),
      skills: skillPaths.map(file => readSkill(path.join(directory, file), file)), mcpPackages,
      pluginManifests: paths.filter(file => /(?:^|\/)(?:\.codex-plugin|\.claude-plugin)\/plugin\.json$/.test(file)).sort(),
      mcpConfigPaths: paths.filter(file => /(?:^|\/)\.mcp\.json(?:\.example)?$/.test(file)).sort(),
    };
  } catch { return { name, status: 'unavailable-or-not-git' }; }
}

export function auditCapabilities({ reposRoot = defaultRepos, skillRoots = [] } = {}) {
  const base = realpathSync(reposRoot);
  if (base === path.parse(base).root || base === realpathSync(homedir())) throw new Error('Select a repository estate directory, never the drive or home root');
  const directories = readdirSync(base, { withFileTypes: true }).filter(entry => entry.isDirectory() && /arcanea/i.test(entry.name)).map(entry => path.join(base, entry.name));
  const repositories = directories.sort().map(auditRepository);
  const installedSkills = [];
  for (const root of skillRoots) {
    if (!existsSync(root)) { installedSkills.push({ surface: path.basename(root), status: 'missing' }); continue; }
    const resolved = realpathSync(root);
    if (resolved === path.parse(resolved).root || resolved === realpathSync(homedir())) throw new Error('Select an exact skill registry, never the drive or home root');
    for (const name of readdirSync(root).filter(name => relevantSkill.test(name)).sort()) {
      const file = path.join(root, name, 'SKILL.md');
      if (existsSync(file)) installedSkills.push({ surface: path.basename(path.dirname(root)), ...readSkill(file, `${name}/SKILL.md`) });
    }
  }
  return {
    schemaVersion: 'arcanea.capability-audit.v1', observedAt: new Date().toISOString(),
    scope: 'Immediate Arcanea-named repositories and explicitly supplied skill registries. Files indicate presence, not working tools, unique capabilities, registry publication, or live deployment. Config contents and environment values are never read.',
    repositoryCount: repositories.length,
    skillFileCount: repositories.reduce((sum, repo) => sum + (repo.skills?.length ?? 0), 0),
    installedSkillCount: installedSkills.length, repositories, installedSkills,
  };
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const { values } = parseArgs({ options: { 'repos-root': { type: 'string' }, 'skills-root': { type: 'string', multiple: true } }, allowPositionals: false });
    console.log(JSON.stringify(auditCapabilities({ reposRoot: values['repos-root'], skillRoots: values['skills-root'] }), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
