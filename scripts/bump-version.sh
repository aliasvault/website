#!/usr/bin/env bash
# Bump the AliasVault website version, then optionally commit, tag, and push
# to trigger the prod deploy pipeline.
#
# Each step (write / commit / tag / push) prompts separately so you can
# stop after any step and resume later — e.g. write+commit, verify the
# build, then re-run to tag+push. You can also re-run with the same
# version to re-tag / re-push.
#
# Writes:
#   .version/version.txt       e.g. 1.2.3 or 1.2.3-rc.1
#   .version/{major,minor,patch,suffix}.txt
#   package.json "version"     kept in sync with .version/version.txt

set -euo pipefail

if [ -z "${BASH_VERSION:-}" ]; then
    echo "Error: this script must be run with bash"
    exit 1
fi

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
RESET='\033[0m'

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION_DIR="$REPO_ROOT/.version"
mkdir -p "$VERSION_DIR"

cd "$REPO_ROOT"

# Default-Yes confirm. Returns 0 on yes, 1 on no.
confirm() {
    local prompt="$1"
    local reply
    read -rp "$prompt [Y/n] " reply
    reply="${reply:-y}"
    [[ "$reply" =~ ^[Yy]$ ]]
}

# Default-No confirm. Used for destructive operations (force-tag, force-push).
confirm_no() {
    local prompt="$1"
    local reply
    read -rp "$prompt [y/N] " reply
    [[ "$reply" =~ ^[Yy]$ ]]
}

# Read current version (may be missing on a fresh checkout).
current_version=""
if [ -f "$VERSION_DIR/version.txt" ]; then
    current_version=$(tr -d '[:space:]' < "$VERSION_DIR/version.txt")
fi

# Suggest next minor by default; reset patch to 0.
if [[ "$current_version" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)((-[a-zA-Z]+)(\.[0-9]+)?)?$ ]]; then
    cur_major="${BASH_REMATCH[1]}"
    cur_minor="${BASH_REMATCH[2]}"
    suggested="${cur_major}.$((cur_minor + 1)).0"
else
    suggested="1.0.0"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo "Current version: ${current_version:-<unset>}"
echo ""

while true; do
    read -rp "Enter new version [$suggested]: " new_version
    new_version="${new_version:-$suggested}"
    if [[ "$new_version" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)((-[a-zA-Z]+)(\.[0-9]+)?)?$ ]]; then
        major="${BASH_REMATCH[1]}"
        minor="${BASH_REMATCH[2]}"
        patch="${BASH_REMATCH[3]}"
        suffix="${BASH_REMATCH[4]:-}"
        break
    fi
    echo -e "${RED}Invalid format. Use X.Y.Z or X.Y.Z-suffix (e.g. 1.2.3 or 1.2.3-rc.1).${RESET}"
done

# The deploy workflow triggers prod on any tag; tag matches the bare X.Y.Z.
tag="$new_version"

# ─── Step 1: write .version files ────────────────────────────────────────────
echo ""
echo "$new_version" > "$VERSION_DIR/version.txt"
echo "$major" > "$VERSION_DIR/major.txt"
echo "$minor" > "$VERSION_DIR/minor.txt"
echo "$patch" > "$VERSION_DIR/patch.txt"
echo "$suffix" > "$VERSION_DIR/suffix.txt"

# Keep package.json's top-level "version" in sync (the 2-space-indented key, so
# nested "version" fields elsewhere in the file are never touched).
if [ -f "$REPO_ROOT/package.json" ]; then
    VERSION="$new_version" perl -i -pe 's/^(  "version": ")[^"]*(")/$1$ENV{VERSION}$2/' "$REPO_ROOT/package.json"
fi
echo -e "${GREEN}✓ [1/4] .version/ + package.json written to $new_version${RESET}"

# ─── Step 2: commit .version ─────────────────────────────────────────────────
echo ""
git add .version/ package.json
if git diff --cached --quiet -- .version/ package.json; then
    echo -e "${YELLOW}No changes staged under .version/ or package.json — skipping commit step.${RESET}"
else
    git --no-pager diff --cached --stat -- .version/ package.json
    if ! confirm "[2/4] Commit '.version/' as 'Bump version to $new_version'?"; then
        echo -e "${YELLOW}Stopped after write. To finish later:"
        echo -e "  git commit -m 'Bump version to $new_version'"
        echo -e "  bash scripts/bump-version.sh   # resumes from tag step${RESET}"
        exit 0
    fi
    git commit -m "Bump version to $new_version"
    echo -e "${GREEN}✓ Committed${RESET}"
fi

# ─── Step 3: create tag ──────────────────────────────────────────────────────
echo ""
tag_force=false
if git rev-parse "$tag" >/dev/null 2>&1; then
    existing_sha=$(git rev-parse "$tag")
    head_sha=$(git rev-parse HEAD)
    if [[ "$existing_sha" == "$head_sha" ]]; then
        echo -e "${YELLOW}Tag $tag already exists at HEAD — nothing to retag.${RESET}"
    else
        echo -e "${YELLOW}Tag $tag exists at $existing_sha (HEAD is $head_sha).${RESET}"
        if ! confirm_no "[3/4] Re-tag $tag at HEAD (deletes the existing local tag)?"; then
            echo -e "${YELLOW}Stopped before tag.${RESET}"
            exit 0
        fi
        git tag -d "$tag"
        git tag -a "$tag" -m "Release $new_version"
        tag_force=true
        echo -e "${GREEN}✓ Re-tagged $tag at HEAD${RESET}"
    fi
else
    if ! confirm "[3/4] Create tag $tag at HEAD?"; then
        echo -e "${YELLOW}Stopped before tag. To finish later:"
        echo -e "  git tag -a $tag -m 'Release $new_version'"
        echo -e "  git push origin HEAD $tag${RESET}"
        exit 0
    fi
    git tag -a "$tag" -m "Release $new_version"
    echo -e "${GREEN}✓ Tagged $tag${RESET}"
fi

# ─── Step 4: push ────────────────────────────────────────────────────────────
echo ""
echo "Pushing the tag is what triggers the prod deploy."
if ! confirm "[4/4] Push HEAD and $tag to origin?"; then
    echo -e "${YELLOW}Stopped before push. To finish later:"
    echo -e "  git push origin HEAD $tag${RESET}"
    exit 0
fi
git push origin HEAD

# Detect whether origin already has the tag (and at a different commit) so we
# can ask before force-pushing instead of just failing.
remote_tag_sha=$(git ls-remote --tags origin "$tag" | awk '{print $1}' | head -n1)
local_tag_sha=$(git rev-parse "$tag")
push_args=("origin" "$tag")
if [[ -n "$remote_tag_sha" && "$remote_tag_sha" != "$local_tag_sha" ]]; then
    echo -e "${YELLOW}Tag $tag on origin points to $remote_tag_sha (local is $local_tag_sha).${RESET}"
    if ! confirm_no "Force-push tag $tag (overwrites origin)?"; then
        echo -e "${YELLOW}Stopped — tag not pushed.${RESET}"
        exit 0
    fi
    push_args=("--force" "origin" "$tag")
fi
git push "${push_args[@]}"

echo ""
echo -e "${GREEN}✓ Pushed commit and tag $tag — prod deploy triggered.${RESET}"
