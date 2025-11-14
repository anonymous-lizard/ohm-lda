#!/usr/bin/env bash
set -euo pipefail
root="/workspaces/ohm-lda/ohm-mvp"
echo "Checking HTML files under $root"
bad=0

while IFS= read -r file; do
  echo "== $file"
  # Extract href and src values, then check local targets
  while IFS= read -r ref; do
    [ -z "$ref" ] && continue
    case "$ref" in
      http*|mailto:*|tel:*|#|//|javascript:*)
        continue;;
    esac
    if [[ "$ref" = /* ]]; then
      target="$root$ref"
    else
      target="$(dirname "$file")/$ref"
    fi
    # strip query and fragment
    target="${target%%[\?#]*}"
    if [ -e "$target" ]; then
      echo " OK: $ref -> $(realpath --relative-to=\"$root\" \"$target\")"
    else
      echo " MISSING: $ref -> $target"
      bad=$((bad+1))
    fi
  done < <(grep -oP '(?<=href=")[^\"]+|(?<=src=")[^\"]+' "$file" || true)

done < <(find "$root" -name '*.html' | sort)

echo "Done. Missing references: $bad"
exit 0
