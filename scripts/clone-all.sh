#!/bin/bash
# Arcanea Ecosystem - Clone All Repositories
# Usage: ./scripts/clone-all.sh

set -e

echo "🌟 Cloning Arcanea Ecosystem..."
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ECOSYSTEM_DIR="$(dirname "$SCRIPT_DIR")"

# Read repos from JSON (requires jq)
if ! command -v jq &> /dev/null; then
    echo "❌ jq is required but not installed. Install it first:"
    echo "   macOS: brew install jq"
    echo "   Ubuntu: sudo apt-get install jq"
    echo "   Windows: choco install jq"
    exit 1
fi

REPOS_FILE="$ECOSYSTEM_DIR/repos.json"

# Clone all repos
clone_repo() {
    local name=$1
    local url=$2
    local path=$3
    
    if [ -d "$ECOSYSTEM_DIR/$path/.git" ]; then
        echo "✅ $name already cloned"
    else
        echo "📦 Cloning $name..."
        git clone "$url" "$ECOSYSTEM_DIR/$path"
        echo "✅ $name cloned"
    fi
}

# Clone core repos
echo "🏛️ Cloning Core Projects..."
jq -r '.repositories.core[] | "\(.name)|\(.url)|\(.path)"' "$REPOS_FILE" | while IFS='|' read -r name url path; do
    clone_repo "$name" "$url" "$path"
done

echo ""
echo "🔮 Cloning AI Integrations..."
jq -r '.repositories.ai_integrations[] | "\(.name)|\(.url)|\(.path)"' "$REPOS_FILE" | while IFS='|' read -r name url path; do
    clone_repo "$name" "$url" "$path"
done

echo ""
echo "🧪 Cloning Supporting Projects..."
jq -r '.repositories.supporting[] | "\(.name)|\(.url)|\(.path)"' "$REPOS_FILE" | while IFS='|' read -r name url path; do
    clone_repo "$name" "$url" "$path"
done

echo ""
echo "✨ All repositories cloned!"
echo "Run ./scripts/sync-all.sh to pull latest changes."
