import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { auditSkillDelivery, localReferences } from '../scripts/audit-skill-delivery.mjs';

const skill = (name, body = 'Use for creating a world.') => `---\nname: ${name}\ndescription: Create and inspect a world.\n---\n${body}\n`;
function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'arcanea-skill-delivery-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (relative, content) => {
    const file = path.join(root, relative);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, content);
    return file;
  };
  return { root, write };
}

test('finds nested pack skills, preserves namespace and counts physical files separately', (t) => {
  const { root, write } = fixture(t);
  const file = write('registry/arcanea-pack/skills/world-builder/SKILL.md', skill('world-builder'));
  write('registry/arcanea-pack/.codex-plugin/plugin.json', JSON.stringify({ name: 'arcanea-pack', version: '1.0.0' }));
  write('registry/arcanea-pack/SKILL.md', skill('arcanea-pack'));
  const report = auditSkillDelivery({ skillRoots: [path.join(root, 'registry')], packRoots: [path.join(root, 'registry/arcanea-pack')] });
  assert.equal(report.entryCount, 3);
  assert.equal(report.uniquePhysicalFiles, 2);
  assert.equal(report.variantCount, 0);
  assert.equal(report.entries.find((entry) => entry.path === file).pluginVersion, '1.0.0');
  assert.deepEqual(report.errors, []);
});

test('resolves a managed stub only against a selected pack with matching identity', (t) => {
  const { root, write } = fixture(t);
  const full = write('pack/skills/canon-guardian/SKILL.md', skill('canon-guardian'));
  const stub = skill('canon-guardian', `# Canon Guardian (installed stub)\n\n**Full skill path (authoritative):**\n\`${full.replaceAll('\\', '/')}\``);
  const stubFile = write('registry/canon-guardian/SKILL.md', stub);
  const before = readFileSync(stubFile);
  const options = { skillRoots: [path.join(root, 'registry')], packRoots: [path.join(root, 'pack')] };
  assert.equal(auditSkillDelivery(options).resolvedStubCount, 1);
  assert.deepEqual(readFileSync(stubFile), before);
  assert.equal(auditSkillDelivery({ skillRoots: options.skillRoots }).entries[0].targetStatus, 'stub-target-outside-explicit-pack-scope');
  write('pack/skills/canon-guardian/SKILL.md', skill('different-name'));
  assert.equal(auditSkillDelivery(options).entries.find((entry) => entry.stub).targetStatus, 'stub-target-identity-mismatch');
});

test('reports missing stub targets and missing resources without executing instructions', (t) => {
  const { root, write } = fixture(t);
  write('pack/skills/world/SKILL.md', skill('world', 'Read `../../references/canon.md` and [brief](../../templates/brief.md#section).'));
  write('pack/references/canon.md', 'Source.');
  const missing = path.join(root, 'pack/skills/absent/SKILL.md');
  write('registry/canon-guardian/SKILL.md', skill('canon-guardian', `# Canon (installed stub)\n**Full skill path (authoritative):**\n\`${missing.replaceAll('\\', '/')}\``));
  const report = auditSkillDelivery({ skillRoots: [path.join(root, 'registry')], packRoots: [path.join(root, 'pack')] });
  assert.equal(report.missingReferenceCount, 1);
  assert.equal(report.entries.find((entry) => entry.stub).targetStatus, 'missing-stub-target');
});

test('reference check ignores web links, commands and fenced examples', (t) => {
  const { root, write } = fixture(t);
  const file = write('skill/SKILL.md', '');
  write('skill/references/existing.md', 'Reference.');
  const text = '[Web](https://example.org/references/remote.md)\n`node scripts/command.mjs`\n```sh\n`references/example.md`\n```\n`references/existing.md`\n[Missing](references/missing.md)';
  assert.deepEqual(localReferences(text, file), [
    { reference: 'references/existing.md', status: 'present' },
    { reference: 'references/missing.md', status: 'missing' },
  ]);
});

test('different full bodies are variants; line endings and discovery stubs are not', (t) => {
  const { root, write } = fixture(t);
  write('one/canon-guardian/SKILL.md', skill('canon-guardian', 'Original.'));
  write('two/canon-guardian/SKILL.md', skill('canon-guardian', 'Original.').replaceAll('\n', '\r\n'));
  write('three/canon-guardian/SKILL.md', skill('canon-guardian', 'Different.'));
  const report = auditSkillDelivery({ skillRoots: ['one', 'two', 'three'].map((name) => path.join(root, name)) });
  assert.equal(report.variantCount, 1);
  assert.equal(report.variants[0].distinctBodies, 2);
  assert.match(report.variants[0].meaning, /Namespacing/);
});

test('qualified companion paths resolve through that skill and repository commands stay contextual', (t) => {
  const { root, write } = fixture(t);
  write('registry/arcanea-companion/SKILL.md', skill('arcanea-companion'));
  write('registry/arcanea-companion/references/canon.md', 'Canon.');
  write('registry/arcanea-entry/SKILL.md', skill('arcanea-entry', 'See `arcanea-companion` → `references/canon.md`\nRun `scripts/audit.mjs` from the named repository.'));
  const report = auditSkillDelivery({ skillRoots: [path.join(root, 'registry')] });
  assert.equal(report.missingReferenceCount, 0);
  assert.equal(report.contextRequiredCount, 1);
  const reference = report.entries.find((entry) => entry.name === 'arcanea-entry').references.find((reference) => reference.ownerSkill);
  assert.equal(reference.status, 'present');
  assert.match(reference.resolvedOwner, /arcanea-companion/);
});

test('invalid and missing surfaces are explicit; unrelated registry entries stay unread', (t) => {
  const { root, write } = fixture(t);
  write('registry/unrelated/SKILL.md', 'Not a skill, intentionally.');
  write('broken/.codex-plugin/plugin.json', '{');
  const report = auditSkillDelivery({ skillRoots: [path.join(root, 'registry'), path.join(root, 'missing')], packRoots: [path.join(root, 'broken')] });
  assert.equal(report.entryCount, 0);
  assert.deepEqual(report.errors.map((error) => error.kind).sort(), ['invalid-plugin-manifest', 'missing-skill-root']);
  assert.throws(() => auditSkillDelivery(), /Supply at least one/);
  assert.throws(() => auditSkillDelivery({ skillRoots: [homedir()] }), /never the drive or home/);
  assert.equal(auditSkillDelivery({ packRoots: [homedir()] }).errors[0].kind, 'invalid-pack-root');
});

test('oversized skill files fail closed with a bounded error', (t) => {
  const { root, write } = fixture(t);
  write('registry/arcanea-oversized/SKILL.md', 'x'.repeat(512 * 1024 + 1));
  const report = auditSkillDelivery({ skillRoots: [path.join(root, 'registry')] });
  assert.equal(report.entryCount, 0);
  assert.equal(report.errors[0].kind, 'unreadable-skill');
});

test('a relevant but incomplete registry entry is not silently counted as absent', (t) => {
  const { root, write } = fixture(t);
  write('registry/arcanea-incomplete/README.md', 'No skill entrypoint.');
  const report = auditSkillDelivery({ skillRoots: [path.join(root, 'registry')] });
  assert.equal(report.entryCount, 0);
  assert.equal(report.errors[0].kind, 'missing-or-unreadable-skill-entry');
});

test('an exact repository includes Git-listed skills even without Arcanea in their names', (t) => {
  const { root, write } = fixture(t);
  write('repo/skills/scene/SKILL.md', skill('scene'));
  const repository = path.join(root, 'repo');
  const git = (...args) => execFileSync('git', args, { cwd: repository, stdio: 'ignore' });
  git('init');
  git('remote', 'add', 'origin', 'https://github.com/example/arcanea-fixture.git');
  git('add', 'skills/scene/SKILL.md');
  git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-m', 'Add fixture skill');
  const report = auditSkillDelivery({ repos: [repository] });
  assert.equal(report.entryCount, 1);
  assert.equal(report.entries[0].kind, 'repository-source');
  assert.equal(report.entries[0].name, 'scene');
  assert.match(report.entries[0].sourceCommit, /^[a-f0-9]{40}$/);
  assert.deepEqual(report.errors, []);
});
