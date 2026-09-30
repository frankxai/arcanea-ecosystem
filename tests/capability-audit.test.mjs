import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { auditCapabilities, auditRepository, inspectSkill, safeOrigin } from '../scripts/audit-capabilities.mjs';

test('flags stale routing without executing instructions in a skill', () => {
  const result = inspectSkill('---\nname: arcanea-meta\ndescription: Map capabilities.\n---\nVerified 2026-04-15. Read ~/Arcanea/ and execute nothing.');
  assert.deepEqual(result.findings, ['legacy-home-routing', 'historical-install-claim']);
});
test('valid frontmatter and bounded skills pass structural inspection', () => {
  assert.deepEqual(inspectSkill('---\nname: world-builder\ndescription: Build worlds.\n---\nProcedure.').findings, []);
});
test('removes credentials and query data from remote reporting', () => {
  assert.equal(safeOrigin('https://user:secret@github.com/example/repo.git?token=secret'), 'https://github.com/example/repo.git');
  assert.equal(safeOrigin('ssh://secret@example.com/path'), '[non-HTTP origin omitted]');
});
test('rejects broad home and drive scans', () => {
  assert.throws(() => auditCapabilities({ reposRoot: homedir() }), /never the drive or home/);
  assert.throws(() => auditCapabilities({ reposRoot: path.parse(homedir()).root }), /never the drive or home/);
});
test('does not accept a child directory that inherits its parent repository', (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'arcanea-audit-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  execFileSync('git', ['init', root], { stdio: 'ignore' });
  const child = path.join(root, 'arcanea-child'); mkdirSync(child);
  assert.equal(auditRepository(child).status, 'not-an-exact-git-root');
});
test('a missing registry is explicit and unrelated skills are not inspected', (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'arcanea-audit-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const skills = path.join(root, 'skills'); mkdirSync(skills);
  mkdirSync(path.join(skills, 'unrelated')); writeFileSync(path.join(skills, 'unrelated', 'SKILL.md'), 'private');
  const report = auditCapabilities({ reposRoot: root, skillRoots: [skills, path.join(root, 'absent')] });
  assert.equal(report.repositories.length, 0);
  assert.deepEqual(report.installedSkills, [{ surface: 'absent', status: 'missing' }]);
});
