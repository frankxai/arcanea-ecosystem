#!/bin/bash
# Arcanea Ecosystem - Sync All Repositories
# Usage: ./scripts/sync-all.sh

set -e

echo "🔄 Syncing Arcanea Ecosystem..."
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ECOSYSTEM_DIR="$(dirname "$SCRIPT_DIR")"

sync_repo() {
    local name=$1
    local path=$2
    local branch=$3
    
    if [ ! -d "$ECOSYSTEM_DIR/$path/.git" ]; then
        echo "⚠️  $name not cloned, skipping..."
        return
    fi
    
    echo "📥 Syncing $name (branch: $branch)..."
    cd "$ECOSYSTEM_DIR/$path"
    
    # Stash any local changes
    if [ -n "$(git status --porcelain)" ]; then
        echo "   📝 Stashing local changes..."
        git stash push -m "auto-stash-$(date +%Y%m%d-%H%M%S)"
    fi
    
    # Pull latest
    git fetch origin
    git pull origin "$branch"
    
    echo "✅ $name synced"
    cd "$ECOSYSTEM_DIR"
}

# Sync all repos
if [ -f "$ECOSYSTEM_DIR/repos.json" ] && command -v jq &> /dev/null; then
    echo "🏛️ Syncing Core Projects..."
    jq -r '.repositories.core[] | "\(.name)|\(.path)|\(.branch)"' "$ECOSYSTEM_DIR/repos.json" | while IFS='|' read -r name path branch; do
        sync_repo "$name" "$path" "$branch"
    done
    
    echo ""
    echo "🔮 Syncing AI Integrations..."
    jq -r '.repositories.ai_integrations[] | "\(.name)|\(.path)|\(.branch)"' "$ECOSYSTEM_DIR/repos.json" | while IFS='|' read -r name path branch; do
        sync_repo "$name" "$path" "$branch"
    done
    
    echo ""
    echo "🧪 Syncing Supporting Projects..."
    jq -r '.repositories.supporting[] | "\(.name)|\(.path)|\(.branch)"' "$ECOSYSTEM_DIR/repos.json" | while IFS='|' read -r name path branch; do
        sync_repo "$name" "$path" "$branch"
    done
else
    echo "⚠️  repos.json not found or jq not installed"
    echo "   Falling back to manual sync..."
    
    # Manual list as fallback
    REPOS=("arcanea:local-work-sync" "arcanea-infogenius:main" "arcanea-intelligence-os:master" "arcanea-mobile:master" "claude-arcanea:master" "claude-code-oracle-skills:main" "codex-arcanea:master" "gemini-arcanea:master" "infogenius:main" "labs:main")
    
    for repo_info in "${REPOS[@]}"; do
        IFS=':' read -r repo branch <<< "$repo_info"
        sync_repo "$repo" "$repo" "$branch"
    done
fi

echo ""
echo "✨ All repositories synced!"
echo "Run ./scripts/status-all.sh to check status."
