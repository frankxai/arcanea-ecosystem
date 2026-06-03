# Ecosystem Harness Report — 2026-06-03

Overnight autonomous build-out. Goal: move flagship repos from "documented" to "proven,"
with claimed-vs-verified numbers, reproducible tests, and honest status grades.

**Posture:** brutal honesty over flattery. A repo graded NEEDS-WORK with evidence is worth
more than a SELLABLE we can't defend. Every number below has a command behind it.

## Environment ground truth

- **Repos:** 222 total across `frankxai` (202, 42 archived) + `Arcanea-Labs` (6) + `oci-ai-architects` (14). 27 cloned locally. Full map: `inventory.json`.
- **Tooling present:** gh (auth ✓), node 24, pnpm 11, python 3.13, uv, git. **deepeval installed** (L2 spine works).
- **Hard blocker:** no container runtime (docker + podman both absent) → **Langfuse L5 self-host could not run tonight.** No trace captured. See `BLOCKERS.md`.
- **Soft blocker:** `gh` token lacks `workflow` scope → cannot push `.github/workflows/*.yml`. CI files are written + on disk in each repo, uncommitted. One `gh auth refresh -s workflow` unlocks all of them.

## Flagship scorecard

Sorted SELLABLE first. "Verified" = run the command in the repo's `HARNESS.md`.

| Repo | Profile | Claimed → Verified | Test (assertions) | Status | PR |
|---|---|---|---|---|---|
| **mcp-doctor** | A · MCP | "4 tools" → **4/4 work**, accurate README, reproducible build | `test/mcp-gauntlet.mjs` (12/12) | **SELLABLE** | [#1](https://github.com/frankxai/mcp-doctor/pull/1) |
| **claude-code-hooks** | C · Library | "15 hooks" → **30 files**; guardrails enforce | `test/run-hooks-tests.sh` (47/47) | **SELLABLE** | [#1](https://github.com/frankxai/claude-code-hooks/pull/1) |
| **Starlight-Intelligence-System** | A · MCP +B | "ten sis_* tools" → **10/10**, server boots | `test/v01-mcp-tools.test.ts` (37/37) | **SELLABLE** *(1 build fix)* | — (active WIP) |
| **agentic-creator-os** | B · Skills | 90/65/38/8 → **165/77/69/1** | `test/inventory-truth.mjs` (150/165 frontmatter) | **NEEDS-WORK** | branch pushed¹ |
| **suno-mcp-server** | A · MCP | "~6 tools" → **0 (no code)** | — | **README-ONLY** | — |

¹ ACOS harness commit is on `origin/harness/buildout-2026-06-03`, stacked on 3 unpushed
`feat/workflow-tier` commits — clean-landing path in `BLOCKERS.md`.

## What is provably sellable now

Only repos that hit their success criteria with evidence:

1. **mcp-doctor** — real MCP server + CLI, 4 tools all verified over stdio, README claims
   exactly match reality, clean `tsc` build reproduces. The reference example. Ship it.
2. **claude-code-hooks** — the safety spine. Circuit-breaker actually blocks (exit 2),
   audit trail is integrity-checked, snapshot/revert works. 47 reproducible assertions.
3. **Starlight-Intelligence-System** — most mature repo: 2 MCP servers, 10 tools matching
   the claim, 37/37 substrate MCP tests. Sellable the moment the 2-line `cli.ts` build
   error is fixed.

## Smallest fixes that unlock the most (ranked by tier-jump × value)

1. **SIS `src/cli.ts:323,325`** — add `{encoding:"utf8"}` to the `execSync` calls (2 lines).
   Flips the most valuable repo from red-build to fully green. *Highest leverage.*
2. **`gh auth refresh -s workflow`** (30 sec) — unlocks committing the CI workflow in all 4
   repos that have one written + waiting. Turns "tests exist" into "tests gate every push."
3. **ACOS: fix 15 SKILL.md frontmatter headers** (bounded list in its `HARNESS.md`) +
   substantiate or correct the "8 plugins" claim. Two moves flip ACOS toward SELLABLE.
4. **ACOS L3 activation/E2E evals** — biggest *new* value: golden datasets that prove skills
   fire and produce coherent artifacts. Turns "165 skills exist" into "165 skills work, scored."
5. **suno-mcp-server** — decide: implement (needs Suno API + a real build) or archive. As-is
   the published npm package would fail on run; it should not be presented as working.

## Honest gaps (not done tonight, not faked)

- **L5 observability (Langfuse):** zero traces — no container runtime on this machine.
- **L4 red-team (promptfoo):** installed only via npx; no adversarial suite run yet.
- **ACOS behavioral evals (L3):** counted + lint only; skills not yet proven to fire E2E.
- **~22 other local repos + ~195 remote repos:** classified in `inventory.json`, not yet harnessed.

## Artifacts

`inventory.json` (222 repos classified) · per-repo `HARNESS.md` · `repos.json#harness_audit` ·
`BLOCKERS.md` (what needs Frank).
