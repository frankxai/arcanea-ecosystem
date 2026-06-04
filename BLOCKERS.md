# Blockers — needs Frank (2026-06-03)

Things I could not resolve autonomously overnight. Ordered by leverage. Each has the exact action.

## 1. ~~Grant `workflow` scope~~ ✅ RESOLVED 2026-06-04

Frank granted `workflow` scope. CI workflows committed + pushed. **Live status:**
- `claude-code-hooks` — CI **green** (47 guardrail assertions on ubuntu).
- `mcp-doctor` — CI **green** (build + 12-assertion MCP gauntlet on ubuntu).
- `agentic-creator-os` — CI **red by design** — the inventory-truth gate exits non-zero
  while 15 SKILL.md files lack frontmatter (149/164). Goes green when item #5 is fixed.

CI caught two real portability bugs the local (Windows) run missed: a formatter shim
returning 127 on a toolchain-less runner, and a pnpm/npm lockfile mismatch. Both fixed.

## 2. L5 observability — you do NOT need Docker. Recommendation:

The only thing that wanted containers was self-hosting Langfuse. Three honest options:

1. **Skip L5 for now (recommended).** Observability earns its keep at production traffic;
   these tools aren't there yet. The harness value (L1–L4: proven repos + CI gates) needs no
   containers. Don't install infra speculatively.
2. **When you do want traces → Langfuse *Cloud* free tier** (50k events/mo). Zero containers:
   sign up, drop 3 env vars (`LANGFUSE_HOST/PUBLIC_KEY/SECRET_KEY`), wire OpenInference/OTel
   into the mcp-doctor + SIS MCP servers. ~30 min, no machine setup. **This is the cloud path
   you asked about — it fully removes the Docker question.**
3. **Sovereign self-host (later, optional)** — matches your global pref for Podman:
   `winget install RedHat.Podman-Desktop` → `podman machine init && podman machine start`, then
   Langfuse via compose. Only worth it once you have ≥2 concrete container needs (Langfuse +
   e.g. local Postgres / containerized MCP servers). Not Docker Desktop (org licensing + heavier).

Note: CI already runs in the cloud (GitHub ubuntu runners) with no local containers — so for
eval/gating purposes the machine never needed Docker at all.

## 3. ~~SIS build is red~~ ✅ RESOLVED 2026-06-04

`src/cli.ts` source was already fixed (`String(...)` wrapping present). The real blocker was a
missing `typescript` in `node_modules` (an install had wiped it). Ran `npm install` →
**`npm run build` is now green (exit 0)**, MCP server boots 10 tools, `v01-mcp-tools.test.ts`
37/37. SIS is now fully SELLABLE.

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
