#!/usr/bin/env node
/* Fails if tailwind.config.ts's `colors` block contains a raw hex literal
   instead of a var(--sp-*) reference into src/styles/tokens.css.

   This is what makes the Kintsugi palette drift structurally impossible
   instead of merely discouraged — mirrors the guard in secure-pride-design's
   component-factory build (factory/build.mjs), adapted for Tailwind config
   instead of HTML templating. If this fails, fix the color value in
   tailwind.config.ts (or add the missing token to tokens.css) — never loosen
   this check to make a raw hex pass. */

import { readFileSync } from 'node:fs';

const CONFIG_PATH = new URL('../tailwind.config.ts', import.meta.url);
const src = readFileSync(CONFIG_PATH, 'utf8');

const colorsMatch = src.match(/colors:\s*\{([\s\S]*?)\n {6}\},\n {6}fontFamily:/);
if (!colorsMatch) {
  console.error('✗ check-color-tokens: could not locate the `colors` block in tailwind.config.ts');
  process.exit(1);
}

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const violations = [];
colorsMatch[1].split('\n').forEach((line, i) => {
  const hits = line.match(HEX_RE);
  if (hits) violations.push(`  colors:${i + 1}  raw hex ${hits.join(', ')}: ${line.trim()}`);
});

if (violations.length) {
  console.error('✗ color token drift — tailwind.config.ts colors must reference var(--sp-*), not literal hex:\n');
  console.error(violations.join('\n'));
  console.error('\nAdd/fix the value in src/styles/tokens.css and reference it with var(--sp-name) instead.');
  process.exit(1);
}

console.log('✓ tailwind.config.ts colors are all token references — no raw hex drift');
