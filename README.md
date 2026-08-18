<!-- Constellation Routing 2026-08-09 -->
**Live constellation:** [ARCANEA_CONSTELLATION_ROUTING.md](./ARCANEA_CONSTELLATION_ROUTING.md) · machine registry [`repos.json`](./repos.json) v3 · report `starlight/queen/reports/arcanea-constellation-map-2026-08-09.md`

**Product SSOT:** `frankxai/arcanea-ai-app` (not public `frankxai/arcanea` mirror).

# Arcanea Ecosystem

> **Part of the wider [FrankX ecosystem](https://github.com/frankxai/frankxai/blob/main/ECOSYSTEM.md).** Arcanea is the creative-platform domain on the shared spine: **SIS** (memory) → **Hermes** (orchestration) → **ACOS** (operation).


This repository is the portfolio registry for Arcanea.

It is not the product source of truth. The product source of truth is the
Arcanea platform repo and the standalone repos around it. This repo exists to:

- track which repos matter
- explain how they fit together
- provide one place to check status and sync strategy
- provide a pure registry of externally tracked repos without pinning them as submodules

## Current architecture

Arcanea is now a layered system:

1. `arcanea`
   - Main platform and control plane
   - Internal ops UI, health gates, machine readiness, registry, handoffs

2. `arcanea-flow`
   - Arcanea-native orchestration runtime
   - Owns orchestration semantics, swarm patterns, agent coordination logic

3. `arcanea-orchestrator`
   - Lower execution substrate based on Composio Agent Orchestrator
   - Owns worktrees, sessions, fanout, status, and multi-agent execution

4. Runtime harnesses
   - `arcanea-code`
   - `oh-my-arcanea`
   - `arcanea-opencode`
   - `claude-arcanea`
   - `codex-arcanea`
   - `gemini-arcanea`

5. Vertical products and support systems
   - `arcanea-infogenius`
   - `arcanea-onchain`
   - `arcanea-claw`
   - `arcanea-mobile`
   - `infogenius`
   - `labs`

## Arcanea Flow and Codex

`arcanea-flow` is not Claude-only.

It should be treated as the Arcanea-native orchestration layer for any coding
runtime that can:

- execute shell commands
- read/write repos
- report task state
- accept structured delegation or task input

That includes Claude Code and Codex.

The right model is:

- `arcanea-flow` decides orchestration semantics
- `arcanea-orchestrator` executes multi-agent worktree operations
- Claude/Codex/OpenCode/Gemini harnesses provide the actual coding runtime

For Codex specifically, the practical integration path is:

1. expose stable CLI commands and machine-readable output from `arcanea-flow`
2. keep repo targeting, run IDs, and status traces explicit
3. use `ao` for heavy parallel execution
4. keep policy, health, and visibility in `arcanea`

## Repository model

This repo is now a pure portfolio registry.

- It does not pin Arcanea repos as submodules.
- It points at real repos in the surrounding workspace by metadata only.
- Status and sync happen through registry scripts, not through gitlinks.

## Working rules

- Do not treat this repo as the place where all development happens.
- Make code changes in the actual target repo.
- Update this repo when the portfolio map, strategy, or tracked repo set changes.
- Do not auto-stash and auto-pull across all repos blindly.

## Main files

- `repos.json`
  - portfolio inventory
- `docs/ARCANEA_PORTFOLIO_ARCHITECTURE.md`
  - architecture and orchestration model
- `scripts/status-all.mjs`
  - status view across tracked repos
- `scripts/sync-all.mjs`
  - cautious sync helper
- `scripts/clone-all.sh`
  - optional workspace bootstrap helper from registry metadata

## Current status (God Mode — Superintelligence Mapper + Higgsfield Games enrichment, Jun 2026)

**New top functionality (Jun 2026):** @arcanea/world-sdk (pure ESM, zero-dep) + evolution engine: speak world → genesis/scaffold (deterministic World Bible + visualDna + agents crew) → harness-structured agent creation (any harness reads manifest.agents, writes canon/characters/quests) → recordMemory (private .arcanea/memories, hash-proof) → distill → evolveCharacter (char transforms + public canonLevel-2 "earned by everyone" lore; hash moves on real lived change) → render (book targets, index, claim proof). The "Mapper" enriches further: memory/meaning → Higgsfield games + books + companions. GitHub-central sovereign (user repo or OAuth-managed under user acct); app/PWA/mobile = beautiful complementary visual state + consume + light edit (interchangeable with agents). Delete zero repos. Harnesses (grok-arcanea, codex-arcanea, antigravity-arcanea, claude-arcanea...) are the creation engine + per-ecosystem marketplace reach — invest. NFT-forge/onchain/platform/records kept for later IP/marketplace layer. Success-based riches (marketplace 10-20%, Label only on assisted commercialization, premium gen/hosting, onchain proofs). No data landlord: repo is source of truth; derived index/cache only.

**L1 Brand & Visual Canon Assets (Grok-delivered, Jun 2026):** Top-notch cinematic and viral content engine for arcanea.ai (the front-door "gasp" experience). Includes:
- `videos/arcanea-cinematic-hero/`: Hero cinematic brand film (60s+ cuts, MP4s produced, full HyperFrames source with Three/GSAP living elements, design.md, STORYBOARD.md, assets/plates/VO). Research-grounded mythic-cosmic style matching Arcanea visualDNA.
- `videos/arcanea-viral-content/`: Complete L1 content suite — 1 full explainer (75s) + 5 viral shorts (hooks, character evolution, swarm, soundtrack, ownership), with design system, CONTENT-PLAN.md (scripts, beats, 2026 viral research), MASTER-README, REVIEW-PROCESS-IMPROVEMENTS, CONTENT-CALENDAR-SOCIAL-COPY (full hooks/captions/threads/A/B + repurposing), VO scripts, assets. All pieces follow HyperFrames excellence gates (lint/validate/inspect), deterministic, brand-consistent with hero. Other approaches: carousels, threads, long-form breakdowns, community challenges.
These are the professional visual canon and marketing assets to make the Genesis flow undeniable — the "speak a world into existence" gasp, coherence demo, living evolution, ownership. Delivered via Grok harness (native + hyperframes) as part of L1 experience layer. Integrate into arcanea.ai site, app, onboarding, and creator surfaces. See videos/*/MASTER-README.md, design.md, and plans for usage, renders, and iteration. Excellence: Full review process applied; best from visual, strategy, and content agents synthesized. Healthy: Self-contained projects with checks; no overwrites to other work.

See:
- `schemas/world.arcanea.schema.json` + `example.json` (v1.1+ game/memory/meaning/community/mapper fields)
- `docs/WORLD_REPO_STANDARD.md` §8 (detailed mapper, Higgsfield integration workflows, memory/meaning layers, multi-harness god-mode: Grok build (native + GH MCP) + Claude Code + Higgsfield MCP + Arcanea MCPs (arcanea-mcp + memory-mcp) + Arcanea skills (world-build etc.))
- `scripts/world-to-higgsfield-game-mapper.mjs` (executable seed: parses world → rich Fable/Higgsfield prompt + asset plan + memory injection spec + community hooks. Run it in any world repo.)
- `scripts/world-state.mjs` (🌍 Name | Nc Nb Nq Nm 🎬grok,claude ⎇repo [palette] — compact visual per-world state for ACOS statuslines, agent bars, dashboards. Powers "visual nice each person state of their world".)
- `docs/ARCANEA_STRATEGY_2026.md` (updated leapfrog + superintelligence vision)

**Stack for ultimate worlds + products around community:**
- Grok (this harness): coherence, native image/video for initial canon seeds, GH ops.
- Claude Code + Higgsfield MCP (https://mcp.higgsfield.ai/mcp): game writing + massive asset gen.
- Arcanea MCPs + skills + memory system: persistent state, graph, meaning-preserving orchestration, 7 Pillars.
- GitHub world repos: sovereign ownership, forks as instances, PRs as community evolution events that write back to memory/meaning.
- Output: games, books, AI companions, experiences — all living and evolvable. Creators ship; ecosystem wins on success (marketplace, tools, Label).

Existing foundations (memory, meaning, MCPs, skills, orchestration, world standard, GitHub central) are already extremely strong. This enriches them into the god-mode mapper.

The active production shape is centered on:

- `arcanea`
- `arcanea-flow`
- `arcanea-orchestrator`
- `arcanea-code`
- `oh-my-arcanea`
- `claude-arcanea`
# Arcanea Ecosystem

> **Part of the wider [FrankX ecosystem](https://github.com/frankxai/frankxai/blob/main/ECOSYSTEM.md).** Arcanea is the creative-platform domain on the shared spine: **SIS** (memory) → **Hermes** (orchestration) → **ACOS** (operation).


This repository is the portfolio registry for Arcanea.

It is not the product source of truth. The product source of truth is the
Arcanea platform repo and the standalone repos around it. This repo exists to:

- track which repos matter
- explain how they fit together
- provide one place to check status and sync strategy
- provide a pure registry of externally tracked repos without pinning them as submodules

## Current architecture

Arcanea is now a layered system:

1. `arcanea`
   - Main platform and control plane
   - Internal ops UI, health gates, machine readiness, registry, handoffs

2. `arcanea-flow`
   - Arcanea-native orchestration runtime
   - Owns orchestration semantics, swarm patterns, agent coordination logic

3. `arcanea-orchestrator`
   - Lower execution substrate based on Composio Agent Orchestrator
   - Owns worktrees, sessions, fanout, status, and multi-agent execution

4. Runtime harnesses
   - `arcanea-code`
   - `oh-my-arcanea`
   - `arcanea-opencode`
   - `claude-arcanea`
   - `codex-arcanea`
   - `gemini-arcanea`

5. Vertical products and support systems
   - `arcanea-infogenius`
   - `arcanea-onchain`
   - `arcanea-claw`
   - `arcanea-mobile`
   - `infogenius`
   - `labs`

## Arcanea Flow and Codex

`arcanea-flow` is not Claude-only.

It should be treated as the Arcanea-native orchestration layer for any coding
runtime that can:

- execute shell commands
- read/write repos
- report task state
- accept structured delegation or task input

That includes Claude Code and Codex.

The right model is:

- `arcanea-flow` decides orchestration semantics
- `arcanea-orchestrator` executes multi-agent worktree operations
- Claude/Codex/OpenCode/Gemini harnesses provide the actual coding runtime

For Codex specifically, the practical integration path is:

1. expose stable CLI commands and machine-readable output from `arcanea-flow`
2. keep repo targeting, run IDs, and status traces explicit
3. use `ao` for heavy parallel execution
4. keep policy, health, and visibility in `arcanea`

## Repository model

This repo is now a pure portfolio registry.

- It does not pin Arcanea repos as submodules.
- It points at real repos in the surrounding workspace by metadata only.
- Status and sync happen through registry scripts, not through gitlinks.

## Working rules

- Do not treat this repo as the place where all development happens.
- Make code changes in the actual target repo.
- Update this repo when the portfolio map, strategy, or tracked repo set changes.
- Do not auto-stash and auto-pull across all repos blindly.

## Main files

- `repos.json`
  - portfolio inventory
- `docs/ARCANEA_PORTFOLIO_ARCHITECTURE.md`
  - architecture and orchestration model
- `scripts/status-all.mjs`
  - status view across tracked repos
- `scripts/sync-all.mjs`
  - cautious sync helper
- `scripts/clone-all.sh`
  - optional workspace bootstrap helper from registry metadata

## Current status (God Mode — Superintelligence Mapper + Higgsfield Games enrichment, Jun 2026)

**New top functionality (Jun 2026):** @arcanea/world-sdk (pure ESM, zero-dep) + evolution engine: speak world → genesis/scaffold (deterministic World Bible + visualDna + agents crew) → harness-structured agent creation (any harness reads manifest.agents, writes canon/characters/quests) → recordMemory (private .arcanea/memories, hash-proof) → distill → evolveCharacter (char transforms + public canonLevel-2 "earned by everyone" lore; hash moves on real lived change) → render (book targets, index, claim proof). The "Mapper" enriches further: memory/meaning → Higgsfield games + books + companions. GitHub-central sovereign (user repo or OAuth-managed under user acct); app/PWA/mobile = beautiful complementary visual state + consume + light edit (interchangeable with agents). Delete zero repos. Harnesses (grok-arcanea, codex-arcanea, antigravity-arcanea, claude-arcanea...) are the creation engine + per-ecosystem marketplace reach — invest. NFT-forge/onchain/platform/records kept for later IP/marketplace layer. Success-based riches (marketplace 10-20%, Label only on assisted commercialization, premium gen/hosting, onchain proofs). No data landlord: repo is source of truth; derived index/cache only.

**L1 Brand & Visual Canon Assets (Grok-delivered, Jun 2026):** Top-notch cinematic and viral content engine for arcanea.ai (the front-door "gasp" experience). Includes:
- `videos/arcanea-cinematic-hero/`: Hero cinematic brand film (60s+ cuts, MP4s produced, full HyperFrames source with Three/GSAP living elements, design.md, STORYBOARD.md, assets/plates/VO). Research-grounded mythic-cosmic style matching Arcanea visualDNA.
- `videos/arcanea-viral-content/`: Complete L1 content suite — 1 full explainer (75s) + 5 viral shorts (hooks, character evolution, swarm, soundtrack, ownership), with design system, CONTENT-PLAN.md (scripts, beats, 2026 viral research), MASTER-README, REVIEW-PROCESS-IMPROVEMENTS, CONTENT-CALENDAR-SOCIAL-COPY (full hooks/captions/threads/A/B + repurposing), VO scripts, assets. All pieces follow HyperFrames excellence gates (lint/validate/inspect), deterministic, brand-consistent with hero. Other approaches: carousels, threads, long-form breakdowns, community challenges.
These are the professional visual canon and marketing assets to make the Genesis flow undeniable — the "speak a world into existence" gasp, coherence demo, living evolution, ownership. Delivered via Grok harness (native + hyperframes) as part of L1 experience layer. Integrate into arcanea.ai site, app, onboarding, and creator surfaces. See videos/*/MASTER-README.md, design.md, and plans for usage, renders, and iteration. Excellence: Full review process applied; best from visual, strategy, and content agents synthesized. Healthy: Self-contained projects with checks; no overwrites to other work.

See:
- `schemas/world.arcanea.schema.json` + `example.json` (v1.1+ game/memory/meaning/community/mapper fields)
- `docs/WORLD_REPO_STANDARD.md` §8 (detailed mapper, Higgsfield integration workflows, memory/meaning layers, multi-harness god-mode: Grok build (native + GH MCP) + Claude Code + Higgsfield MCP + Arcanea MCPs (arcanea-mcp + memory-mcp) + Arcanea skills (world-build etc.))
- `scripts/world-to-higgsfield-game-mapper.mjs` (executable seed: parses world → rich Fable/Higgsfield prompt + asset plan + memory injection spec + community hooks. Run it in any world repo.)
- `scripts/world-state.mjs` (🌍 Name | Nc Nb Nq Nm 🎬grok,claude ⎇repo [palette] — compact visual per-world state for ACOS statuslines, agent bars, dashboards. Powers "visual nice each person state of their world".)
- `docs/ARCANEA_STRATEGY_2026.md` (updated leapfrog + superintelligence vision)

**Stack for ultimate worlds + products around community:**
- Grok (this harness): coherence, native image/video for initial canon seeds, GH ops.
- Claude Code + Higgsfield MCP (https://mcp.higgsfield.ai/mcp): game writing + massive asset gen.
- Arcanea MCPs + skills + memory system: persistent state, graph, meaning-preserving orchestration, 7 Pillars.
- GitHub world repos: sovereign ownership, forks as instances, PRs as community evolution events that write back to memory/meaning.
- Output: games, books, AI companions, experiences — all living and evolvable. Creators ship; ecosystem wins on success (marketplace, tools, Label).

Existing foundations (memory, meaning, MCPs, skills, orchestration, world standard, GitHub central) are already extremely strong. This enriches them into the god-mode mapper.

The active production shape is centered on:

- `arcanea`
- `arcanea-flow`
- `arcanea-orchestrator`
- `arcanea-code`
- `oh-my-arcanea`
- `claude-arcanea`
- `codex-arcanea`
- `gemini-arcanea`
- `grok-arcanea` (Grok native image/video + world-repo agents)
- `arcanea-infogenius`
- `arcanea-onchain`

Submodule pins in this repo still represent an older portfolio subset. That is
why this repo was converted to a pure registry model instead.
