#!/bin/bash
# Arcanea Ecosystem - Check Status of All Repositories
# Usage: ./scripts/status-all.sh

set -e

echo "📊 Arcanea Ecosystem Status Report"
echo "==================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ECOSYSTEM_DIR="$(dirname "$SCRIPT_DIR")"

check_repo() {
    local name=$1
    local path=$2
    
    if [ ! -d "$ECOSYSTEM_DIR/$path/.git" ]; then
        echo "❌ $name: NOT CLONED"
        return
    fi
    
    cd "$ECOSYSTEM_DIR/$path"
    
    local branch=$(git branch --show-current)
    local ahead=$(git rev-list --count origin/$branch..HEAD 2>/dev/null || echo "0")
    local behind=$(git rev-list --count HEAD..origin/$branch 2>/dev/null || echo "0")
    local uncommitted=$(git status --porcelain | wc -l | tr -d ' ')
    
    local status="✅"
    local details=""
    
    if [ "$ahead" -gt 0 ]; then
        status="⬆️ "
        details="${details} +$ahead unpushed"
    fi
    
    if [ "$behind" -gt 0 ]; then
        status="⬇️ "
        details="${details} -$behind behind"
    fi
    
    if [ "$uncommitted" -gt 0 ]; then
        status="📝"
        details="${details} $uncommitted uncommitted"
    fi
    
    printf "%-30s [%s] branch: %-20s%s\n" "$name" "$status" "$branch" "$details"
    
    cd "$ECOSYSTEM_DIR"
}

# Check all repos
if [ -f "$ECOSYSTEM_DIR/repos.json" ] && command -v jq &> /dev/null; then
    echo "🏛️ Core Projects:"
    jq -r '.repositories.core[] | "\(.name)|\(.path)"' "$ECOSYSTEM_DIR/repos.json" | while IFS='|' read -r name path; do
        check_repo "$name" "$path"
    done
    
    echo ""
    echo "🔮 AI Integrations:"
    jq -r '.repositories.ai_integrations[] | "\(.name)|\(.path)"' "$ECOSYSTEM_DIR/repos.json" | while IFS='|' read -r name path; do
        check_repo "$name" "$path"
    done
    
    echo ""
    echo "🧪 Supporting Projects:"
    jq -r '.repositories.supporting[] | "\(.name)|\(.path)"' "$ECOSYSTEM_DIR/repos.json" | while IFS='|' read -r name path; do
        check_repo "$name" "$path"
    done
else
    # Fallback
    REPOS=("arcanea" "arcanea-infogenius" "arcanea-intelligence-os" "arcanea-mobile" "claude-arcanea" "claude-code-oracle-skills" "codex-arcanea" "gemini-arcanea" "infogenius" "labs")
    
    for repo in "${REPOS[@]}"; do
        check_repo "$repo" "$repo"
    done
fi

echo ""
echo "==================================="
echo "Legend: ✅ Clean | ⬆️ Ahead | ⬇️ Behind | 📝 Uncommitted | ❌ Not Cloned"
