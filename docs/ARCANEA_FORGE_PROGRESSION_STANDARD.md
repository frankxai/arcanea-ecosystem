# Arcanea Forge Progression Standard

Status: doctrine draft
Date: 2026-06-22
Scope: Arcanea lore, creator progression, agent-swarm progression, skill mastery, game standards, and world-repo writeback.

## Naming Revision

This document should be treated as the **Epoch Forge** track inside a broader **Mastery Engine**, not as the umbrella name for all progression.

- **Mastery Engine**: system-level architecture for creator, skill, agent, swarm, game, and product progression.
- **Epoch Forge**: Arcanea craft/artifact/world-product track within that engine.
- **Academy**: learning, certifications, and skill acquisition.
- **Armory**: agent/tool loadouts and capability builds.
- **Trials**: evals, rank-up tests, boss checks, and proof gates.
- **Codex**: research, lore, references, and knowledge unlocks.
- **Swarm**: multi-agent roles, reputation, dispatch rights, and crew progression.

Research and reusable standards now live in `C:\Users\frank\starlight\repos\awesome-gamification-agent-skills`.

## 0. Intent

Arcanea needs a Forge layer: a game-native creation system where building lore, characters, quests, books, games, agents, skills, and media feels like advancing through a living master-craft discipline.

The source inspiration is the fantasy of the divine master craftsperson, the smith who can learn every age of craft and shape weapons, defenses, tools, gates, and living artifacts. Arcanea must not copy outside IP, names, characters, visual signatures, or plot mechanics. Preserve only the emotional appeal: mastery, impossible craft, hard-earned power, escalating challenges, and visible progression.

Working name inside Arcanea: **The Epoch Forge**.

Core promise:

> Speak a world into existence, then forge it into an owned living universe through quests, agents, skills, relics, proof, and mastery.

## 1. Product Layer Fit

The Forge extends the existing three-layer Arcanea architecture.

| Layer | Existing promise | Forge addition |
|---|---|---|
| L1 Experience | Speak a world into being | First Forge Trial: one artifact, one character pressure test, one shareable proof of creation |
| L2 Forge | Build it deep with agents and assets | Creator classes, mastery tracks, artifact recipes, agent crews, marketplace-ready products |
| L3 Fabric | World graph, memory, orchestration, proof | Progression ledger, agent XP, skill evaluations, SIS provenance, game-state writeback |

The Forge is not a side mode. It is the progression language for Arcanea creation.

## 2. Canon Premise

### The Epoch Forge

The Epoch Forge is a hidden metaphysical workshop threaded through all ages of Arcanea. It does not make things from nothing. It binds law, memory, material, intent, and cost into artifacts that can survive across worlds.

The ancient title is **Gottliche Meisterhandwerker** in old atelier records, rendered in Arcanea as **Divine Masterhand**: not a god by birth, but a craftsperson whose hands have learned enough epochs to shape reality responsibly.

### Prime Law

No artifact may exceed the truth paid into it.

Every weapon, shield, tool, spell, song, agent, quest, and world product must bind to:

- a world law
- a material or medium
- a memory or lived event
- a cost or constraint
- a witness or proof record

Anything that skips this becomes a hollow miracle: visually impressive, canonically weak, and unstable in games.

## 3. Seven Pillars Mapping

| Pillar | Forge rule |
|---|---|
| Cosmology and origins | The Forge exists between epochs and can only open where a world has enough coherent memory. |
| Magical and natural laws | Craft requires cost. Power without constraint creates entropy debt. |
| Geography and climate | Each world manifests local forge stations: anvil, loom, lens, archive, gate, kiln, garden, bastion. |
| Factions and power graphs | Guilds compete over methods, not just resources: protection, conquest, remembrance, repair, commerce, transcendence. |
| Technology and artifacts | Artifacts are typed by recipe, rank, proof, and world fit. Tech and magic use the same provenance discipline. |
| Lore and legends | Every great artifact has a pressure test: the moment it failed, cost someone something, or changed its maker. |
| Ecology and species | Materials are not inert. Living worlds produce living reagents that react to misuse and overharvest. |

## 4. Forge Disciplines

Forge disciplines are the progression tracks for creators, agents, and skills.

| Discipline | Creates | Game function | Agent equivalent |
|---|---|---|---|
| Canon Smithing | laws, histories, factions | unlocks coherent quest regions | Canon Director |
| Character Tempering | characters, vows, wounds, arcs | unlocks companions and rivals | Character Forge |
| Relic Craft | weapons, defenses, tools, instruments | unlocks player abilities and safeguards | Systems Designer |
| Bastion Craft | wards, rules, moderation, privacy, continuity | protects worlds from drift and misuse | Safety/QA Warden |
| Gate Craft | quests, portals, levels, onboarding | creates playable entry points | Quest Designer |
| Memory Binding | events, recollections, evolution | makes NPCs and worlds persist | Memory Keeper |
| Visual Alloying | palette, motifs, media, silhouettes | keeps all media recognizable | Visual Canon Smith |
| Market Finishing | packs, pages, licenses, proofs | makes creations sellable | Product/Economy Scribe |

## 5. Artifact Classes

Use "weapon" broadly: an agency instrument, not only a violence object. Arcanea should support heroic craft, defense, creation, repair, and transformation.

| Class | Meaning | Examples |
|---|---|---|
| Blade | focused action | cut a false memory, sever a curse, decide a conflict |
| Shield | protection | privacy ward, continuity shield, consent boundary, world firewall |
| Hammer | construction | build a city, scaffold a game, repair a broken faction |
| Loom | connection | bind characters, weave timelines, remix public canon |
| Lens | perception | reveal hidden laws, inspect drift, audit provenance |
| Key | access | open a region, agent lane, quest arc, marketplace tier |
| Vessel | memory | character journal, living soundtrack, relic companion |
| Crown | governance | rank, stewardship, publishing authority, community rule |
| Citadel | world product | book, game, web experience, academy module, commercial bundle |

Every artifact gets:

- `name`
- `class`
- `discipline`
- `rank`
- `worldLawBound`
- `materials`
- `cost`
- `failureMode`
- `proof`
- `publicUse`
- `privateCanonBoundary`

## 6. Progression Doctrine

### No Vanity XP

Progression is earned only by durable creation or verified judgment.

Award XP for:

- committed world-repo artifacts
- passed coherence gates
- playtest reports
- character evolution events
- public proof claims
- published packs
- accepted community contributions
- marketplace outcomes
- improved eval scores for agents or skills

Do not award XP for raw token volume, number of files generated, or unreviewed drafts.

### XP Types

| XP | Earned by | Unlocks |
|---|---|---|
| Spark | first-pass creation | new prompts, starter recipes, quick trials |
| Lore | canon-compatible depth | locations, factions, character arcs |
| Craft | working artifacts | game mechanics, media packs, product modules |
| Coherence | passing gates and audits | higher automation limits, agent autonomy |
| Memory | lived events and evolution | persistent NPCs, companion arcs, season continuity |
| Proof | hashes, claims, releases | marketplace trust, ownership badges |
| Stewardship | community review and repair | governance, merges, featured worlds |

### Creator Ranks

| Rank | Requirement | Capability |
|---|---|---|
| Sparkbearer | creates a coherent genesis world | can run First Forge Trial |
| Apprentice Smith | ships 3 canon-compatible artifacts | can use basic agent recipes |
| Journeyman Artificer | completes one playable quest or book chapter | can open community playtest |
| Master Smith | passes canon, visual, and game gates across a world pack | can publish marketplace bundles |
| Epoch Smith | connects world memory to game/book/agent products | can run multi-agent seasons |
| Divine Masterhand | proves sustained stewardship across worlds and agents | can mentor, certify, and govern Forge standards |

Ranks should be hard to fake because they depend on artifacts, evals, and proof.

## 7. Agent Progression

Agents in Arcanea should level like craft apprentices, not anonymous workers. Their authority increases only when their outputs pass review.

### Agent Roles

| Role | Primary output | Key evaluation |
|---|---|---|
| Canon Smith | laws, lore, continuity ledger | contradiction rate, specificity, anti-trope quality |
| Character Smith | character files, arcs, dialogue rules | contradiction, desire, pressure-test strength |
| Quest Smith | quests, beats, playable loops | agency, pacing, world-law fit |
| Visual Smith | media prompts, visualDna, asset briefs | recognizability, non-genericity, prompt discipline |
| Game Smith | mechanics, systems, first playable plan | rules clarity, 3-minute fun, memory writeback |
| Memory Keeper | memories, evolution summaries | salience, privacy boundary, canon promotion quality |
| Bastion Warden | safety, IP, privacy, continuity checks | caught risks, false positives, repair quality |
| Market Scribe | listings, bundles, license notes | clarity, buyer fit, proof completeness |

### Agent Stats

| Stat | Meaning |
|---|---|
| Coherence | honors world laws and existing canon |
| Craft | produces usable artifacts, not vibes |
| Taste | avoids generic fantasy and derivative shortcuts |
| Judgment | flags risks and asks for the right escalation |
| Throughput | finishes scoped work without sprawl |
| Stewardship | preserves private memory and user work |

### Agent Ranks

| Rank | Gate |
|---|---|
| Dormant | available but untested |
| Calibrated | produced one accepted artifact |
| Trusted | 5 accepted artifacts with no major repair |
| Specialist | 10 accepted artifacts in one discipline |
| Masterwork | can lead a bounded swarm lane |
| Steward | can review other agents and protect canon |

Failed outputs do not erase progress, but they create repair quests. An agent that repairs its own drift earns more trust than one that never attempts hard work.

## 8. Skill Progression

Skills become teachable disciplines with maturity states.

| Skill state | Requirement | Allowed use |
|---|---|---|
| Seed | draft instruction exists | manual human-guided use |
| Calibrated | has examples and failure cases | routine use in one repo |
| Verified | passes evals or review checklist | multi-agent use |
| Marketable | packaged with docs and output samples | creator marketplace |
| Canonical | adopted by Arcanea standards | default route in AO/SO |

Each skill should carry:

- trigger phrases
- required input context
- artifact output shape
- quality gates
- common failure modes
- eval prompts
- publication boundary

## 9. Game Standards

Arcanea games should be born from world law, memory, and craft. They must not feel like generic RPG scaffolds with Arcanea names pasted on.

### Required Standards

1. **Three-minute agency:** the player makes a meaningful choice within 3 minutes.
2. **Mechanic from law:** every core mechanic maps to a world law, faction pressure, artifact recipe, or character wound.
3. **Costed power:** every strong action has a cost, cooldown, material, risk, or memory consequence.
4. **Defense is playable:** shields, repairs, wards, treaties, and rescue systems are as meaningful as attacks.
5. **Failure writes story:** failure should create scars, debts, changed relationships, or new quests.
6. **Memory writeback:** important choices append events to the world repo or derived memory layer.
7. **VisualDna obedience:** assets must honor palette, motifs, silhouettes, materials, and negative constraints.
8. **Proof-friendly outputs:** playable builds record source world, seed prompt, asset sources, and version.
9. **First playable before sprawl:** ship a small, coherent Forge Trial before a giant game plan.

### First Forge Trial

The canonical first game format:

- one player avatar or creator self-insert
- one masterwork objective
- one companion or rival
- one artifact recipe
- one defense mechanic
- one failure state that changes canon
- one world-repo writeback
- one shareable proof or completion card

Example seed:

> Enter the Epoch Forge, recover a fractured shield from a ruined age, choose whether to repair it with memory, law, or sacrifice, and record the consequence into the world ledger.

## 10. Swarm Operating Model

Route this through the existing Starlight split:

- **SO** owns cross-repo doctrine, governance, queues, and evaluation.
- **AO** owns Arcanea execution, worktrees, dashboards, and worker lifecycle.
- **Arcanea swarms** own lore, worlds, quests, media, and game products.
- **SIS** owns memory, provenance, taxonomy, decisions, and validation.

### Forge Swarm Loop

1. **Seed:** creator writes the impossible invitation.
2. **Canon lock:** Canon Smith extracts laws, costs, factions, motifs.
3. **Forge board:** system converts work into quests, recipes, gates, and rewards.
4. **Agent dispatch:** bounded jobs go to role-specific agents.
5. **Coherence gate:** Bastion Warden checks canon, IP, privacy, and quality.
6. **Writeback:** accepted output lands in canonical world-repo folders.
7. **Reward:** XP, rank, relics, proof, and marketplace readiness update.
8. **Memory:** SIS records durable decisions and evolution events.

### Bounded Agent Task Shape

Use this shape for queue prompts or AO task specs:

```json
{
  "id": "epoch-forge-first-trial",
  "priority": 5,
  "agent": "codex",
  "repo": "C:\\Users\\frank\\starlight\\repos\\arcanea-ecosystem",
  "maxMinutes": 45,
  "risk": "normal",
  "discipline": "Game Smith",
  "world": "<world-slug>",
  "artifact": "First Forge Trial",
  "acceptance": [
    "Mechanics derive from world laws",
    "Includes one defense mechanic",
    "Includes one memory writeback",
    "Includes IP and privacy boundary"
  ],
  "prompt": "Create a playable Forge Trial spec for the target world and report writeback paths."
}
```

All workers report:

- produced artifact
- target writeback path
- commands/tools used
- canon risks
- privacy/IP risks
- next recommended task

## 11. World Repo Additions

These are proposed optional additions to `world.arcanea.json` and adjacent folders. Do not break the base standard.

```json
{
  "forge": {
    "epoch": "dawn",
    "stations": ["anvil", "bastion", "lens", "gate"],
    "materials": ["memory", "law", "song", "star-metal"],
    "artifactClasses": ["blade", "shield", "hammer", "loom", "lens", "key", "vessel", "crown", "citadel"]
  },
  "progression": {
    "worldTier": 1,
    "creatorRank": "Sparkbearer",
    "xp": {
      "spark": 0,
      "lore": 0,
      "craft": 0,
      "coherence": 0,
      "memory": 0,
      "proof": 0,
      "stewardship": 0
    },
    "masteryTracks": []
  },
  "game": {
    "firstPlayable": {
      "format": "Forge Trial",
      "threeMinuteAgency": true,
      "memoryWriteback": true
    }
  }
}
```

Suggested folders:

```txt
forge/
  artifacts/
  recipes/
  trials/
  rewards/
  progression-ledger.json
agents/
  <agent-id>.md
skills/
  <skill-id>.md
game/
  first-forge-trial.md
```

## 12. Coherence Gates

Before rewarding progression, check:

- Is this original Arcanea IP, not a borrowed franchise mechanic or image?
- Does the artifact bind to a stated world law?
- Is the cost concrete?
- Does it create story pressure?
- Does it improve the world repo, product, or player experience?
- Can another agent continue from the artifact without guessing?
- Is private memory protected?
- Is the reward proportional to durable value?

## 13. First Implementation Backlog

1. Add this standard to `arcanea-ecosystem/docs`.
2. Add a short link from strategy docs once reviewed.
3. Extend `schemas/world.arcanea.schema.json` with optional `forge` and `progression` fields.
4. Add a sample world `forge/` folder with one First Forge Trial.
5. Add `scripts/forge-state.mjs` to summarize rank, XP, artifacts, and agent mastery.
6. Add AO queue templates for Canon Smith, Quest Smith, Game Smith, Visual Smith, and Bastion Warden.
7. Add eval prompts for "no vanity XP", "mechanic from law", and "defense is playable".
8. Generate one marketplace-ready creator pack: **Epoch Forge Starter Kit**.
9. Build the first playable Forge Trial from an existing Arcanea world.
10. Feed results into SIS as a durable doctrine decision.

## 14. Publication Boundary

Public starter packs may include:

- Forge discipline names
- artifact class taxonomy
- First Forge Trial template
- rank names up to Master Smith
- safe example worlds

Keep private until intentionally released:

- full Divine Masterhand lore
- internal XP weighting
- agent eval rubrics
- marketplace scoring
- unpublished Luminor or Guardian canon
- private world memories

## 15. Anti-Trope Moves

Nearest obvious trope: overpowered fantasy blacksmith who can make anything.

Arcanea version:

- Craft is not unlimited; it is constrained by law, memory, material, cost, and proof.
- Defense, repair, continuity, and stewardship are as prestigious as weapons.
- Artifacts are not loot drops; they are world-repo changes with consequences.
- Agents also progress, so the creator is building both a world and the swarm that builds the world.
- Mastery is proven by coherence over time, not by spectacle.
