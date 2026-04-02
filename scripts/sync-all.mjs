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

console.log("Arcanea Ecosystem Sync")
console.log("======================")
console.log("")

for (const [group, repos] of Object.entries(data.repositories)) {
  for (const repo of repos) {
    const repoPath = path.resolve(ecosystemDir, repo.path)
    if (!repoExists(repoPath)) {
      console.log(`${fmt(group, 18)} ${fmt(repo.name, 28)} [missing]`)
      continue
    }

    const branch = (() => {
      try {
        return git(["branch", "--show-current"], repoPath) || "detached"
      } catch {
        return "detached"
      }
    })()

    const dirtyCount = (() => {
      try {
        const status = git(["status", "--porcelain"], repoPath)
        return status ? status.split(/\r?\n/).filter(Boolean).length : 0
      } catch {
        return 0
      }
    })()

    if (dirtyCount > 0) {
      console.log(`${fmt(group, 18)} ${fmt(repo.name, 28)} [skip dirty:${dirtyCount}]`)
      continue
    }

    try {
      execFileSync("git", ["fetch", "origin"], { cwd: repoPath, stdio: "ignore" })
    } catch {}

    if (branch !== repo.branch) {
      console.log(`${fmt(group, 18)} ${fmt(repo.name, 28)} [skip branch:${branch} expected:${repo.branch}]`)
      continue
    }

    let behind = 0
    try {
      behind = Number(git(["rev-list", "--count", `HEAD..origin/${branch}`], repoPath) || "0")
    } catch {}

    if (behind === 0) {
      console.log(`${fmt(group, 18)} ${fmt(repo.name, 28)} [up-to-date]`)
      continue
    }

    try {
      execFileSync("git", ["pull", "--ff-only", "origin", branch], { cwd: repoPath, stdio: "ignore" })
      console.log(`${fmt(group, 18)} ${fmt(repo.name, 28)} [fast-forwarded:${behind}]`)
    } catch {
      console.log(`${fmt(group, 18)} ${fmt(repo.name, 28)} [skip diverged]`)
    }
  }
}
