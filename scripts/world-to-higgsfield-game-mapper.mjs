#!/usr/bin/env node
/**
 * world-to-higgsfield-game-mapper.mjs
 * Top functionality for arcanea-ecosystem: the "Mapper" seed.
 * 
 * Parses a world.arcanea.json (per v1.1+ standard with game/memory/meaning/community/mapper).
 * Produces:
 * - Rich seedPrompt for Claude Fable 5 + Higgsfield MCP "Games" flow (full story, mechanics from pillars/laws/meaning, visualDna for consistency).
 * - Higgsfield asset plan (character refs, environments, cinematic scenes) using Grok native or MCP.
 * - Memory injection spec (evolution_state + emotional anchors → persistent NPC/game state).
 * - Suggested procedural map + community hooks.
 * - Writes suggested updates back to the manifest (game.seedPrompt, mapper, etc.) or outputs for agent use.
 *
 * Usage (in a world repo dir or with --world path):
 *   node scripts/world-to-higgsfield-game-mapper.mjs --world ./world.arcanea.json --output ./game-seed.md
 *
 * God-mode stack integration:
 * - Grok build (this harness): Run for creative coherence + native image/video seeds for assets.
 * - Claude Code + Higgsfield MCP (https://mcp.higgsfield.ai/mcp): Paste the seedPrompt; Fable researches/writes the full playable game + deploys; MCP generates visuals.
 * - Arcanea MCPs (arcanea-mcp + memory-mcp): Load live world graph, memory vaults, creation relationships for richer seeding.
 * - Arcanea skills (world-build, character-forge, story-weave, arcanea-canon): Condition on 7 Pillars (esp. History=Memory, Belief&Meaning), canon, evolution.
 * - Output: game/ folder in the repo (per standard) + playableUrl. Community PRs evolve it.
 *
 * Memory + Meaning layer: Explicitly pulls evolution, emotionalAnchors, pillars, tensions so the generated game *feels* like the living world (persistent states, meaningful choices that write back).
 * Community: Includes forks/events as "shared instance" hooks.
 *
 * This makes Arcanea the mapper that turns any world into ultimate (playable, ownable, evolvable) digital products around community.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
let worldPath = './world.arcanea.json';
let outPath = null;
let doWrite = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--world' && args[i+1]) worldPath = args[++i];
  if (args[i] === '--output' && args[i+1]) outPath = args[++i];
  if (args[i] === '--write') doWrite = true;
}

// Excellence gate (Starlight): After any edit to this script / STANDARD / schema / example:
//   node scripts/world-to-higgsfield-game-mapper.mjs --world schemas/world.arcanea.example.json --write
//   node scripts/world-state.mjs . --json   (or from a real world dir)
// Full gates via harness: repo-mastery + verification-loop + santa-method + gstack (for any visuals).

function loadWorld(p) {
  const resolved = path.resolve(p);
  if (!fs.existsSync(resolved)) {
    console.error(`World manifest not found: ${resolved}`);
    process.exit(1);
  }
  const m = JSON.parse(fs.readFileSync(resolved, 'utf8'));
  // Minimal base validation (v1.0 contract)
  const base = ['schemaVersion', 'id', 'name', 'creator', 'content'];
  for (const k of base) {
    if (!m[k]) {
      console.error(`Invalid manifest: missing required base field "${k}" (see schema)`);
      process.exit(2);
    }
  }
  return m;
}

const world = loadWorld(worldPath);
const dir = path.dirname(path.resolve(worldPath));

const name = world.name || world.slug || 'Unnamed World';
const premise = world.premise || world.genesisPrompt || '';
const laws = (world.laws || []).join(' | ');
const visual = world.visualDna || {};
const palette = (visual.palette || []).join(', ');
const style = visual.style || '';
const motifs = (visual.motifs || []).join(', ');

const memory = world.memory || {};
const meaning = world.meaning || {};
const game = world.game || {};
const community = world.community || {};

const pillars = (meaning.pillars || ['Geography', 'History & Time (memory)', 'Cultures', 'Magic/Tech', 'Economy', 'Power & Politics', 'Belief & Meaning']).join(' • ');
const anchors = (meaning.emotionalAnchors || []).join(' • ');
const tensions = (meaning.tensions || []).join(' • ');
const beliefs = (meaning.coreBeliefs || (world.laws || [])).join(' • ');

const evolutionSummary = (memory.evolution || []).slice(-3).map(e => `${e.character_id || 'world'}: ${e.delta || e.meaning_impact || ''}`).join(' || ');

const seed = `
ULTIMATE LIVING WORLD SEED FOR HIGGSFIELD GAMES + CLAUDE FABLE 5 (Arcanea v1.1 Mapper)

World: ${name}
Premise: ${premise}
Immutable Laws: ${laws}

Visual DNA (use for ALL asset consistency via refs/character training):
Palette: ${palette}
Style: ${style}
Motifs: ${motifs}

SEVEN PILLARS (world-build skill framework — map every mechanic, quest, NPC behavior, and visual to these for depth):
${pillars}

MEANING LAYER (Pillar 7 + emotional architecture — the "why". Preserve in story, dialogue, choices, NPC souls):
Core Beliefs: ${beliefs}
Emotional Anchors (preserve as memory-extracts / Depth Scrolls for NPCs and player impact): ${anchors}
Tensions (primary generators of story, quests, branching, and meaningful play): ${tensions}

MEMORY LAYER (persistent, evolvable, cross-product):
Vaults: ${(memory.vaults || ['lore','character-states','events']).join(', ')}
Recent Evolution (inject into game saves/NPC long-term memory; player actions should append new entries): ${evolutionSummary || 'Genesis state — seed initial character memories from backstory.'}
Instruction: Character evolution_state and emotional anchors MUST drive NPC behavior, quest availability, and "memory cost" mechanics across sessions. Games must support writing player choices back as evolution events.

GAME MAPPING (output to game/ per world.arcanea standard):
Genre target: ${game.genre || 'rpg or hybrid'}
Core Mechanics (derive directly from laws + meaning tensions + power dynamics + quests): ${ (game.mechanics || ['memory-as-currency with permanent loss on spend', 'depth/gate progression that unlocks older memories and greater risks/costs', 'choices that evolve characters and write to shared canon']).join(' • ') }
Memory Injection: ${game.memoryInjection !== false ? 'ENABLED — persistent NPC states + emotional anchors across player sessions and world instances (forks).' : 'OFF'}
Procedural Map Hints: Use geography/history from pillars + visual motifs for level/world generation (drowned libraries, tide rhythms, memory-coins as collectibles that have emotional weight).

HIGGSFIELD ASSET PLAN (generate via Higgsfield MCP tools or Grok native Imagine/image-to-video for initial canon seeds; then scale in game flow):
- Character refs (train once for consistency): ${ (game.higgsfieldAssets?.characterRefs || ['primary-diver-with-lantern', 'memory-merchant-with-coin-sack', 'tide-ghost']).join(', ') }
- Environment / location prompts (cinematic stills + image-to-video for atmosphere): ${ (game.higgsfieldAssets?.environmentPrompts || ['bioluminescent sunken library with floating memory-coins and refracted light rays', 'coral marketplace at shifting tides, brass and coral textures']).join(' ; ') }
- Cinematic scenes (short video clips for key beats, trailers, memory flashbacks): ${ (game.higgsfieldAssets?.cinematicScenes || ['desperate first memory spent under pressure', 'ancient recovered memory ritual with emotional weight', 'tide rising and revealing lost history']).join(' ; ') }
Use reference images from initial Grok/Gemini seeds for character + style lock. Prioritize cinematic quality, motion that respects physics and emotional tone, native audio where available.

COMMUNITY & PERSISTENCE:
Forks/instances: ${ (community.forks || ['primary repo as canon']).join(', ') }
Events that evolve the world: ${ (community.events || ['visitor/player choices that respect the Laws and append to evolution']).join(' ; ') }
Contribution rule: All game-derived or community content must map back through the meaning/memory layers and be proposed as PRs that update evolution + meaning.tensions.

FULL STORY SEED (Fable 5: research the entire provided world canon, books, characters, and this mapper output. Write a complete, coherent, replayable game with beginning/middle/end + meaningful branches. Deploy as playable link.):
[Insert full premise + key characters with current evolution states + 2-3 quests that embody the tensions + ending that can loop back with permanent memory consequences. Make it feel like the living world, not a generic game.]

MAPPER METADATA (write back):
harnessesUsed: ["grok (coherence + native visuals)", "claude-fable-5 + higgsfield-mcp (game code + scale assets)", "arcanea-mcp + memory-mcp (state/graph)", "arcanea-world-build-skill + seven-pillars (meaning)"]
outputs: ["game", "memory-updated-manifest", "community-evolvable-instance"]
lastRun: ${new Date().toISOString()}

After generation: Update this manifest's game.playableUrl, game.lastGenerated, memory.evolution (new entries from play), mapper, and commit to the repo. Community can fork the game instance or PR evolutions.
`;

const report = `# ${name} — Higgsfield Game Seed + Mapper Output (Arcanea Mapper v1.1 — Starlight Intelligence)

Generated: ${new Date().toISOString()}
World file: ${worldPath}

## Seed Prompt (paste into Claude + Higgsfield MCP Games / Fable 5)
${seed}

## Quick Asset List for Direct Higgsfield Calls
Characters: ${(game.higgsfieldAssets?.characterRefs || []).join('\n- ')}
Environments: ${(game.higgsfieldAssets?.environmentPrompts || []).join('\n- ')}
Scenes (image-to-video): ${(game.higgsfieldAssets?.cinematicScenes || []).join('\n- ')}

## Memory Injection Spec
- Pull current evolution and anchors into initial NPC long-term memory and "memory economy" systems.
- Any player choice that would matter in the world lore must be able to append an evolution event.
- Support save states / cloud sync that carries character evolution back to the world repo (or shared community instance).

## Suggested Next Steps (agent or human)
1. (Grok or local) Generate initial consistent visual seeds using the visualDna + character refs (this harness has native image/video tools).
2. Paste the full seed above into Claude (with Higgsfield MCP connected at https://mcp.higgsfield.ai/mcp). Authorize and say "build and deploy the game".
3. On success, update the world manifest (game.playableUrl, mapper, any new evolution from test play).
4. Commit to GH. Share the playable link + world repo. Invite community forks/PRs that evolve meaning/memory.
5. Re-run mapper after significant community or play events for v2.

## Files to create/update in the world repo
- game/seed.md (this content or the prompt)
- game/assets/ (downloaded or referenced from Higgsfield)
- Update world.arcanea.json with the mapper/game/memory/meaning fields from this run.

This mapper makes Arcanea the memory + meaning + community substrate that turns Higgsfield's powerful game creation into *ultimate, persistent, ownable living worlds and products*.
`;

// --write support (excellence self-update for the manifest)
if (doWrite) {
  try {
    const patch = {
      game: {
        seedPrompt: seed.slice(0, 800) + "... (full in game/seed.md)",
        genre: game.genre || "rpg",
        mechanics: game.mechanics || ["memory-as-currency with permanent loss", "gate/depth progression for abilities", "emotional anchors affect NPC reactions and quest branches"],
        memoryInjection: true,
        lastGenerated: new Date().toISOString()
      },
      mapper: {
        version: "1.1.0",
        lastRun: new Date().toISOString(),
        harnessesUsed: ["grok", "claude-fable-5", "higgsfield-mcp", "arcanea-mcp", "world-build-skill"],
        outputs: ["game"]
      }
    };
    const updated = { ...world, ...patch };
    const writePath = path.resolve(worldPath);
    fs.writeFileSync(writePath, JSON.stringify(updated, null, 2) + "\n");
    console.log(`--write: Updated ${worldPath} with game/mapper patches (re-run world-state to observe).`);
  } catch (e) {
    console.error(" --write failed:", e.message);
  }
}

if (outPath) {
  fs.writeFileSync(path.resolve(outPath), report);
  console.log(`Mapper output written to ${outPath}`);
} else {
  console.log(report);
}

// Optional: suggest manifest patch (print only; real run would merge carefully)
console.log('\n--- Suggested manifest patch (merge into your world.arcanea.json game/memory/meaning/mapper sections) ---');
console.log(JSON.stringify({
  game: { seedPrompt: 'See full seed in game-seed.md', ...world.game },
  mapper: { version: '1.1.0', lastRun: new Date().toISOString(), harnessesUsed: ['grok','claude-fable-5','higgsfield-mcp','arcanea-mcp','world-build-skill'], outputs: ['game'] }
}, null, 2));
