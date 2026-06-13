# Arcanea Ecosystem — Agent Instructions

Read `GROK.md` (for Grok Build), `CLAUDE.md` (if present) first. Deeper wins in subdirs.

This is the registry + strategy repo for the Arcanea worlds, cinematic content, and ecosystem map.

## Multi-Harness Parallel Work
Many agents (Claude, Grok, Gemini, Codex, Cursor...) operate across starlight/repos in parallel.
Git is the coordination layer:
- One agent = one branch: `agent/<harness>/<scope>` (e.g. `agent/grok/cinematic-lint-pass`).
- Before editing: `git branch --show-current`, check for `.agent/active-agents.md` if present.
- Never edit a file another live agent is actively rewriting.
- For video comps under `videos/`: prefer scoped branches or worktrees.

## Video Compositions (HyperFrames)
See `videos/arcanea-cinematic-hero/` for the canonical example.
- Every change to `index.html` (or compositions/): run the full check from inside the video dir:
  `npm run check` (lint + validate + inspect)
- Fix all errors. Review warnings.
- Duplicated GSAP timeline calls (multiple `tl.to` / `tl.fromTo` on same selector at nearly identical times) are forbidden — they are the classic symptom of missed project hooks / instructions. The .grok/hooks and subdir CLAUDE.md/AGENTS.md exist to prevent this.
- Use the hyperframes, gsap, three skills (via your harness catalog) before authoring motion.

**L1 Viral & Explainer Suite (Jun 2026):** `videos/arcanea-viral-content/` delivers the full L1 content engine (explainer + 5 viral shorts + plans, design, calendar, social copy, review, VO, assets). Best from visual/strategy/content/review agents + hyperframes. Top-notch state: Research-backed (2026 data + Arcanea strategy), brand-consistent, excellence applied (gates, no overwrites, isolated). See sub MASTER-README, CONTENT-PLAN, REVIEW, CALENDAR-COPY. Use for arcanea.ai front door (gasp, virality, education, conversion). Per-piece subdirs for independent work. Cross-ref main README + docs/L1-VISUAL-CANON-AND-CONTENT.md. Proactively synthesized for the unifying architecture (L1 undeniable).

## World Registry
- Edit `repos.json` and docs/ for structural changes.
- Use the scripts/ for clone/sync/status.
- When mapping worlds, run the mappers and respect SIP substrate.

## Excellence
Always apply: repo-mastery (read rules + ecosystem map), gstack for any visual output, verification/santa gates before claiming done.

## Worlds & Agent Creation (2026+)
The keystone is the Arcanea World Repo Standard (schemas/world.arcanea.schema.json + docs/WORLD_REPO_STANDARD.md).
- Source of truth = the world repo (portable, ownable, content-addressed via @arcanea/world-sdk).
- Coding harnesses (grok-arcanea, claude-arcanea, codex-arcanea, antigravity-arcanea, gemini...) are the creation engine + per-ecosystem marketplace distribution. Invest; delete none.
- Use the SDK: genesis/scaffold (deterministic), harness adapter (manifest.agents[] driven writes), evolution (recordMemory in .arcanea/ → distill → evolveCharacter + public canonLevel-2 "earned" lore), proof, index.
- Visual state for humans + agents: `node scripts/world-state.mjs <world-dir>` (or --json). Outputs 🌍 counts + 🎬 harnesses + palette. Wire into ACOS statuslines and agent bars.
- GitHub is central sovereign (user repo or OAuth-managed under their acct). App/PWA/mobile = complementary visual/consume layer only. No data landlord.
- Branch discipline for world work: agent/grok/arcanea-world-xxx (or equivalent per harness). Never dirty the default branch.
- Run mappers (world-to-higgsfield-game-mapper --world <path> [--write]) and world-state.mjs; respect memory/meaning pillars + 7 Pillars (world-build skill) for god-mode outputs (books central, games via Higgsfield, companions). Re-validate on example after changes.

SIP: Built on SIP v1.1.1 (starlightintelligence.org/protocol). Grok .grok personal excellence seeds active where installed.
