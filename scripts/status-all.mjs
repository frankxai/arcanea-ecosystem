#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const ecosystemDir = path.resolve(scriptDir, "..")
const reposFile = path.join(ecosystemDir, "repos.json")
const data = JSON.parse(fs.readFileSync(reposFile, "utf8"))

function git(args, cwd) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim()
}

function repoExists(repoPath) {
  try {
    git(["rev-parse", "--is-inside-work-tree"], repoPath)
    return true
  } catch {
    return false
  }
}

function fmt(value, width) {
  return String(value).padEnd(width, " ")
}

console.log("Arcanea Ecosystem Status")
console.log("========================")
console.log("")

for (const [group, repos] of Object.entries(data.repositories)) {
  for (const repo of repos) {
    const repoPath = path.resolve(ecosystemDir, repo.path)
    if (!repoExists(repoPath)) {
      console.log(`${fmt(group, 18)} ${fmt(repo.name, 28)} [missing] ${repo.path}`)
      continue
    }

    let branch = "detached"
    try {
      branch = git(["branch", "--show-current"], repoPath) || "detached"
    } catch {}

    let dirtyCount = 0
    try {
      const status = git(["status", "--porcelain"], repoPath)
      dirtyCount = status ? status.split(/\r?\n/).filter(Boolean).length : 0
    } catch {}

    let ahead = 0
    let behind = 0
    try {
      ahead = Number(git(["rev-list", "--count", `origin/${branch}..HEAD`], repoPath) || "0")
      behind = Number(git(["rev-list", "--count", `HEAD..origin/${branch}`], repoPath) || "0")
    } catch {}

    let summary = "[clean]"
    if (dirtyCount > 0) summary = `[dirty:${dirtyCount}]`
    else if (ahead > 0 || behind > 0) summary = `[ahead:${ahead} behind:${behind}]`

    console.log(`${fmt(group, 18)} ${fmt(repo.name, 28)} ${fmt(repo.mode, 18)} ${fmt(branch, 18)} ${summary}`)
  }
}
