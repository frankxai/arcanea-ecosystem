# Arcanea Ecosystem 🌟

> *"The complete Arcanean universe, interconnected."*

This is the **master coordination repository** for all Arcanea projects. It uses **Git Submodules** to link all related repositories while keeping them independent.

---

## 🚀 Quick Start

### Clone Everything
```bash
git clone --recursive https://github.com/frankxai/arcanea-ecosystem.git
cd arcanea-ecosystem
```

### Update All Projects
```bash
./scripts/sync-all.sh
```

### Check Status Everywhere
```bash
./scripts/status-all.sh
```

---

## 📦 What's Included

### Core Ecosystem
- `arcanea/` - Main Arcanea hub
- `arcanea-infogenius/` - Information intelligence
- `arcanea-intelligence-os/` - AI Operating System
- `arcanea-mobile/` - Mobile applications

### AI Platform Integrations
- `claude-arcanea/` - Claude AI integration
- `claude-code-oracle-skills/` - Oracle skills for Claude Code
- `codex-arcanea/` - OpenAI Codex integration
- `gemini-arcanea/` - Google Gemini integration

### Supporting Systems
- `infogenius/` - Information management
- `labs/` - Experimental work (Arcanea-Labs org)

---

## 📊 Repository Map

```
arcanea-ecosystem/
├── arcanea/                    ← Main hub
├── arcanea-infogenius/
├── arcanea-intelligence-os/
├── arcanea-mobile/
├── claude-arcanea/
├── claude-code-oracle-skills/
├── codex-arcanea/
├── gemini-arcanea/
├── infogenius/
├── labs/                       ← Arcanea-Labs org
├── scripts/                    ← Helper scripts
├── .github/workflows/          ← Automation
└── README.md                   ← This file
```

---

## 🔧 Working with Submodules

### Add a new submodule
```bash
git submodule add https://github.com/user/repo.git repo-name
```

### Update all submodules
```bash
git submodule update --remote --merge
```

### Commit submodule updates
```bash
git add .
git commit -m "Update submodules"
git push
```

---

## 🔄 Sync Strategy

### Daily Workflow
1. Run `./scripts/sync-all.sh` to pull latest from all repos
2. Make changes in individual repos
3. Push changes from individual repos
4. Update this meta-repo: `git submodule update --remote`
5. Push meta-repo to record the new state

### Automation
GitHub Actions automatically:
- Checks submodule status daily
- Alerts if repos are out of sync
- Creates PRs for submodule updates

---

## 🏗️ Architecture Decisions

**Why submodules?**
- Each repo remains independently versioned
- Can pin specific versions for stability
- Supports cross-repo dependencies
- Industry standard (Linux kernel uses this)

**Why not a mono-repo?**
- Different projects have different lifecycles
- Some repos are forks/templates (research)
- AI integrations need separate versioning
- Easier collaboration with different teams

---

## 📚 Documentation

- [Full Architecture Doc](ARCANEA_REPOSITORY_ARCHITECTURE.md)
- [Repository Inventory](repos.json)
- [Sync Scripts](scripts/)

---

## 🤝 Contributing

1. Work in individual repos (not this meta-repo)
2. Push changes to individual repos
3. Update submodules in this repo
4. Create PR with submodule updates

---

*Last synced: 2026-01-31*  
*Status: ✅ All repositories connected*
