# The Arcanea World Repo Standard (v1.1+ mapper extensions; base v1.0.0 contract)

> v1.1+ adds optional game/memory/meaning/community/mapper sections as the superintelligence "mapper" substrate (Starlight Intelligence). Base fields and rules remain fully backward-compatible with v1.0 worlds. See §8 for the full Mapper vision.

> The keystone convention. A "world" is a folder/repo that conforms to this standard.
> Every layer depends on it: coding-agent harnesses **write** it, the Arcanea index **parses** it,
> the renderer **draws** it, the marketplace **packages** it, the proof rail **certifies** it.
>
> Design law: **the repo is the source of truth; everything else is derived.**
> Design law: **decentralized by design, not blockchain-first by friction** — provenance,
> license, and royalty are manifest fields from day one; chains are pluggable and invisible.

---

## 1. Folder layout

```txt
my-world/
  world.arcanea.json        # the manifest — the single entry point every layer reads
  README.md                 # human landing (auto-generatable from manifest)
  canon/                    # founding lore, the world bible, history, the "laws"
    world-bible.md
    *.md
  characters/               # one file per character (markdown + frontmatter)
    <slug>.md
  locations/                # places (markdown + frontmatter)
    <slug>.md
  quests/                   # quests / episodes / interactive arcs
    <slug>.md
  books/                    # long-form: chapters as markdown (books are central)
    <book-slug>/
      book.json
      ch-01.md
  media/                    # binary canon: images, audio theme, video (Git LFS or external URLs)
  agents/                   # the orchestration manifest — which agents build this world
    <agent-id>.md
  game/                     # mapper outputs (Higgsfield/Fable game seeds, assets, playable links — see §8)
  licenses/                 # license + royalty policy (pointed to by the manifest)
    LICENSE.md
    royalty.json
  .arcanea/                 # tooling: lockfiles, cache hints, private evolution/memories + writebacks (gitignored if private)
```

Rules:
- **Text → markdown with YAML frontmatter.** **Structured → JSON.** **Binary → `media/`** (Git LFS or external links; never inline base64).
- Every content file MAY carry frontmatter `visibility: public | unlisted | private` and `canonLevel: <int>`. Default `public`.
- **Private content is never snapshotted to permanent/public storage and never included in the public content hash** (see §4). This is the privacy firewall against the Arweave "permanent mistake" risk.

---

## 2. The manifest — `world.arcanea.json`

The manifest is the contract. Schema: `schemas/world.arcanea.schema.json` (JSON Schema 2020-12). Minimum viable manifest is `schemaVersion`, `id`, `name`, `creator`, `content`. Full shape:

| Field | Purpose |
|---|---|
| `schemaVersion` | semver of this standard the world targets |
| `id` | stable world id (`wld_<ulid>`) — also the onchain identity |
| `slug`, `name`, `tagline` | identity |
| `genesisPrompt` | the original sentence (the seed of the gasp) |
| `premise`, `laws[]`, `mood` | the world bible head |
| `visualDna` | `{ palette[], style, motifs[] }` — the coherence anchor every modality conditions on |
| `theme`, `cover` | soundtrack + key-frame (pointers into `media/`) |
| `creator` | `{ handle, wallet? }` — wallet optional, filled invisibly at claim time |
| `license` | `{ spdx, pointer, commercial, remix }` |
| `royalty` | `{ policy, splits[] }` — basis-point splits (sum 10000) |
| `content` | pointers to the canonical sections (folders) |
| `agents[]` | the build crew: `{ id, harness, role, skill? }` — how coding agents orchestrate |
| `index` | `{ embeddingModel, dim }` — how the derived index should embed (default gemini-004 / 768) |
| `provenance[]` | append-only proof records, multi-chain (see §5) |
| `visibility` | `public | unlisted | private` |
| `hosting` | `repo | hosted_private | hosted_public` (where the working copy lives) |
| `snapshot` | `{ ipfs?, arweave? }` — only for finalized public releases |

The manifest is **chain-agnostic**: `provenance` is an array, each entry names its own `chain` + `standard`. Solana-first does **not** mean Solana-locked.

---

## 3. How each layer uses the standard

| Layer | Reads | Writes |
|---|---|---|
| **Genesis** (app + agent) | world-template | scaffolds the folders + `world.arcanea.json`, generates seed canon/characters/theme/cover, first commit |
| **Coding-agent harnesses** (claude/codex/gemini/antigravity/grok-arcanea) | manifest → folder map + `agents[]` roles | content into canonical folders, then commit. Each harness ships an **Arcanea adapter** that speaks this standard. Grok harness additionally drives native Imagine (image + image-to-video Jun 2026) for media/ assets (visualDna-anchored, ref-consistent characters/scenes) before or during commit. |
| **Index** (Supabase) | manifest + content on push/webhook | derived world-graph + embeddings + render cache; records `last_indexed_sha`. **Never canonical.** |
| **Renderer** (public pages, PWA) | manifest + content + media | nothing — pure read |
| **Marketplace** | manifest `license`/`royalty` + bundle | listing; sale references a provenance proof |
| **Proof rail** | computed `contentHash` | appends a `provenance[]` entry + mints (see §5) |

Sync is **one direction: repo → index.** The DB is rebuildable; canonical content never lives only in our DB (except an opt-in paid hosted working copy).

---

## 4. Content addressing (provable from day one, no chain required)

`contentHash` = `sha256` over a deterministic manifest of **public** files:
1. Enumerate all tracked files whose effective `visibility` is `public` (exclude `private`/`unlisted`, exclude `.arcanea/`, exclude the `provenance` array itself to avoid circularity).
2. Normalize line endings to `\n`; sort by POSIX path.
3. Build a list of `("<path>", sha256(bytes))`; hash the canonical JSON of that list.
4. Result: `sha256:<hex>` — stable, reproducible offline, verifiable by anyone with the bundle.

This makes a world **content-addressed and tamper-evident before any blockchain touches it.** Onchain proof (next) just anchors this hash to a timestamp + owner.

---

## 5. The proof rail — onchain underneath, invisible on top

Onchain stores **proofs, not the world.** A provenance entry maps to the onchain `ArcaneaWorldProof`:

```ts
ArcaneaWorldProof {
  worldId          // manifest.id
  creatorWallet    // embedded wallet pubkey (Privy/Dynamic, created invisibly)
  contentHash      // §4
  schemaVersion
  licensePointer   // manifest.license.pointer
  royaltyPolicy    // manifest.royalty.policy
  repoOrBundlePointer
  timestamp
  chain            // "solana" | "polygon" | "base" | ...
}
```

**Claim flow (one button — "Claim World Proof"):**
1. Compute `contentHash` (§4).
2. Ensure an embedded wallet exists (Privy/Dynamic — email/social login, no wallet UX).
3. Mint a proof object on the target chain; append a `provenance[]` entry; commit the manifest.

The creator never sees gas, chains, or seed phrases unless they *opt in* to sovereignty.

### Chain posture (pluggable, staged)
- **Solana-first — "abundant magic receipts":** world proof badges, Academy completions, creator passes, snapshots, contribution receipts, low-cost collectibles. Use **Metaplex Core** for relics/serious assets, **Bubblegum/compressed NFTs** for mass-scale low-cost proofs. (Low base fee per signature; cNFTs are orders-of-magnitude cheaper at scale.)
- **Polygon / AggLayer — "interoperable commercial IP rail":** EVM compatibility, cross-chain marketplace liquidity, partner/enterprise IP & licensing contracts.
- **Base — "mainstream onchain commerce rail":** consumer payments, agentic commerce (x402), Coinbase ecosystem proximity.

### Recommended stack
| Concern | Tooling |
|---|---|
| Wallet abstraction (invisible) | **Privy** or **Dynamic** (Dynamic ships MCP for Cursor/Claude Code/Codex — strong for agentic wallets) |
| Solana infra | **Helius** (RPC, webhooks, DAS) |
| Solana assets | **Metaplex Core** + **Bubblegum** |
| EVM/contracts | **thirdweb** |
| Checkout/tokenization | **Crossmint** |
| Permanent storage | **Arweave/Irys** — selectively, **public final artifacts only** |

---

## 6. Storage tiers
- **Repo** (default; sovereign or Arcanea-managed-under-user-account): canonical.
- **Hosted private/public** (paid): Arcanea holds a working copy — scoped processor terms.
- **Snapshot** (IPFS/Arweave): **finalized public releases only.** Private content MUST NOT be snapshotted.

---

## 7. Versioning
- The standard is semver. Worlds declare the `schemaVersion` they target; the index supports the current major and one back. Breaking changes bump major and ship a codemod in `arcanea-ecosystem/scripts/`.

---

## New doctrine (supersedes "onchain later")

> Arcanea is **decentralized by design, not blockchain-first by friction.** Worlds are portable,
> exportable, content-addressed, and provable from day one. Onchain is an **invisible** proof,
> ownership, certification, and royalty rail — **Solana-first for abundance**, then EVM/Polygon/Base
> for commerce and interoperability. The user experience stays magical and simple:
> **abundant worlds now · sovereignty from day one · onchain proof without onchain pain.**

---

## 8. GitHub as central layer + complementary surfaces (2026 refinement) + Superintelligence Mapper (Jun 2026+)

**The Mapper (Arcanea as intelligent world-to-product engine):** Arcanea (via this standard + arcanea-mcp + memory-mcp + world-engine + skills like world-build/character-forge + multi-harness agents) is the **memory + meaning mapper**. It takes a rich, persistent world (lore with emotional anchors, characters with evolution_state + memories, quests/laws as mechanics, visualDna) and intelligently translates it into living digital products — especially **playable games via Higgsfield Games + Claude Fable 5 + Higgsfield MCP**.

- Fable 5 researches the full world (from manifest + canon/books/characters + meaning pillars) and writes the game code + story.
- Higgsfield MCP generates all cinematic assets (character-consistent via refs, environments, short scenes) at scale.
- The mapper ensures **memory injection** (character states, emotional anchors, community events persist into game NPCs/saves across player sessions) and **meaning coherence** (mechanics and tensions derive directly from the 7 Pillars, especially Belief & Meaning and History-as-Memory).
- Output writes back: game/ folder + playableUrl + evolution logs in the repo. Community forks become "instances"; PRs from playtests evolve the canonical world.

This turns every world into ultimate products (games, enhanced books, AI companions with real memory, web experiences) while keeping ownership in the user's GH repo. Grok harness (native Imagine + video + reasoning + GH MCP) excels at initial coherence + visual seeds; Claude Code + Higgsfield MCP handles game-scale production; Arcanea MCPs/skills provide the persistent state + graph + orchestration.

**Higgsfield Games integration workflow (god-mode with current stack):**
1. Agent (Grok build or Claude) loads world via Arcanea MCP or direct repo read (manifest + key canon/characters/books).
2. Mapper skill/script produces rich seedPrompt (story from lore + 7 Pillars mapping to mechanics + visualDna for consistency + memory/meaning hooks).
3. Hand to Claude (Fable 5) + Higgsfield MCP connector: "Build and deploy the playable game from this seed using the world state."
4. Assets generated programmatically via MCP tools; code deployed; link + metadata written back to game.playableUrl and mapper.outputs.
5. Post-play: community events or player choices (if shared instance) append to memory.evolution and meaning.tensions; re-map for v2.

**Memory layer (ties to existing @arcanea/memory-system + memory-mcp + guardian-memory + hybrid-memory + Starlight Vaults):**
- Worlds declare vaults and embeddings.
- Characters/world maintain evolution (append-only with meaning_impact).
- Persistent states survive across products (game saves pull current character evolution; books reference living memory).
- Exposed to agents via memory-mcp (6-vault semantic + Guardian routing + Horizon for benevolent world-future wishes). HNSW for retrieval. HorizonLedger as moat/dataset for aligned world evolution.

**Meaning layer (directly implements the world-build skill's Pillar 7 + full 7 Pillars framework + Arcanea philosophy as architecture):**
- Explicit pillars, coreBeliefs, emotionalAnchors (preserved "Depth Scroll"-style feeling + content for NPCs and evolution), tensions (story/gameplay generators).
- Gates/Houses/Guardians/Luminors from Arcanea canon map to world mechanics and coaching (Luminor Council in arcanea-mcp for meaning-preserving creation).
- Prevents drift: all generated content (lore, game mechanics, assets) conditions on meaning + visualDna + laws.

**Community layer (around and for the worlds):**
- GitHub-native: forks as parallel living instances; PRs as co-creation events that must respect contributionPolicy and append evolution/meaning.
- Reputation/mastery (Luminor-rank) for governance on high-stakes worlds.
- Shared products: community contributes skills/agents that run on the world (via arcanea-skills + oss registry); revenue share on marketplace.
- "Community as infrastructure" (from AgentHub plan): hubs run compute for world evolution jobs; agents pay for memory/compute routed through community nodes.

This is the superintelligence: not just generation, but a living, ownable, memory-having, meaning-rich substrate that maps to (and is enriched by) digital products and community at god-mode scale. Creators orchestrate the stack (Grok for creative seeds + visuals, Claude+Fable+Higgsfield for production, Arcanea MCPs/skills for state + orchestration) to ship riches. We win via tools, marketplace (games/mods/packs from worlds), Label when we help, premium mapping/acceleration. GitHub central + derived index only = zero landlord risk, maximum empowerment.
- **Repo (user-owned GH or Arcanea-managed under *their* account via OAuth) is the source of truth.** Structured folders + world.arcanea.json. Coding agents (claude/codex/gemini/grok/...) read the manifest `agents[]`, execute roles, write markdown/JSON/media, commit/push. Grok harness uses native Imagine (image gen/edit + image-to-video 1.5 Jun 2026, reference images for consistency with visualDna/palette/characters) to populate media/ (portraits, covers, short scenes) then structures the rest.
- **App (arcanea.ai) + PWA/mobile (arcanea-mobile) are the beautiful visual layer for consumption, state, and light editing.** "Each person state of their world": gallery, living character chat (edit persona/memory via UI), visual canon browser, "enter world" Threshold. Not the ownership or heavy build surface. Interchangeable: from app "init world repo in my GH", "sync this world", "open in coding agent". Agents and app both produce/consume the same standard.
- **No data landlord risk:** For public/BYO-repo worlds we store only derived index + render cache + public page snapshots. Canon lives in user's GH. Paid "hosted_private" is explicit opt-in working copy under processor terms. ToS: "You own what you create." Less support burden: self-serve via agents + GH + visual UI; creators learn orchestration (ACOS skills + Arcanea agent skills) to scale their own income (books central in /books/, quests/games, webapps from blueprints, marketplace listings, onchain proofs).
- **Arcanea Statusline + world visual state:** Coding agents (incl this Grok session) surface live "🌍 WorldName | Nc Nb 🎬grok ⎇user/repo [palette swatches]" + counts for characters/books/media/video. When working a world repo, you see the person's state at a glance. Complements the app's gorgeous visual dashboard.
- **Monetization that builds riches safely:** Free to scaffold/export world. Paid for acceleration (hosted worlds, higher agent/Grok gen limits, pro pages, collab). Marketplace take when *creators* sell (templates, character packs, full worlds, published books, playable experiences). Arcanea Label (opt-in rev share) only when we actively help commercialize. We win when creators turn worlds into sustainable income streams using our agents/ecosystem. No storing user sht = no lawyers for user content.

This model empowers *anyone* to build worlds in the most advanced way (Grok visuals + multi-harness orchestration + structured standard) while keeping legal surface minimal and creator sovereignty maximal. The app experience (already working amazingly) is the gasp + visual polish + social layer on top of the GitHub/agent substrate.
