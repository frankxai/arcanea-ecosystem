#!/usr/bin/env node
// world-state — self-contained, zero-dep visual state for any Arcanea world repo.
// For ACOS statuslines, agent bars, dashboards, CI.
// Usage: node world-state.mjs [world-dir] [--json]
// Output: 🌍 Name | 3c 1b 0q 12m 🎬grok,claude ⎇user/repo [pal:#0a1,#1f6] sha...
//
// Starlight Intelligence / mapper aware (v1.1+): surfaces hasMemory/hasMeaning/hasGame/mapperVersion in --json.
// Re-validation: after mapper/standard/schema changes, run on example + this script. Excellence gates via harness (repo-mastery + verification/santa).

import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);
const MANIFEST = "world.arcanea.json";

async function getRemote(dir) {
  try {
    const { stdout } = await exec("git", ["-C", dir, "config", "--get", "remote.origin.url"]);
    const m = stdout.trim().match(/[:/]([^/]+\/[^/.]+)(?:\.git)?$/);
    return m ? m[1] : null;
  } catch { return null; }
}

function parseFrontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line.trim());
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { data };
}

async function walk(dir, rel = "") {
  const out = [];
  const full = path.join(dir, rel);
  let ents;
  try { ents = await fs.readdir(full, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    if (e.isDirectory()) {
      if (["node_modules", ".git", ".arcanea", "dist", ".next"].includes(e.name)) continue;
      out.push(...(await walk(dir, path.join(rel, e.name))));
    } else {
      out.push(path.join(rel, e.name).split(path.sep).join("/"));
    }
  }
  return out;
}

async function readManifest(dir) {
  const raw = await fs.readFile(path.join(dir, MANIFEST), "utf8");
  return JSON.parse(raw);
}

async function collectPublicFiles(dir) {
  const paths = await walk(dir);
  const files = [];
  for (const p of paths) {
    if (p === MANIFEST) continue;
    const abs = path.join(dir, p);
    const bytes = await fs.readFile(abs);
    let vis = "public";
    if (/\.(md|mdx)$/i.test(p)) {
      const { data } = parseFrontmatter(bytes.toString("utf8"));
      if (data.visibility) vis = data.visibility;
    }
    files.push({ path: p, bytes, visibility: vis });
  }
  return files;
}

function countSection(files, sec) {
  return files.filter(f => f.path.startsWith(sec + "/") && f.visibility === "public").length;
}

function detectAgents(manifest) {
  const hs = new Set((manifest.agents || []).map(a => a.harness));
  const order = ["grok", "claude", "codex", "gemini", "antigravity", "any"];
  return order.filter(h => hs.has(h)).join(",") || "any";
}

function palette(manifest) {
  const p = manifest.visualDna?.palette || [];
  return p.length ? " [" + p.slice(0,2).join(",") + "]" : "";
}

async function main() {
  const dir = process.argv[2] && !process.argv[2].startsWith("-") ? process.argv[2] : ".";
  const json = process.argv.includes("--json");
  try {
    const manifest = await readManifest(dir);
    const files = await collectPublicFiles(dir);
    const [nc, nb, nq, nm] = ["characters","books","quests","media"].map(s => countSection(files, s));
    const agents = detectAgents(manifest);
    const pal = palette(manifest);
    const remote = await getRemote(dir);
    const hash = "sha256:" + (await (async () => { // lightweight stable hash for status (not full contentHash)
      const h = (await import("node:crypto")).createHash("sha256");
      for (const f of files) if (f.visibility === "public") h.update(f.path);
      h.update(JSON.stringify(manifest, Object.keys(manifest).sort()));
      return h.digest("hex").slice(0, 10);
    })());
    const line = `🌍 ${manifest.name} | ${nc}c ${nb}b ${nq}q ${nm}m 🎬${agents} ${remote ? "⎇"+remote : ""}${pal} ${hash}`;
    if (json) {
      console.log(JSON.stringify({
        name: manifest.name, id: manifest.id, slug: manifest.slug,
        counts: { characters: nc, books: nb, quests: nq, media: nm },
        agents: (manifest.agents || []).map(a => ({id:a.id, harness:a.harness})),
        palette: manifest.visualDna?.palette || [],
        remote, hash, premise: (manifest.premise || "").slice(0,120),
        schemaVersion: manifest.schemaVersion,
        hasMemory: !!manifest.memory, hasMeaning: !!manifest.meaning, hasGame: !!manifest.game,
        mapperVersion: manifest.mapper?.version || null
      }, null, 2));
    } else {
      console.log(line);
    }
  } catch (e) {
    console.error("not a valid world or unreadable:", e.message || e);
    process.exit(2);
  }
}

main();