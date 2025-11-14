#!/usr/bin/env python3
import os
import re
from html import unescape

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
HTML_DIR = PROJECT_ROOT

# pattern to capture href/src values
# capture href or src values, stopping before fragment or query
ATTR_RE = re.compile(r"(?:href|src)\s*=\s*[\"']([^\"#?]+)")
IGNORE_PREFIXES = ('http://','https://','mailto:','tel:','//','#')

missing = []
checked = 0

for root, dirs, files in os.walk(HTML_DIR):
    for f in files:
        if not f.lower().endswith('.html'):
            continue
        path = os.path.join(root, f)
        relpath = os.path.relpath(path, PROJECT_ROOT)
        with open(path, 'r', encoding='utf-8') as fh:
            try:
                text = fh.read()
            except Exception as e:
                print(f'ERROR reading {relpath}: {e}')
                continue
        for m in ATTR_RE.finditer(text):
            raw = unescape(m.group(1)).strip()
            if not raw:
                continue
            if raw.startswith(IGNORE_PREFIXES):
                continue
            # ignore json-ld URLs and canonical full URLs that point to example.com or external
            if raw.startswith('data:'):
                continue
            # remove query and fragment
            cleaned = raw.split('#',1)[0].split('?',1)[0]
            # determine target file path
            if cleaned.startswith('/'):
                # treat leading slash as project-root relative
                target = os.path.normpath(os.path.join(PROJECT_ROOT, cleaned.lstrip('/')))
            else:
                target = os.path.normpath(os.path.join(root, cleaned))
            checked += 1
            if not os.path.exists(target):
                missing.append((relpath, raw, os.path.relpath(target, PROJECT_ROOT)))

print('Link check summary:')
print(f'  HTML files scanned under: {PROJECT_ROOT}')
print(f'  Links checked: {checked}')
if missing:
    print(f'  Missing targets: {len(missing)}')
    for src, link, target in missing:
        print(f'MISSING in {src}: "{link}" -> expected "{target}"')
    print('\nResult: FAIL — some local targets are missing.')
    exit(1)
else:
    print('  Missing targets: 0')
    print('\nResult: OK — all local targets exist.')
    exit(0)
