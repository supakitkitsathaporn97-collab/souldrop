// Lint plugins/souldrop/skills/*/SKILL.md frontmatter:
// - frontmatter block present
// - name: present, kebab-case, matches the folder name
// - description: present and non-trivial
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = 'plugins/souldrop/skills';
let failures = 0;
const fail = (msg) => { console.error(`FAIL ${msg}`); failures++; };

const dirs = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (dirs.length === 0) fail(`${root}: no skill folders found`);

for (const dir of dirs) {
  const file = join(root, dir, 'SKILL.md');
  if (!existsSync(file)) { fail(`${file}: missing`); continue; }
  const text = readFileSync(file, 'utf8');

  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { fail(`${file}: no frontmatter block`); continue; }
  const fm = m[1];

  const name = fm.match(/^name:\s*(.+)\s*$/m)?.[1]?.trim();
  const desc = fm.match(/^description:\s*(.+)\s*$/m)?.[1]?.trim();

  if (!name) fail(`${file}: frontmatter has no "name"`);
  else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) fail(`${file}: name "${name}" is not kebab-case`);
  else if (name !== dir) fail(`${file}: name "${name}" does not match folder "${dir}"`);

  if (!desc || desc.length < 10) fail(`${file}: description missing or too short`);

  if (name && desc && name === dir) console.log(`OK   ${dir}`);
}

if (failures > 0) {
  console.error(`\n${failures} problem(s).`);
  process.exit(1);
}
console.log(`\nAll ${dirs.length} skills pass.`);
