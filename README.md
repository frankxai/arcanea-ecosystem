# Arcanea Ecosystem

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

## Current status

The active production shape is centered on:

- `arcanea`
- `arcanea-flow`
- `arcanea-orchestrator`
- `arcanea-code`
- `oh-my-arcanea`
- `claude-arcanea`
- `codex-arcanea`
- `arcanea-infogenius`
- `arcanea-onchain`

Submodule pins in this repo still represent an older portfolio subset. That is
why this repo was converted to a pure registry model instead.
