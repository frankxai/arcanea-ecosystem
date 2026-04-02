# Arcanea Portfolio Architecture

## Purpose

This document explains how the Arcanea repos fit together and why the current
layering is better than the older "everything is just another integration repo"
model.

## Core design

### 1. Control plane

`arcanea`

This is the main platform and source of truth for:

- product surfaces
- internal ops
- health and machine readiness
- project graph and creator graph
- Supabase state
- billing and credit policy
- handoffs and portfolio strategy

### 2. Orchestration runtime

`arcanea-flow`

This is the Arcanea-native orchestration layer.

It should decide:

- when to decompose a task
- how to route work across agents
- which runtime is appropriate
- when to call the lower execution substrate

It is not Claude-only. It should be usable by Claude, Codex, and other Arcanea
coding runtimes as long as they can invoke CLI commands and report state.

### 3. Execution substrate

`arcanea-orchestrator`

This repo is the lower layer for:

- worktree fanout
- session lifecycle
- multi-agent execution
- review-check and status operations

It should sit under Arcanea, not replace Arcanea.

### 4. Runtime harnesses

- `arcanea-code`
- `oh-my-arcanea`
- `arcanea-opencode`
- `claude-arcanea`
- `codex-arcanea`
- `gemini-arcanea`

These repos are the runtime adapters.

They should share:

- repo targeting conventions
- task and run identity
- health and smoke expectations
- common memory/context conventions

They should not all invent separate orchestration models.

## Codex and Arcanea Flow

Codex should be able to use `arcanea-flow`.

The right engineering direction is:

1. keep `arcanea-flow` CLI stable
2. support machine-readable output for status and delegation
3. make run IDs explicit
4. persist traces in the Arcanea control plane
5. let Codex call `arcanea-flow` directly when orchestration is needed

That means Codex can:

- ask `arcanea-flow` for task decomposition
- use `arcanea-flow` to route specialized work
- use `ao` indirectly through `arcanea-flow`
- stay inside one coherent Arcanea orchestration model

## Why this is better

The old setup blurred these responsibilities:

- strategy lived in many repos
- orchestration and runtime overlapped
- ecosystem tracking was partial and stale

The current direction is better because it gives one clear answer for each
question:

- What is the product source of truth? `arcanea`
- What owns orchestration semantics? `arcanea-flow`
- What owns heavy execution fanout? `arcanea-orchestrator`
- What actually runs the coding session? the harness repos

## What should be shared across repos

- health and readiness standards
- run IDs and execution tracing
- branch and promotion policy
- shared repo inventory
- billing and graph assumptions at the platform level
- naming and product-boundary rules

## What should stay separated

- runtime-specific CLI UX
- provider-specific implementation details
- vertical product concerns
- legacy compatibility layers

## Near-term engineering priorities

1. Keep the portfolio registry current in this repo.
2. Keep `arcanea-flow` and `arcanea-orchestrator` aligned.
3. Continue reducing dirty-state noise across repos.
4. Build user-facing workspace control on top of the internal ops/control plane.
5. Keep billing, credits, project graph, and creator graph centered in `arcanea`.
