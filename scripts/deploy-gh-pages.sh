#!/usr/bin/env bash
# dist/ の中身をそのまま gh-pages ブランチに 1 コミットとして積んで push する。
# 以前使っていた push-dir（修正版の出ない重大な脆弱性あり）の置き換え。
# 使い方: npm run generate:gh-pages のあとに npm run deploy（deploy.sh が両方を行う）
set -euo pipefail

DIR="${1:-dist}"
BRANCH=gh-pages
REMOTE=origin

[ -f "$DIR/index.html" ] || { echo "error: $DIR/index.html がありません。先に generate してください" >&2; exit 1; }

SRC_REV=$(git rev-parse --short HEAD)
WT=$(mktemp -d)
trap 'git worktree remove --force "$WT" >/dev/null 2>&1 || rm -rf "$WT"' EXIT

git fetch "$REMOTE" "$BRANCH"
git worktree add --detach "$WT" "$REMOTE/$BRANCH"

# gh-pages の中身を dist と完全に同じにする（.git だけ残す）
find "$WT" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R "$DIR"/. "$WT"/

git -C "$WT" add -A
if git -C "$WT" diff --cached --quiet; then
  echo "変更なし。push しません"
  exit 0
fi
git -C "$WT" commit -q -m "$SRC_REV"
git -C "$WT" push "$REMOTE" "HEAD:$BRANCH"
echo "pushed $BRANCH ($(git -C "$WT" rev-parse --short HEAD), source $SRC_REV)"
