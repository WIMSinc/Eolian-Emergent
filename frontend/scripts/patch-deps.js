#!/usr/bin/env node
// patch-deps.js
// Runs via postinstall to neutralize ALL copies of ajv-keywords@3's
// _formatLimit.js that crash when ajv@8 is active.
// Uses `find` to locate every nested copy regardless of depth.

'use strict';

// Replacement for ajv-keywords@3's _formatLimit.js under ajv@8.
// The original code calls `ajv._formats[name].date` which doesn't exist in ajv@8.
// This stub registers the keywords with ajv@8's addKeyword API so that
// webpack schema validation doesn't throw "Unknown keyword formatMinimum".
const STUB =
  'module.exports = function addFormatLimit(ajv) {\n' +
  '  [\'formatMinimum\',\'formatMaximum\',\'formatExclusiveMinimum\',\'formatExclusiveMaximum\']\n' +
  '    .forEach(function(kw) {\n' +
  '      try { ajv.addKeyword({ keyword: kw, schemaType: \'string\' }); } catch(e) {}\n' +
  '    });\n' +
  '};\n';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const nodeModules = path.join(root, 'node_modules');

let patched = 0;

// Strategy 1: use `find` to locate all copies (Linux build machines have find)
try {
  const result = execSync(
    'find node_modules -type f -name "_formatLimit.js" -path "*/ajv-keywords/keywords/*" 2>/dev/null',
    { encoding: 'utf8', cwd: root, stdio: ['pipe', 'pipe', 'pipe'] }
  ).trim();

  const files = result.split('\n').filter(Boolean);
  for (const rel of files) {
    const full = path.join(root, rel);
    try {
      fs.writeFileSync(full, STUB);
      console.log('[patch-deps] Neutralized:', rel);
      patched++;
    } catch (e) {
      console.log('[patch-deps] Could not patch', rel, ':', e.message);
    }
  }
} catch (e) {
  console.log('[patch-deps] find command failed, falling back to manual search');

  // Strategy 2: Manual recursive walk (fallback)
  function walk(dir, depth) {
    if (depth > 6) return;
    try {
      const target = path.join(dir, 'ajv-keywords', 'keywords', '_formatLimit.js');
      if (fs.existsSync(target)) {
        fs.writeFileSync(target, STUB);
        console.log('[patch-deps] Neutralized:', path.relative(root, target));
        patched++;
      }
      const nested = path.join(dir, 'node_modules');
      if (fs.existsSync(nested)) {
        for (const pkg of fs.readdirSync(nested)) {
          walk(path.join(nested, pkg), depth + 1);
        }
      }
    } catch (_) {}
  }

  try {
    for (const pkg of fs.readdirSync(nodeModules)) {
      walk(path.join(nodeModules, pkg), 0);
    }
  } catch (_) {}
}

if (patched === 0) {
  console.log('[patch-deps] No _formatLimit.js targets found.');
} else {
  console.log('[patch-deps] Done. Patched', patched, 'file(s).');
}
