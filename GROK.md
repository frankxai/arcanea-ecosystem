# Arcanea Ecosystem — Grok Build Harness

Grok (xAI) full native support is installed.

## Quick Start (Grok TUI)
1. `cd C:\Users\frank\starlight\repos\arcanea-ecosystem` (or into `videos/arcanea-cinematic-hero`)
2. `grok`
3. `/hooks-trust` (enable the excellence hooks)
4. `/skills harness-integration` or describe the task

## Rules First (always)
- Read `CLAUDE.md` (if present), `AGENTS.md`, this GROK.md, and any subdir instructions (e.g. videos/*/CLAUDE.md).
- For world repos and cinematic video compositions: follow the hyperframes lint/validate/inspect discipline in the sub-project's CLAUDE.md + AGENTS.md.
- Use repo-mastery skill for cross-repo context.
- Excellence gates (via .grok seeds): repo-mastery → plan reviews → verification-loop + santa-method → gstack (for visuals) before any ship.

## Sub-Projects
- `videos/arcanea-cinematic-hero/`: self-contained HyperFrames composition. Its local CLAUDE.md/AGENTS.md + package.json `npm run check` are the law. After any edit to index.html: `npm run check`.
- The .grok/ here at root + in the video subdir ensure native Grok hooks fire even when your shell cwd is deep in a video comp.

## .grok Seeds (grok-personal excellence layer)
- harness-integration
- excellence-review (gstack, santa, verification, gates)
- repo-mastery (ecosystem + SIP + ACOS + arcanea worlds)
- multi-harness-orchestrator (delegate plans to claude when complex)

## World Building (native Grok strength)
Grok harness is first-class for visual canon (native Imagine + image-to-video 1.5 + refs for visualDna coherence) + GH ops.
- Always load the world via manifest (world.arcanea.json) + SDK when in a world dir.
- Use `arcanea-world remember "lived moment" --character <slug>` and `arcanea-world evolve <slug>` (or direct from evolution.mjs) to drive the retention loop: memories (private, hash-safe) → evolution (public canon grows, hash moves).
- Surface live state with `node scripts/world-state.mjs . [--json]` (🌍 + 🎬grok flag + palette). Run mapper for Higgsfield seeds. Re-validate pattern: mapper on example + world-state. This is the observability + creation contract for agents + statuslines.
- Default agents crew in genesis includes visual-canon for grok. Condition all assets on visualDna + meaning pillars.
- Output always writes back to the sovereign GH world repo (never store user canon centrally).

Core catalog (gstack etc.) via ~/.claude + ~/.grok compat + junctions. grok-personal seeds stay .grok-only per SIP §5.

## Video / HyperFrames Work
When editing compositions:
- Never duplicate timeline tweens (the symptom of missed hooks).
- Always run `npx hyperframes lint --verbose && npx hyperframes validate && npx hyperframes inspect` (or `npm run check`) after edits.
- Captions, beat transitions, Three/GSAP drivers must be deterministic and non-overlapping on same targets.

See subdir STORYBOARD.md + design.md for the arcanea-cinematic-hero.

**L1 Content Suite (Jun 2026, Grok-delivered):** Full viral + explainer assets in `videos/arcanea-viral-content/` (explainer 75s + 5 shorts with hooks/evolution/swarm/soundtrack/ownership; design.md, plans, calendar, copy, review, VO scripts, assets). Synthesized best from visual, strategy, content agents + hyperframes skill. Top-notch: Research-grounded (2026 viral/explainer data + Arcanea strategy), brand-consistent (cosmic dark premium, visualDNA, living Three), excellence gates applied (lint/validate/inspect, review with top-thinker upgrades). Use for arcanea.ai L1 gasp (Genesis demo, coherence, living, ownership). See MASTER-README.md, CONTENT-PLAN.md, REVIEW-PROCESS-IMPROVEMENTS.md, CONTENT-CALENDAR-SOCIAL-COPY.md. Render per sub-project; integrate with hero cinematic and site/app. Healthy: Isolated, no overwrites, self-contained. Proactively: Templates for future L1 content; A/B hooks; measurement loop. This completes the visual canon for the front door (L1 undeniable before L2/L3). Cross-ref main README status + docs/L1-VISUAL-CANON-AND-CONTENT.md.

Built on SIP v1.1.1 — starlightintelligence.org/protocol. God 99. Small reversible.
