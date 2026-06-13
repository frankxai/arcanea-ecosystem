# Arcanea Cinematic — Design System (v1.0)

> Source of truth for the hero brand film. "Weaving cosmic threads." Creative multiverse. Living Universe Engine.

## Overview
Arcanea is not software. It is the creative operating system for a new era of world-building: one sentence becomes a persistent, visitable, ownable living universe with memory, evolving characters, original soundtrack, and visual canon. The film must feel like stepping through the Threshold — mythic yet precise, vast yet intimate, arcane magic rendered with cinematic craft and superintelligence clarity.

Mood: Dark cinematic premium. Epic, soulful, wondrous, sovereign. Think Denis Villeneuve + refined mythic fantasy + Refik Anadol data-poetry + the quiet power of a FrankX vision.

## Colors (Dark Premium Arcane)
```yaml
colors:
  bg: "#05070f"              # Deep void, almost black with indigo bias
  bg-alt: "#0a0f1f"          # Slightly lifted for layers
  fg: "#f0e9d9"              # Warm parchment / starlight cream (never pure white)
  fg-muted: "#a8a39a"        # Subtle text, captions, secondary
  accent-gold: "#c5a26f"     # Primary arcane gold — threads, highlights, sovereignty
  accent-gold-bright: "#e8d5a3"  # For specular pops and light leaks
  accent-indigo: "#3f2a6b"   # Deep void-violet, mystery, the Fabric
  accent-crimson: "#6b2a2a"  # Ember for creation spark, passion, living blood of worlds
  accent-teal: "#2a5c5c"     # Ethereal star-teal for memory, graph connections, future
  surface: "#121826"         # Cards, panels, midground depth
```

All neutrals are tinted toward the accent family. No dead gray. Gold and indigo are the soul colors.

## Typography
- **Display / Lore (headlines, titles, big reveals):** Playfair Display or similar high-contrast elegant serif (or built-in equivalent with strong weight contrast). 72–140px. Generous tracking on all-caps for gravitas. Lowercase for intimate moments.
- **UI / Modern / Data (body, labels, graph, code-like):** Inter or JetBrains Mono for precision. 28–42px body in video. Tabular for any numbers.
- **Voice / Captions:** Inter, slightly tightened. 22–28px. Excellent legibility on dark with subtle glow or shadow for separation.
- Weights: 700–900 for impact, 300–400 for poetry and breath. Never light on dark without compensation.

OpenType features where available: small-caps for ancient law feels, discretionary ligatures for beauty.

## Elevation & Depth (Cinematic, not UI)
- Deep shadows, rich blacks, subtle filmic vignettes.
- Layered parallax planes (foreground text sharp, mid characters, background world + nebulae at different speeds).
- Light treatment: god rays, floating embers, radial glows from accent-gold at 8–18% opacity breathing.
- Grain: Persistent very subtle film grain + occasional heavier for texture on holds.
- No neon. No cyan overload. Magic is warm gold + cool void, not sci-fi HUD.

## Motion Signature
- **Energy:** Deliberate. Slow cinematic builds (0.8–2.0s entrances), long luxurious breathes (holds with one living ambient), decisive resolves.
- **Easing vocabulary (vary religiously):** expo.out / power3.out for confident reveals; sine.inOut for dreamy drifts and ambients; power4.in for dramatic compressions; back.out(1.6) sparingly for "magic arrival" overshoots.
- **Choreography:** Hierarchy first. The thing that moves first is the most important. Overlap entries. Stagger <500ms total. Every decorative has slow ambient life (breathe, drift, orbit, pulse).
- **Cinematic verbs:** WEAVE, SUMMON, ETCH, ORBIT, IGNITE, REMEMBER, THRESHOLD, AWAKEN, SOVEREIGN.
- **Camera language (simulated):** Slow dolly push (scale + perspective on layered planes), parallax pan, gentle rack (sharp <-> soft layers), orbital Three.js moves for the World Graph and cosmic weave.

## Atmosphere (per scene, 3–6 elements)
- Oversized ghost typography at 4–12% opacity, very slow drift or rotate.
- Radial gold/indigo glows, breathing.
- Subtle hairline rules or constellation lines (animated scale or draw).
- Seeded particle fields (Three or Canvas) — stars, threads, memory motes, embers.
- Film grain + vignette + occasional anamorphic flare simulation (large soft radial + streak).
- Structural: thin gold borders, registration marks, canon page edges.

## Do's and Don'ts (Non-negotiable for this film)
**Do:**
- Anchor to edges or strong compositional zones (never dead-center floating everything).
- Two focal points minimum per hero frame; eye travel.
- Fill the frame at video scale (headlines 60%+ width).
- Use sub-compositions for every reusable system (weave, swarm, graph, portal).
- Three.js for true depth and procedural cosmos (World Graph, thread weaving, floating architectures).
- Shader transitions (domain-warp / gravitational-lens) for reality shifts and Threshold moments.
- Deterministic everything. Seeded PRNG only.
- Generous cinematic padding inside .scene-content (100–180px).
- Long holds that feel alive.

**Don't:**
- Neon gradients, pure black/white, cyan overload, AI-slop defaults.
- Centered stacks with equal weight.
- Same ease or direction repeated across a scene.
- Exit animations before transitions (transition owns the exit).
- Tiny web-sized text or 1px lines.
- Random or time-based logic.
- Clutter without hierarchy or breath.

## Technical Notes for HyperFrames
- Canvas: 1920×1080 base, 60fps final master.
- Root duration target: 90–120s for the "gigantic" cut (modular for 30s/60s social cuts later).
- Variables: genesisSentence, worldName, character1, character2, tagline for easy variants.
- Every image plate receives cinematic treatment (perspective tilt + slow Ken Burns + parallax wrapper).
- VO + captions are first-class; script lives in assets/vo-script.txt.
- Final delivery: high quality 60fps MP4 + project source (fully editable, versionable).

This design.md is law for the composition. Every color, font decision, spacing, and motion choice must trace back here or the Arcanea strategy (Living Universe Engine, coherence, gasp, sovereignty, world repo as soul).
