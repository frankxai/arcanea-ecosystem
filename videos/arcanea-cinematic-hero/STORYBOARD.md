# Arcanea Cinematic Hero — Storyboard & Production Bible
**Project:** videos/arcanea-cinematic-hero  
**Target:** 100–120s master @ 1920x1080 60fps (gigantic, premium, re-cuttable)  
**Style:** Shadow Cut + Data Drift + Velvet Standard fusion — dark arcane cinematic, cosmic threads, living multiverse.  
**Core Promise (from strategy):** "I built a whole living world — with its own characters and soundtrack — in an afternoon, and my friends can walk into it."  
**One-sentence film thesis:** From a single sentence in the void, golden threads weave a persistent, visitable, ownable universe where memory lives, characters evolve, and creators become sovereign gods of their canon.

Follow **design.md** religiously. Every element earns its place. Layout before animation. Transitions own exits. Sub-comps for systems. Three.js for cosmos and graph. VO + word-accurate captions first class.

---

## Overall Rhythm & Architecture
**Pattern (cinematic trailer grammar):**  
SLOW-MYSTERY → SWELL-ORCHESTRATION → KINETIC-PEAK (swarm + graph ignition) → EMOTIONAL-HOLD (Threshold) → SOVEREIGN-RESOLVE → END CARD

**Structure (root composition + sub-comps):**
- Root: main timeline, scene containers (data-start/duration/track), audio tracks (VO primary), global overlays (grain, vignette, light leaks).
- Sub-comps (compositions/):
  - cosmic-weave.html — background particle + thread system (reusable, seeded)
  - character-manifest.html — portrait + name + memory glow reveal
  - agent-swarm.html — 16 orbiting luminous intelligences (or representative cluster) with data trails
  - world-graph.html — Three.js interactive-feel constellation that coalesces into locations/quests/characters
  - threshold-portal.html — the doorway, camera push, "enter" moment
  - lore-etch.html — laws/bible text that etches itself in light
  - title-treatment.html — reusable for acts and end card

**Timing targets (approximate, will lock in code):**
Total ~110s. Long luxurious holds with living ambients. Overlap transitions 0.4–1.2s. VO drives emotional pacing.

**Visual DNA consistency (every plate + procedural must honor):**
Deep void bg, warm parchment fg, arcane gold threads/highlights, indigo mystery, ember crimson spark, teal memory. Intricate, filmic, no slop. Large typography. Depth via parallax + Three layers.

---

## BEAT 1 — THE SPARK (0–12s) "One sentence. A world is born."
**Concept:** Pure void. A human voice (creator) speaks a genesis sentence. Golden threads erupt from the words and begin weaving the first threads of reality. Camera is already inside the cosmic fabric.

**Mood direction:** Cinematic title sequence. The kind where you lean forward. Sacred. Quiet power. Think Arrival opening + Dune spice vision + handwritten spell in light.

**Choreography verbs:**
- Void breathes (subtle Three nebula + radial gold glow slow scale breathe).
- Sentence materializes letter-by-letter or word-by-word with etched light (kinetic type or path draw + glow).
- Threads WEAVE outward (procedural lines + particles following seeded paths, slow then accelerating).
- First distant world silhouette (floating island or tower) coalesces from the threads at the horizon of the frame.

**Layout (end-state hero frame t~8s):**
- Large elegant serif sentence centered or slightly left-anchored, 90–110px, warm cream with gold specular edge.
- Very subtle oversized ghost "ARCANEA" or "LIVING UNIVERSE" at 6% drifting in bg.
- Thin gold hairline rules or constellation points anchoring edges.
- Bottom-right micro metadata: "GENESIS 00:00" or similar in mono.

**Animation notes:**
- Offset first motion 0.2s.
- Sentence: from scale 0.96 + opacity 0 + slight letter-spacing wide → normal over 2.8s power3.out.
- Threads: continuous ambient weave (sub-comp handles).
- Slow dolly-in feel via increasing scale on a deep parallax layer + Three camera Z.
- Ambient: one living breath on the nebula.

**Transition out:** Domain-warp shader (reality tearing open) or slow velocity-matched upward dissolve into bible formation. VO lands a downbeat.

**VO (draft):**
"One sentence... is all it takes."

**Captions:** Elegant, minimal, per-word subtle gold underline or highlight sweep. Large enough.

**Assets:** Hero plate 01 (cosmic spark / threads from words) treated with perspective tilt + very slow Ken Burns + heavy parallax layers.

---

## BEAT 2 — THE BIBLE (12–26s) "The World Bible ignites."
**Concept:** The full World Bible (premise, laws, visualDNA, tone) assembles itself in light. Visual canon blooms. Coherence is born. The first two characters (Luminors / Guardians) step forward from the pages.

**Mood:** Wonder + precision. The moment a myth becomes architecture.

**Choreography verbs:**
- Laws ETCH themselves (text draws or fades with light scribe line).
- Visual DNA swatches (palette squares) ORBIT into position and lock with satisfying clicks (subtle scale pop).
- Characters SUMMON: two distinct portraits (one more guardian/ancient, one more luminous/ally) rise from mist/particles, gain color and detail, eyes catch light.
- Name + one-line essence lock under each with memory-seed glow.

**Layout:**
- Split or layered: left heavy lore text (laws as elegant justified block), right character diptych or staggered reveals.
- Large "WORLD BIBLE" small-cap or all-caps gold label top.
- Background: pages of canon faintly visible or the weave now forming grid-like structure of the world.

**Sub-comps heavily used:** lore-etch + character-manifest x2.

**Transition:** Cross-warp morph or clean velocity whip into the Forge. Or hard elegant cut if percussive.

**VO:**
"From it, a bible. Laws that hold. A visual soul that every future creation must obey."

---

## BEAT 3 — THE FORGE (26–48s) "16 specialized minds. The swarm awakens."
**Concept:** The agentic layer. Coding harnesses, orchestration, flow — visualized as 16 (or a poetic cluster representing them) luminous agents orbiting a central creative core. They are not tools; they are specialized intelligences in concert. Data, lore, visuals, sound, code, memory — all flowing.

**Mood:** Orchestral. Alive. The "superintelligence" feeling without corporate sterility — more like a celestial council or mythic muses with purpose.

**Choreography verbs:**
- Agents ORBIT at different radii and speeds (Three.js point lights + small glyph bodies or abstract luminous forms).
- Memory threads (teal) PULSE between agents and central world core.
- Tasks CASCADE: a visual canon fragment flies to one agent, music motif to another, character evolution to a third — all in elegant arcs.
- The whole system BREATHES in unison on the downbeats.

**Technical:** Primary Three.js sub-comp (agent-swarm + world-graph lite version). GSAP drives high-level orchestration timing; Three updates on hf-seek or timeline position.

**Layout:** Central glowing "Arcanea Core" (subtle logo or abstract world seed). Agents arrayed in elegant orbital shells. Thin data streams (lines with traveling dots) connecting everything. Occasional close-up "agent thought" — a single law or image fragment that sharpens then returns to the flow.

**Transition:** Gravitational-lens shader (space itself bending as the world becomes real) into the Living peak.

**VO:**
"Sixteen minds. One living substrate. They remember. They evolve what you create."

---

## BEAT 4 — THE LIVING (48–72s) "Characters that remember. Worlds that breathe."
**Concept:** The world is alive now. Characters have memories, small evolutions. A visitor (or the creator) enters. A choice is made; the world records it. Soundtrack (implied) and visual canon are locked and singing together.

**Mood:** Emotional, intimate, vast at the same time. The "gasp" beat.

**Choreography verbs:**
- Character close-up: subtle expression shift or memory glow (eyes catch a new light, a small smile or knowing look, a line of new lore etches faintly on their portrait).
- World elements (locations, objects) REMEMBER — a previously seen symbol or color reappears with new meaning.
- Visitor silhouette or first-person threshold step: the frame becomes the doorway.
- Graph nodes (from previous beat) now have living pulses and visitor traces.

**Sub-comps:** character-manifest (evolved state), threshold-portal, world-graph (now with events layer).

**Key hero moment (t~60s):** The character turns their head slightly toward camera / viewer. "You are not just the author. You are part of the canon now."

**Transition:** Slow, emotional crossfade or soft shader into the Threshold proper.

**VO:**
"Characters that remember you. Worlds that change because you were there."

---

## BEAT 5 — THE THRESHOLD (72–92s) "Enter the world you built."
**Concept:** The money shot. The creator (or any visitor) steps through a beautiful arcane portal. The camera follows or pushes through. We are now *inside* the living world — floating islands, libraries that remember every reader, characters mid-conversation that notice you, the soundtrack fully present (visual music reactivity if we have stems or strong amplitude).

**Mood:** Awe. Belonging. The realization that this is not a demo — it is a place you can live in and own.

**Choreography verbs:**
- Portal IGNITES / OPENS (concentric gold rings, domain-warp interior reveal, threads pulling viewer in).
- Camera PUSH (layered planes accelerate at different rates; Three world elements rush past or bloom).
- First interior frames: rich detail, living micro-moments (a character wave, a book opening by itself, distant music visualized as light).
- Text: "Your world. Your rules. Your IP." lands with quiet sovereignty.

**Technical highlight:** Threshold-portal sub-comp + heavy Three.js world interior or layered 2.5D hero plate with strong parallax + post-process feel (vignette tightening, color grade shift to warmer/more saturated inside).

**VO:**
"Speak a world into existence... then walk inside it."

---

## BEAT 6 — SOVEREIGN CANON + END (92s–end) "Abundant worlds now. Sovereignty from day one."
**Concept:** The full canon locks: visualDNA, characters with memory, theme, books/quests, the world repo as the source of truth, invisible onchain proof as quiet crown. Final line is the strategy gasp + direct CTA.

**Mood:** Triumphant but intimate. Not hype — earned power and invitation.

**Choreography:**
- Montage of previous motifs re-seen with new coherence (threads now connect everything).
- Repo icon or "world.arcanea.json" manifests as a glowing artifact.
- "Claim World Proof" shimmer (subtle, not wallet UX — invisible sovereignty).
- Final hold on a breathtaking interior or exterior of the living world with the creator silhouette or empty inviting space.
- End card: ARCANEA™ logo treatment (gold on void), arcanea.ai, "The Living Universe Engine", small "Free to create. Paid to accelerate. Yours to own."

**Transition to end card:** Elegant slow fade or page-burn that feels like closing a sacred book.

**VO (final lines):**
"This is Arcanea. Creative superintelligence for those who build worlds that last.  
One sentence. Your world.  
Start at arcanea.ai."

**Captions:** Final lines larger, more ceremonial. Logo lockup holds long.

---

## Production & QA Checklist (HyperFrames)
- [ ] design.md followed in every hex, font, spacing, motion signature.
- [ ] Layout before any GSAP (end-state hero frames first).
- [ ] Every scene: 3+ different eases, varied directions, ambient life on decoratives.
- [ ] All multi-scene rules: transitions always, entrances on every element, no pre-transition exits.
- [ ] Sub-comps for weave/swarm/graph/portal/characters/lore.
- [ ] Three.js for cosmos + graph (seek-aware via adapter).
- [ ] VO script → tts (cinematic voice, ~1.0–1.1 rate) → transcribe → captions (cleaned).
- [ ] After every scene or major addition: 
  - npx hyperframes lint
  - npx hyperframes validate
  - npx hyperframes inspect --samples 20
  - node .../animation-map.mjs (if available in harness)
- [ ] Full scrub in `npx hyperframes preview` (Studio). Fix overflows, contrast, dead air, timing.
- [ ] Final: 60fps --quality high (or best). Consider 30s/60s social cuts as variables or separate renders.
- [ ] Deliverables: full source project, master MP4, hero stills, this storyboard, design.md, rendered assets list.

## Variants & Future Cuts
- 30s social: Beats 1 + 5 + 6 condensed.
- 60s trailer: 1-2-4-5-6.
- Variable-driven: different genesis sentences, world names, character pairs for demo renders.
- Music-reactive version (later): drop a produced theme and drive particle intensity / light pulses from amplitude + bands.

---

**This is the plan.** Execute scene-by-scene, sub-comp first where possible. Verify against design.md and this bible at every gate. The goal is not "good AI video" — it is an undeniable, rewatchable, brand-defining cinematic object that makes people feel the gasp and immediately want to speak their own world into being.

Weave the threads. Make it live.
