# arcanea-cinematic-hero — Grok Harness Notes

This is a HyperFrames composition (HTML + GSAP + Three.js driven video).

## Must-Follow (Grok specific)
- This subdir has its own scoped instructions: prefer reading the local `CLAUDE.md` and `AGENTS.md` (they were written for agent use on this exact comp).
- Native .grok/hooks (excellence) + skills are seeded here so SessionStart/PreToolUse fire when you `cd` directly into this folder and launch `grok`.
- After **every** edit to `index.html`:
  1. `npm run check`  (or `npx hyperframes lint --verbose && npx hyperframes validate && npx hyperframes inspect`)
  2. If lint fails or warnings about timeline density / duplicates, fix before proceeding.
- Never paste duplicate `tl.to(..., time)` / `tl.fromTo` blocks for the same target (common when instructions are not loaded). The captions.forEach and BEAT transitions are especially sensitive — one set of tweens per logical action.

## Key Local Rules (from CLAUDE.md / package.json)
- Use hyperframes-cli, gsap, three skills.
- Deterministic only.
- data-* attributes + class="clip" on timed elements.
- `window.__timelines["main"] = tl;`

## When Working Here from Grok
Run `/skills harness-integration` or just describe the intent; the seeds + local MDs will guide.

If you see duplicated animation code in the diff or output, the hooks/instructions were not active — stop and re-read the local + root GROK.md/AGENTS.md.

Built on SIP. God 99 gates apply (repo-mastery + excellence-review + gstack for any preview/render validation).
