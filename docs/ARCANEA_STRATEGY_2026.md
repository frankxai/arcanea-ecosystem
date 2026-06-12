# Arcanea Strategy — The Living Universe Engine (2026)

> Canonical strategy reference. Everything points here.
> Status: thesis locked 2026-06-05. Owner: Frank.

---

## 0. The one sentence

**Arcanea is the Living Universe Engine: speak a world into existence — lore, characters that remember and evolve, an original soundtrack, and a visual canon — that persists, that others can enter, and that you can own.**

What a user says to a friend after using it:
*"I built a whole living world — with its own characters and soundtrack — in an afternoon, and my friends can walk into it."*

That is a company. "An agentic creative platform with orchestration layers" is a GitHub org. We are building the first.

---

## 1. The diagnosis (why we were stuck)

The blocker was never ambition — it was **big thinking sprayed across 46 repos and 93 app routes**, so nothing became undeniable. Category-defining companies do the opposite: one impossibly-good thing, everything else deleted or subordinated.

Ground truth (June 2026):
- 46 Arcanea repos under `frankxai` + 6 under `Arcanea-Labs`.
- `arcanea-ai-app` has 93 top-level routes; core chat works, most peripheral routes are prototype-grade stubs.
- Verdict from the codebase scan: *"designing-as-building rather than shipping a tight MVP."*

The asset hiding in the sprawl: **486K words of canon, 16 realized Luminors, the Element + Guardian mythos, and a full multimodal stack (chat + music + 200+ image/video models + worlds + books).** Competitors have engines. Arcanea has a *soul*. That is the thing to bet everything on.

---

## 2. The unifying architecture — one front door, three layers

The coding-agent work is **not** a detour and **not** a peer competing for the homepage. It is the deep layer of a stack. Focus = pick the front door, not amputate the depth.

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1 — THE EXPERIENCE   "Speak a world into being"   │  ← front door
│  Consumer. arcanea.ai. The wedge, the brand, the gasp.   │     (Genesis flow)
│  Revenue: subscriptions ($10–30/mo).                     │
├─────────────────────────────────────────────────────────┤
│  LAYER 2 — THE FORGE        "Build it deep"             │  ← creators / pro
│  Bring agents, assets, custom logic. Studio + Claw +     │     (coding agents
│  music pipelines. Worlds become interactive, ownable,    │      surface to USERS)
│  monetizable. Revenue: pro tier + marketplace take.      │
├─────────────────────────────────────────────────────────┤
│  LAYER 3 — THE FABRIC       "The living substrate"      │  ← platform / infra
│  World Graph + memory + orchestration (flow/orchestrator)│     (the agent
│  + coding harnesses (claude/codex/arcanea-code) + MCP.   │      investment lives
│  Invisible to consumers. Eventually an API/SDK others    │      here, re-stacked)
│  build on. Revenue (later): platform/API + usage.        │
└─────────────────────────────────────────────────────────┘
```

**Funnel:** consumer creates a world → becomes a creator who goes deeper → the best build real interactive experiences/games with agents + code.
**Flywheel:** more worlds → richer fabric (memory, assets, agents) → better worlds → more creators.

The six coding harnesses stop being six competing products and become **the platform layer that makes worlds executable.** Nothing wasted; it is re-stacked.

**Sequencing rule:** Layer 1 must be undeniable before Layer 2 is monetized, and Layer 2 must have real creators before Layer 3 is opened as a platform. Build the stack top-down by *revenue*, even though the fabric is built bottom-up by *engineering*.

---

## 2.5 The substrate & the money (locked 2026-06-06)

### Substrate — Hybrid, repo-canonical
- The **world repo is the source of truth** — portable, ownable, forkable, agent-editable. BYO repo, or Arcanea creates a **managed repo under the user's own account** via OAuth. Users never need to understand git.
- **Arcanea hosts the derived layer only:** interface, world-graph *index*, render cache, auth, billing, marketplace, public world pages, and (paid) private/hosted worlds + sync.
- **Sync direction: repo → index.** The DB is derived and rebuildable from the repo on push/webhook; canonical content never lives only in our DB. The one exception is paid hosted/private worlds, where we hold a working copy under scoped processor terms (like any SaaS).
- **Liability posture: tool-not-landlord.** Free/public worlds live in the user's own repo — we're infrastructure, not the host of record. This collapses data-controller exposure; AUP/ToS covers the rest. (Matches "no legal headache, less support, build riches": you do not store or control user canon for public worlds.)
- **Two doorways, one substrate:** technical users bring/own the repo directly; non-technical users get the managed repo + visual layer and never see git. Same canonical world underneath.
- **Grok central (Jun 2026+):** Grok harness + native Imagine (image gen/edit + image-to-video 1.5, text-to-video, refs for visualDna coherence, cinematic motion + audio in one) is first-class for canon assets (portraits, covers, short lore scenes, book visuals). Coding agents (any harness) read/write the world repo standard; Grok excels at coherence + asset gen then commit. App + PWA/mobile are **complementary consumption + beautiful visual state/editor** (enter worlds, chat/edit characters in nice UI, gallery). Not the build/ownership layer. Interchangeable: app scaffolds or syncs to user GH repo; agents (incl Grok) work the structured folders/manifest directly. PWA/mobile for showcase/consume, not primary SaaS hosting of user data. Subs/premium only for hosted accel, private sync, marketplace reach, higher limits, premium Grok-powered packs — never "we own/store your worlds".
- **Riches without the bullshit:** Creators orchestrate agents (learn via ACOS/Arcanea skills + world standard) to turn worlds into books (central /books), games (quests+agents), webapps (fork blueprints), content. Sell via marketplace (platform take 10-20%), earn Label rev-share when we materially help commercialize. Onchain proofs invisible for provenance/royalties. We make money when creators succeed and need scale/visibility/premium gen/hosting. Free create + export always; GitHub (user acct or managed) keeps sovereignty. No storing their sht for the core product = no landlord liability.

### Pricing doctrine
> **Free to create · Paid to accelerate · Transactional to sell · Partnered to scale · Onchain to prove.**

- **Free to create:** starter worlds, basic world graph, a starter public page, full export. No lock-in, ever.
- **Paid (Creator / Studio subscriptions) — the bootstrap engine:** hosted/private worlds, memory & continuity, higher agent-run limits, private repo/world-bundle sync, beautiful public pages, collaboration, advanced exports, publishing tools, marketplace access, premium Luminor/agent packs.
- **Marketplace take:** 10% on direct creator sales · 20% on featured/discovery-driven sales. Products: world templates, quest packs, character packs, prompt/music packs, agent skills, academy challenges, visual kits, creator tools.
- **Arcanea Label (opt-in rev-share, 10–20%):** earned only when Arcanea *materially* helps commercialize a world — publishing, promotion, production, packaging, marketplace launch, ecosystem partnerships. Not a default platform tax.
- **Decentralization — core from day one, complexity later.** *Not* "onchain later." Worlds are portable, exportable, **content-addressed, and provable from day one** (see content hashing in the World Repo Standard). Onchain is an **invisible** proof / ownership / certification / royalty rail — never wallet hell in the user's face.
  - **Day one:** invisible embedded wallet (Privy/Dynamic), content hash, an optional **"Claim World Proof"** button, **Solana-first** proofs (Metaplex Core for relics, Bubblegum/cNFTs for abundant low-cost badges via Helius).
  - **Later:** full IP markets, royalties, licensing — **Polygon/AggLayer** (interop + commercial IP) and **Base** (mainstream + agentic commerce), thirdweb/Crossmint for EVM/checkout, Arweave/Irys for finalized **public** artifacts only.
  - The manifest is **chain-agnostic**: `provenance[]` records each name their own chain. Solana-first ≠ Solana-locked.

**Principle:** Arcanea is *tool-not-landlord* and *decentralized by design, not blockchain-first by friction*. Creators own their worlds — portable, provable, sovereign. Arcanea earns by helping them create more, publish better, distribute wider, and succeed bigger. **Abundant worlds now · sovereignty from day one · onchain proof without onchain pain.**

> Keystone spec: `docs/WORLD_REPO_STANDARD.md` + `schemas/world.arcanea.schema.json`.

---

## 3. The Genesis flow (Layer 1 — the hero experience)

**Promise:** one sentence → a living world in under 90 seconds.

The defensible hard part is **coherence** — every rival owns one modality; we must make four feel like one soul. The mechanism: generate a **World Bible first**, then condition every modality on it.

```
sentence ("a drowned city where memory is currency")
        │
        ▼
 [World Bible Agent]  →  WORLD BIBLE (JSON): name, premise, 3 laws,
        │                visual DNA (palette+style), tone, 2–3 characters
        │                ↳ the shared seed everything reads from
        ├──────────────┬──────────────┬──────────────┐
        ▼              ▼              ▼              ▼
 [Lore Agent]   [Visual Canon]  [Soundtrack]   [Character cast]
  founding lore   key-frame img   20–30s theme   persona + voice
  (Claude/Gem)    (arcanea-studio)(Suno/music)   (+TTS later)
        └──────────────┴──────────────┴──────────────┘
        ▼
 [Coherence Director]  →  rejects/regenerates anything off-DNA
        ▼
 WORLD GRAPH entity  →  Living World page + playable character chat + theme
        ▼
 "Enter this world" → shareable URL (The Threshold)
```

### Data model — the World Graph INDEX (Supabase + pgvector)
Under the hybrid model the **repo is the source of truth**; this schema is the **derived index + render cache** (rebuilt from the repo on push), plus the things that genuinely belong server-side (auth, billing, marketplace, public-page cache). `worlds` carries a pointer to the canonical repo. Genesis *scaffolds a world repo*, then indexes it here — same gasp, your architecture.

| Table | Key fields | Why |
|---|---|---|
| `worlds` | premise, laws, visual_dna, palette, theme_audio_url, visibility | the persistent object |
| `characters` | persona, backstory, voice_id, portrait_url, **evolution_state** | the living cast |
| `memories` | character_id, content, **embedding**, salience | "never forgets" (table stakes) |
| `lore_entries` | title, body, embedding, canon_level | deepening canon |
| `assets` | type(image/audio/video/3d), url, prompt | the multimodal canon |
| `events` | actor, type, payload | living timeline; visitor actions leave traces |

**The two moat mechanics (nobody ships these well):**
- **Evolution, not just memory:** async job distills `memories` → updates `evolution_state`, writes new `lore_entries`. Characters *change* over weeks.
- **Worlds as social objects:** the share link is a *place* that keeps living when you leave; visitor choices write `events`. Network effect.

### MVP — ship the gasp, defer everything else
1. Genesis: sentence → World Bible → **1 canon image + 1 theme + 2 characters**, coherence-checked.
2. Living World page: canon image, theme auto-plays, character list.
3. Character chat with **persistent memory** (pgvector retrieval per turn).
4. Share link (visitors read + chat).
5. Auth + **hard freemium cap** (3 free worlds — the Suno conversion mechanic).

**Defer:** 3D, voice, evolution job, multiplayer presence, economy. Prove gasp + week-2 retention first.

---

## 4. Competitive teardown — where to leapfrog

The category is splintered into well-funded single-capability silos. That is the opening.

| Player | Owns | Pricing | Weakness to exploit |
|---|---|---|---|
| Character.AI | Consumer companions, 20M MAU @ 75min/day | $9.99/mo | Text-only, shallow memory, no music/3D |
| World Labs (Fei-Fei Li, $1.23B) | 3D world geometry (Marble) | $20–95/mo | Empty rooms — no life/narrative/sound |
| Inworld ($500M val) | Voice/agent runtime | usage | Pure plumbing — integrate, don't fight |
| Iconic ($13M seed) | On-device voice game worlds | dev tool | No consumer destination |
| Jenova | Persistent RPG game-master | $20–200/mo | Text-only, niche TTRPG |
| Suno | AI music ($300M ARR, $5.4B val) | $10–30/mo | Single modality (proves economics) |
| Story Protocol | On-chain IP rails | token/fees | No creation surface, no users |

**Copy:** ① on-device/edge voice (Iconic — COGS) ② exportable/ownable world artifacts (World Labs) ③ "never forgets" headline (Jenova) ④ hard freemium cap (Suno) ⑤ in-experience generation (C.AI Imagine Gallery).

**Leapfrog — what NONE do well (our category):**
1. Multi-modal canon in one persistent object.
2. Worlds as living, visitable social objects with an evolving URL.
3. Characters that *evolve*, not just remember.
4. Creator economy on owned IP (joins Story Protocol's rails + C.AI's creation surface).
5. **God-mode mapper + memory/meaning substrate that turns worlds into ultimate digital products (esp. playable games) via integrated MCP/harness stack (Grok native Imagine/video + Claude Fable 5 + Higgsfield MCP for game creation + Arcanea MCPs/skills for persistent state + graph + orchestration).** Higgsfield Games (Jun 2026) lets agents "describe a game → Fable writes full story/code + deploys playable link; MCP generates all stunning visuals/assets." Arcanea enriches it as the mapper: feed rich world (memory + meaning + 7 Pillars from world-build skill + visualDna + evolution) so games have persistent NPC memory, lore-consistent mechanics from laws/beliefs/tensions, emotional depth, and community co-evolution. Output writes back to the GH world repo. Ultimate worlds spawn books, games, AI companions, experiences — creators orchestrate the stack to ship; we capture via marketplace/tools/premium when they succeed. Superintelligence fabric.

**Why now:** $2B+ into world-models in Q1 2026; modalities just crossed the quality bar; memory infra mature. Silos exist; nobody integrated. Companion market ~$37B→$318B; AI-in-gaming ~$10B→$75B.

---

## 5. Pressure-test — the honest version

**Who pays:** L1 consumers for delight ($10–30/mo, proven by Suno + C.AI) → L2 creators for depth → L3 platform/API. Prove L1 conversion first.

**The four things that kill it:**
1. **Coherence fails** → just a worse bundle of separate tools. *Existential engineering risk.* Mitigate: World-Bible-first conditioning + existing taste as style anchor.
2. **Worlds feel dead after creation** → retention craters. The evolution + visit loop is the bet. **Kill criterion: if MVP week-2 retention on created worlds ≈ 0, it's a tech demo, not a category.**
3. **Cost/latency** → 4 modalities in 90s is expensive. Mitigate: hard freemium, seed/cache library, on-device voice later.
4. **The founder.** The 60-route / 46-repo pattern is the single biggest threat. Focus is the strategy.

**Fast-follow risk:** C.AI could bolt on music/visual. Defense: speed + taste + world-as-owned-object (structurally slow for them to copy).

---

## 6. Portfolio decision — REVISED (delete nothing)

The earlier "archive 15 / delete forks" plan was too aggressive for this model. Under repo-canonical + per-ecosystem distribution, the coding-agent harnesses are the **creation engine and marketplace reach**, not parked infra. **Delete zero.** Archive only genuinely-empty stubs / exact dupes, and even that is optional.

| Bucket | Repos |
|---|---|
| **CORE** | `arcanea-ai-app` (interface · index · render cache · billing) + the world-repo template/standard |
| **CREATION ENGINE (invest — the per-ecosystem harnesses + ACOS statusline)** | `claude-arcanea`, `codex-arcanea`, `gemini-arcanea`, `antigravity-arcanea` *(new/planned)*, `grok-arcanea` (Grok native + Imagine image-to-video 1.5+ Jun 2026 for coherent world visuals/video canon; structured agents per world.arcanea.json), `arcanea-code`, `oh-my-arcanea`, `arcanea-vscode`, `arcanea-orchestrator`, `arcanea-flow` |
| **CREATOR SURFACES (keep)** | `arcanea-studio`, `arcanea-claw`, `arcanea-video-pipeline`, `arcanean-library`, `arcanea-author`, `arcanea-core`, `arcanean-prompt-language`, templates set |
| **MARKETPLACE / IP — "onchain to prove" (keep, park until creation loop works)** | `arcanea-marketplace`, `arcanea-nft-forge`, `arcanea-onchain` |
| **CONSUMPTION (later)** | `arcanea-mobile` — PWA/mobile = consume & showcase, **not** the build surface |
| **ARCHIVE only if truly dead (optional, your call)** | exact dupes / empty stubs e.g. `Arcanean-AI-Image-Generator-`, `infogenius` (dupe of `arcanea-infogenius`), `arcanea-lobechat-labs` |
| **DELETE** | none |

App routes: still collapse 93 → ~25 around the hero flow — but that's a **refactor inside CORE**, not repo deletion. Cut/merge `/council`, `/cockpit`, `/arcanea-os`, `/arcanea-vault`, `/rooms`, `/command`, `/design-lab`, `/v3`, `/v4`, duplicate chat/agent/code routes.

---

## 7. Sequence

1. **This week:** thesis locked (done) + execute repo/route audit (clearing clutter is the unblock).
2. **Next 4–6 weeks:** build the Genesis MVP (§3). One flow, polished to a gasp.
3. **Measure:** week-2 retention + "did people gasp." That decides whether to pour fuel.
4. **Then:** open Layer 2 (Forge) for creators; later Layer 3 (platform/API).

**Audience = both at once, but sequence the doorways.** Same repo-canonical substrate serves both; ship the **creator/builder doorway first** (BYO/managed repo + agent orchestration — your people, they pay, low support), with the **non-technical managed+visual doorway as a fast-follow** weeks behind, not a separate product. One substrate, two on-ramps, staggered.
