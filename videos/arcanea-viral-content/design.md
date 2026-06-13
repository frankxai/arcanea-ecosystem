# Arcanea Viral Content Suite Design System (v1.1)

Extends the cinematic hero design for explainer + short-form viral pieces. Consistent cosmic dark premium brand: deep void #05070f, warm parchment #f0e9d9, arcane gold #c5a26f, void-indigo #3f2a6b, ember #6b2a2a, teal memory #2a5c5c.

**Core for all pieces:**
- Visual DNA from World Bible: palettes, motifs (threads, orbs, glowing runes, floating islands, memory motes).
- Typography: Playfair Display for lore/headlines (large, elegant), Inter for UI/body (clean, video-scale 28px+), JetBrains for data/code.
- Motion: Deliberate cinematic (slow builds for explainer, fast punchy for viral shorts). Use main timeline onUpdate for Three living elements (weave, swarm, evolution pulses). Varied eases, ambient breathing on decor, no empty tweens.
- Density & Scale: Video-first – generous padding, 60px+ headlines, big readable captions, 3+ layers (bg cosmic, mid content, fg accents).
- Transitions: Shader domain-warp for "reality shift" (Genesis), velocity whip pans or crossfades for shorts.
- Accessibility/Virality: High contrast text overlays (gold on dark), subtitles always, emotional arc in every piece (curiosity → awe → empowerment → CTA).
- Assets: Reuse hero plates + new generated (step visuals, character before/after, music viz). TTS for VO (cinematic voice like am_michael or af_nova for warmth/power).

**Per-piece adaptations:**
- Explainer: Slower pacing, clear numbered steps, longer holds for comprehension, full VO script, synced elegant captions.
- Viral Shorts: 1-3s hooks (text + visual punch), big bold overlays, fast transformations, minimal VO or text-to-speech punchy lines, end with arcanea.ai + "one sentence" CTA. Vertical 9:16 or square where possible. High energy or intimate emotional depending on piece.
- Production: Follow HyperFrames rules strictly (layout before animation, entrances only, transitions own exits, deterministic Three, lint/validate/inspect gates). Test in preview for retention (first 3s must grip).

This ensures brand coherence across the cinematic hero and new content while optimizing for explainer clarity and viral hooks (per 2026 research: strong first-frame hooks, transformations, emotional demos, ownership empowerment, music sync).