# Blockers — needs Frank (2026-06-03)

Things I could not resolve autonomously overnight. Ordered by leverage. Each has the exact action.

## 1. Grant `workflow` scope so CI can land (30 sec) — unlocks 4 repos

The `gh` token has `repo, read:org, gist` but **not `workflow`**, so GitHub rejected every push
that adds `.github/workflows/*.yml`. The CI files are **written and waiting on disk** in:
`claude-code-hooks`, `mcp-doctor`, `agentic-creator-os` (and one ready for SIS).

```
gh auth refresh -h github.com -s workflow
```

Then, per repo: `git add .github/workflows/harness.yml && git commit -m "ci: harness gate" && git push`
(or ping me and I'll finish all of them once the scope is live).

## 2. No container runtime → Langfuse (L5) could not be stood up

Docker and Podman are both absent. Langfuse self-host (the planned observability layer) needs a
container runtime, so **no production traces were captured** — the L5 success criterion is unmet,
honestly. Frank prefers Podman (per global prefs). Action (your call):

```
winget install RedHat.Podman-Desktop    # then: podman machine init && podman machine start
```

Once a runtime exists I can: bring up Langfuse via compose, wire OpenInference/OTel into
mcp-doctor + SIS MCP servers, and capture a trace per server.

## 3. SIS build is red — 2-line fix on your active branch (I did not touch your WIP)

`src/cli.ts:323` and `:325` — `execSync(...)` returns `string | Buffer`; `.trim()` fails the
type check. Fix: pass `{ encoding: "utf8" }` to those `execSync` calls (or wrap `String(...)`).
I left it alone because `docs/drift-fixes-2026-05-26` has 58 dirty files and looked mid-edit.
This is the single highest-leverage fix in the ecosystem (flips the most mature repo to green).

## 4. ACOS harness PR could not be opened cleanly

The harness commit is on `origin/harness/buildout-2026-06-03`, but it's **stacked on 3 unpushed
`feat/workflow-tier` commits** (that branch isn't on the remote), so a clean PR base didn't exist.
To land my one commit (`9739c2f`):
- **Option A:** `git push origin feat/workflow-tier`, then open PR `harness/buildout-2026-06-03 → feat/workflow-tier`.
- **Option B:** cherry-pick `9739c2f` onto `main` and PR that.

## 5. Decisions only you can make

- **suno-mcp-server:** implement for real (needs Suno API credentials + a build) or archive? As
  published it would fail on run. Don't market it as working until decided.
- **ACOS "8 plugins":** is there a plugin set I couldn't find (no `marketplace.json` exists), or
  should the count become "1 plugin"? Affects the public claim.
- **promptfoo (L4 red-team):** global install blocked by a pnpm PATH quirk (needs a fresh shell:
  `pnpm setup` already ran). Works via `npx promptfoo`. Want it installed properly + a red-team
  suite run against the MCP servers next pass?

## Not blockers, just not-yet-done (scope, not obstacles)

~22 other local repos + the remote long-tail (~195) are classified in `inventory.json` but not
harnessed. Next sessions, by profile, highest-value first (platform/web apps, the CLI forks, lore repos).
