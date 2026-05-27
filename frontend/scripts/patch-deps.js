#!/usr/bin/env node
// patch-deps.js
// Runs via postinstall to neutralize ajv-keywords@3 code that crashes
// when ajv@8 is forced by our npm overrides.
// fork-ts-checker-webpack-plugin bundles its own ajv-keywords@3 which
// calls `formats[name].date` — undefined in ajv@8's format API.
// This project has no TypeScript, so fork-ts-checker serves no purpose.

'use strict';

const fs = require('fs');
const path = require('path');

const nodeModules = path.join(__dirname, '..', 'node_modules');

// All possible locations for the crashing _formatLimit.js file
const targets = [
  path.join(nodeModules, 'fork-ts-checker-webpack-plugin', 'node_modules', 'ajv-keywords', 'keywords', '_formatLimit.js'),
  path.join(nodeModules, 'ajv-keywords', 'keywords', '_formatLimit.js'),
];

let patched = 0;
for (const target of targets) {
  if (fs.existsSync(target)) {
    fs.writeFileSync(target, 'module.exports = function addFormatLimit() {};\n');
    console.log('[patch-deps] Neutralized:', path.relative(nodeModules, target));
    patched++;
  }
}

if (patched === 0) {
  console.log('[patch-deps] No _formatLimit.js targets found — skipping.');
}
