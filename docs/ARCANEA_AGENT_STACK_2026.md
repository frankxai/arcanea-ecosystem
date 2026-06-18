# Arcanea Agent Stack Strategy 2026

Status: decision memo, June 16 2026.
Owner: Frank.
Branch: `codex/agent-stack-strategy`.

## Why This Exists

Anthropic paused the June 15 Claude Agent SDK credit change, but the signal is stronger than the specific policy: agent work is becoming metered compute, not casual chat. Autonomous loops can read repos, run tools, retry, spawn subagents, search, and edit while the user is not pacing every step. Flat subscriptions will keep tightening around that shape.

For Arcanea this is not bad news. It clarifies the product.

Arcanea should become the smooth operating layer for creative and coding agents: a beautiful cockpit that lets a user bring their own Claude, Codex, OpenCode, Gemini, Grok, Vercel, GitHub, Higgsfield, Supabase, and MCP accounts today, then later graduate to managed Arcanea execution when they want convenience, team controls, hosted workspaces, and marketplace distribution.

## The Decision

Do not bet Arcanea on one agent vendor.

Build **Arcanea Code** as the branded control plane and experience layer over multiple runtimes:

- **Claude Code / Agent SDK** for high-context repo work, programmable agent loops, MCP-heavy automation, hooks, permissions, checkpointing, and production-grade custom agents.
- **OpenCode / oh-my-arcanea** for open, provider-flexible local coding loops and user-owned model routing.
- **Codex** for OpenAI-native implementation/review loops, local/cloud workflow direction, and strong codebase collaboration.
- **Gemini / Grok / visual agents** for multimodal world-building, visual canon, research, and asset-generation workflows.
- **AO / Arcanea Flow / Orchestrator** as the common run ledger, budget layer, approval surface, branch discipline, and multi-agent worktree substrate.

The product promise is not "we replaced Claude Code." The promise is:

> Arcanea makes your best agents feel like one coherent supercomputer for building living worlds, apps, books, games, media, and businesses.

## What The Claude Credit Pause Means

Short term:

- Users can keep using current Claude Code and Agent SDK workflows without the planned credit split taking effect immediately.
- Arcanea should not rush into billing assumptions that depend on subscription loopholes.
- This is a free audit window: classify which workflows are interactive, headless, production, scheduled, or team-shared.

Long term:

- Agent economics will move toward cost per completed task, active runtime, tool calls, web/code execution, and risk.
- The useful product is a budget-aware run system, not another prompt box.
- BYOK is mandatory now; managed execution is a later premium layer.

## Product Shape

### Layer 1: Arcanea App

The Vercel app is the visual front door.

It should show:

- Worlds, projects, books, studio assets, and agent runs as coherent objects.
- A command palette for "make this real" actions: create world, render book, generate canon image, make game seed, open coding run, ask for review.
- A visual run timeline: plan, files touched, tools used, cost estimate, checkpoints, approvals, result.
- MCP health: connected tools, stale auth, missing env, cost-risk warning, last successful run.

It should not attempt to hide all complexity too early. It should make power feel calm.

### Layer 2: Arcanea Code

Arcanea Code is the daily-driver coding and creation cockpit.

It can be implemented as:

- an OpenCode-based distribution or overlay,
- an Arcanea-branded terminal/workspace launcher,
- a VS Code/Zed-style companion later,
- or a local web cockpit backed by `arcanea-orchestrator`.

The first useful version is not a new IDE. It is a cohesive launcher plus run ledger:

- detect installed agents (`claude`, `codex`, `opencode`, `gemini`, `grok`, `ao`);
- detect auth and subscription mode;
- choose the right runtime for the job;
- create clean worktrees;
- attach the right MCP servers;
- enforce budgets and tool allowlists;
- stream progress;
- write handovers;
- produce merge-ready diffs.

### Layer 3: Arcanea Supercomputer

"Our own supercomputer" should mean a local-first execution fabric before it means owned hardware.

Now:

- user machine + user subscriptions + user API keys;
- local worktrees, local MCP, local logs;
- optional GPU/media tools where available;
- remote SaaS tools via authenticated MCP/connectors;
- explicit user approval before expensive or destructive actions.

Next:

- Arcanea-managed workers for long jobs, media batches, repo indexing, and team runs;
- hosted sandboxes with budget limits and audit logs;
- shared memory/index caches;
- managed MCP server registry;
- marketplace-ready agent skills and workflows.

Later:

- dedicated Arcanea compute pools for rendering, indexing, evals, and autonomous production runs;
- enterprise controls: policy packs, spend caps, zero-retention routes, private runners.

## Billing And Auth Doctrine

The system must separate usage lanes:

| Lane | Auth | Best For | Arcanea Role |
|---|---|---|---|
| Interactive subscription | user logs into Claude/Codex/OpenCode locally | daily creative/coding flow where the user is present | launch, observe, organize |
| BYOK/API | user API keys or provider accounts | headless, scheduled, CI, shared team runs | budget, route, log |
| Managed Arcanea | Arcanea billing + hosted workers | convenience, teams, private hosted worlds, marketplace production | execute, meter, support |

Rules:

- Never depend on subscription arbitrage for product economics.
- Never present autonomous loops as "free because you logged in."
- Show run budgets before long work starts.
- Default to user-owned credentials now; make managed hosting an upgrade, not a requirement.

## Runtime Routing

Use bounded responsibilities:

| Job | Preferred Runtime | Why |
|---|---|---|
| High-context repo edit | Claude Code / Agent SDK | best agent loop, MCP, hooks, permissions, checkpointing |
| Provider-flexible local coding | OpenCode / oh-my-arcanea | open, inspectable, model-agnostic |
| Implementation/review loop | Codex | strong repo collaboration and code review posture |
| Long structured workflow | AO + Arcanea Flow | worktrees, fanout, state, retries, handover |
| Visual canon / media | Grok, Gemini, Higgsfield, Arcanea Studio | multimodal coherence and asset generation |
| World repo evolution | `@arcanea/world-sdk` | canonical manifest, memory, evolve, render, proof |
| Messaging/ops assistant | Arcanea Claw/OpenClaw-style adapter | user lives in chat channels |

Routing should be explicit in the run record:

```json
{
  "runId": "run_...",
  "objective": "promote world engine",
  "runtime": "claude-code",
  "lane": "interactive-subscription",
  "budget": { "maxUsd": 5, "maxMinutes": 45, "maxToolCalls": 200 },
  "workspace": "worktree path",
  "mcp": ["github", "figma", "vercel", "higgsfield"],
  "approvalMode": "human-for-side-effects",
  "status": "completed"
}
```

The canonical schema now lives at `schemas/agent-run-record.schema.json`.
Use it as the contract between Arcanea Code, AO, the Vercel app cockpit, and
future managed workers. A run without this record is only a terminal session; a
run with this record can become a timeline, budget report, handover, Merge Room
candidate, and marketplace-quality workflow.

### Run Ledger Minimum Viable Record

For the first shipping pass, every Arcanea Code / AO run should write:

- `runId`, `objective`, `repo`, `branch`, `worktree`, `runtime`, and `lane`.
- Budget guardrails: `maxMinutes`, `maxToolCalls`, optional `maxUsd`, and cost
  confidence (`exact`, `estimated`, or `unknown`).
- MCP connector states with risk flags (`write-capable`, `cost-bearing`,
  `secret-bearing`, `external-side-effect`).
- Approval policy for filesystem writes, destructive shell, external writes,
  paid generation, and secret transmission.
- Verification evidence and touched files before the run is marked completed.

This is the first "smooth end to end" primitive. It turns invisible agent work
into something Arcanea can display, resume, compare, price, and safely hand off.

## MCP State Doctrine

MCP should feel like a capability panel, not a pile of JSON.

Arcanea needs a "Best State" MCP dashboard:

- connected / missing / expired / unsafe;
- tool scopes and risk level;
- last successful call;
- cost-bearing tools flagged;
- local vs cloud execution;
- recommended fixes.

Default MCP packs:

- **Core Coding:** GitHub, filesystem, browser, package docs, test runner.
- **Arcanea Worlds:** world-sdk, Supabase index, GitHub world repos, memory/search.
- **Visual Forge:** Figma, Canva, Higgsfield, Arcanea Studio, image/video providers.
- **Deploy:** Vercel, env vars, logs, domains, CI.
- **Ops:** Slack/Gmail/Calendar/Notion/Linear when user explicitly connects them.

Security posture:

- Read-only by default.
- Writes require an action contract.
- Destructive operations require approval.
- Paid media/render/search calls require budget visibility.

## Visual Workflow Experience

The interface should feel like a mission-control studio, not a settings page.

Core surfaces:

- **Command Center:** one input, recent projects, active runs, MCP health.
- **Run Timeline:** plan, branch, tools, files, screenshots, cost, test evidence, handover.
- **World Console:** world graph, canon, characters, memories, assets, proof, share page.
- **Forge Board:** task cards that become agent runs; drag from idea to branch to PR.
- **Tool Map:** connected MCP/providers as readable capability tiles.
- **Merge Room:** compare Claude/Codex/Grok/Higgsfield outputs side by side, pick best pieces, promote through gate.

The "smooth" feeling comes from removing invisible uncertainty:

- always know which repo/branch the agent is in;
- always know what it can spend;
- always know what tools it can call;
- always know what changed;
- always know the next best action.

## Support The Higgsfield / World-Engine Work Without Overlap

Other agents are working on Higgsfield/world-engine implementation. Do not collide.

Boundaries:

- `codex/world-engine-promotion` owns app wiring for `@arcanea/world-sdk`, `/worlds/create`, and Drowned Archive fixture surfacing.
- Higgsfield work should own game/media generation adapters and asset workflows.
- This branch owns strategy and runtime doctrine, not app code.

Merge path:

1. Finish and verify world-engine promotion branch.
2. Finish and verify Higgsfield/media adapter branch.
3. Compare outputs in a Merge Room-style review: capabilities, routes, envs, commands, docs, tests.
4. Promote shared doctrine first, then app slices, then runtime adapters.
5. Do not merge broad integration branches that delete current app/book/CI work.

## Near-Term Build Plan

### Sprint 1: Make the operating layer visible

- Add run ledger schema: run id, objective, repo, branch, runtime, auth lane, budget, tools, files, outcome.
- Mirror the schema as TypeScript types in `arcanea-orchestrator` core so
  `ao status --json`, `ao run --dry-run`, and Arcanea Code all speak the same
  language.
- Add `ao status --json` and `ao run --dry-run` if not already stable.
- Build an Arcanea app "Agent Runs" page backed by fixture/local JSON first.
- Show MCP health and missing auth without requiring all providers.

Implementation status, June 17 2026:

- `arcanea-orchestrator` branch `codex/agent-stack-runtime` now exports the
  `AgentRunRecord` TypeScript contract, `ao run --dry-run`, and
  `ao mcp health --json` with fixture-free MCP risk output.
- `arcanea-ai-app` branch `codex/agent-cockpit` now has `/ops/runs`,
  `/api/ops/runs`, and a server-side run ledger adapter. The app page is still
  fixture-backed, but the product boundary is real: future AO run JSON can plug
  into the loader without changing the visual cockpit.
- Keep this separate from `codex/world-engine-promotion` and Higgsfield/media
  adapter work. The shared contract is the run record; the route slices and
  media/world engine implementation branches should merge through review, not
  through a broad branch merge.

### Sprint 2: Make Arcanea Code useful locally

- Provide `arcanea-code doctor`:
  - installed agents;
  - auth state;
  - Node/pnpm/git;
  - MCP servers;
  - repo cleanliness;
  - recommended runtime by task.
- Provide `arcanea-code run`:
  - creates a worktree;
  - writes a task contract;
  - launches chosen runtime;
  - records logs and summary.
- Provide `arcanea-code handover`:
  - writes durable status;
  - includes verification evidence;
  - suggests merge path.

### Sprint 3: Smooth visual workflow

- Add Vercel app cockpit for active runs.
- Link run records to worlds/projects/assets.
- Add one-click "open in Claude Code", "open in Codex", "open in OpenCode" actions.
- Add visual comparison for multi-agent outputs.

### Sprint 4: Managed layer

- Hosted runners for non-destructive reads first.
- Budgeted media generation and repo indexing.
- Team policies, spend caps, audit logs.
- Private hosted worlds and managed repo sync.

## Non-Goals

- Do not build a full IDE before the run ledger works.
- Do not fork every agent UI at once.
- Do not make Arcanea pay for all user compute before pricing is proven.
- Do not hide the user's provider identity; trust comes from clarity.
- Do not merge strategy, app feature work, and Higgsfield adapters in one branch.

## The Product Sentence

Arcanea Code is the cockpit for your agent supercomputer: bring your subscriptions, keys, repos, worlds, and tools; Arcanea routes the right agent, watches the budget, keeps the state, and turns chaotic creative work into smooth, mergeable, ownable production.
