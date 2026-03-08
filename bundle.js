#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'family-tree-editor-mobile.html');
const jsonPath = path.join(__dirname, '陈氏宗支总图.json');

const html = fs.readFileSync(htmlPath, 'utf-8');
const json = fs.readFileSync(jsonPath, 'utf-8');

// Validate JSON
JSON.parse(json);

// Replace the DEFAULT_DATA line
const pattern = /^const DEFAULT_DATA = .+;$/m;
if (!pattern.test(html)) {
  console.error('ERROR: Could not find DEFAULT_DATA line in HTML.');
  process.exit(1);
}

const minified = JSON.stringify(JSON.parse(json));
const updated = html.replace(pattern, `const DEFAULT_DATA = ${minified};`);

fs.writeFileSync(htmlPath, updated, 'utf-8');
console.log('Bundled JSON into HTML successfully.');
