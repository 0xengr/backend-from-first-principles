#!/usr/bin/env node
// Structural + link checker for the notes repo. Node built-ins only, no dependencies.
//
//   node scripts/check.mjs            errors only
//   node scripts/check.mjs --strict   also fails on skeleton gaps (missing sections / Sources)
//
// Errors are things that are wrong for every file: broken relative links, a stray reference to
// the old http.md, zero or multiple H1s. Warnings are skeleton gaps, which are tolerated by
// default because chapters written before the convention existed are converted gradually.

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage']);
// Agent config dirs write paths repo-root-relative on purpose, so their links are not resolved.
const AGENT_DIRS = new Set(['.commandcode', '.opencode', '.agents', '.claude']);

const REQUIRED_H2 = ['The mental model', 'In practice', 'Going deeper', 'Traps', 'Sources'];

const errors = [];
const warnings = [];
const rel = (p) => path.relative(ROOT, p) || '.';
const err = (file, line, msg) => errors.push(`${file}${line ? `:${line}` : ''}  ${msg}`);
const warn = (file, line, msg) => warnings.push(`${file}${line ? `:${line}` : ''}  ${msg}`);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('.') && entry.name !== '.') {
      if (!AGENT_DIRS.has(entry.name)) continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

// Split a file into lines, tracking fenced code blocks so headings and links inside code are
// never interpreted as structure.
function scan(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const headings = [];
  const links = [];
  const stray = [];
  let fenceLang = null;
  let fenceStart = 0;

  lines.forEach((line, i) => {
    const fence = /^(\s*)(```|~~~)(.*)$/.exec(line);
    if (fence) {
      if (fenceLang === null) {
        fenceLang = fence[3].trim();
        fenceStart = i + 1;
        if (fenceLang === '') warn(rel(file), i + 1, 'code fence has no language tag');
      } else {
        fenceLang = null;
      }
      return;
    }
    if (fenceLang !== null) return;

    if (/\bhttp\.md\b/.test(line)) stray.push({line: i + 1});

    const h = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (h) headings.push({level: h[1].length, text: h[2], line: i + 1});

    for (const m of line.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      links.push({target: m[1], line: i + 1});
    }
  });

  if (fenceLang !== null) {
    err(rel(file), fenceStart, 'unclosed code fence');
  }

  return {lines, headings, links, stray};
}

const files = walk(ROOT);
let checkedTopics = 0;

for (const file of files) {
  const relPath = rel(file);
  const top = relPath.split(path.sep)[0];
  const inAgentDir = AGENT_DIRS.has(top);
  const {lines, headings, links, stray} = scan(file);

  // Agent prompt files (commands, skills) are instructions, not prose — no H1 requirement.
  if (!inAgentDir) {
    const h1 = headings.filter((h) => h.level === 1);
    if (h1.length === 0) err(relPath, 0, 'no H1 heading');
    if (h1.length > 1) {
      err(relPath, h1[1].line, `multiple H1 headings (${h1.map((h) => `L${h.line}`).join(', ')})`);
    }
  }

  // A concept file: NN-slug.md directly inside a NN-chapter/ directory.
  const isTopic = /^\d{2}-[^/\\]+[/\\]\d{2}-[^/\\]+\.md$/.test(relPath);
  if (isTopic) {
    checkedTopics += 1;

    const h2 = headings.filter((h) => h.level === 2).map((h) => h.text);
    const positions = REQUIRED_H2.map((name) => h2.indexOf(name));

    REQUIRED_H2.forEach((name, i) => {
      if (positions[i] === -1) {
        warn(relPath, 0, `missing "## ${name}"`);
      } else if (i > 0 && positions[i] < positions[i - 1]) {
        warn(relPath, 0, `"## ${name}" is out of order`);
      }
    });

    const sourcesAt = h2.indexOf('Sources');
    if (sourcesAt !== -1) {
      const heading = headings.find((h) => h.level === 2 && h.text === 'Sources');
      const next = headings.find((h) => h.line > heading.line && h.level <= 2);
      const body = lines
        .slice(heading.line, next ? next.line - 1 : lines.length)
        .join('\n');
      if (!/\[[^\]]+\]\(https?:\/\//.test(body)) {
        warn(relPath, heading.line, '"## Sources" has no linked source');
      }
    }

    if (!/^> \*\*In one line:\*\*/m.test(lines.join('\n'))) {
      warn(relPath, 0, 'missing the "> **In one line:**" summary');
    }
  }

  // Stray reference to the pre-split single file.
  for (const hit of stray) {
    err(relPath, hit.line, 'references the old http.md; link the topic file instead');
  }

  if (inAgentDir) continue;

  for (const {target, line} of links) {
    if (/^(https?:|mailto:|#|<)/.test(target)) continue;
    const clean = decodeURIComponent(target.split('#')[0].split('?')[0]);
    if (clean === '') continue;
    const resolved = clean.startsWith('/')
      ? path.join(ROOT, clean)
      : path.resolve(path.dirname(file), clean);
    if (!fs.existsSync(resolved)) {
      err(relPath, line, `broken link: ${target}`);
    }
  }
}

const report = (label, list) => {
  if (list.length === 0) return;
  console.log(`\n${label} (${list.length})`);
  for (const line of list) console.log(`  ${line}`);
};

report('Errors', errors);
report('Warnings', warnings);

const strictFails = STRICT && warnings.length > 0;
console.log(
  `\n${files.length} markdown files, ${checkedTopics} topic files, ` +
    `${errors.length} error(s), ${warnings.length} warning(s)` +
    `${STRICT ? ' [strict]' : ''}`,
);

if (errors.length > 0 || strictFails) {
  if (strictFails && errors.length === 0) {
    console.log('strict mode: warnings are failures');
  }
  process.exit(1);
}
