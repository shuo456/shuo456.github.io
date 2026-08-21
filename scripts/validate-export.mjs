import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const expectedRoutes = [
  "out/index.html",
  "out/publications/index.html",
  "out/projects/index.html",
  "out/projects/fma-cbf/index.html",
  "out/travels/index.html",
  "out/cv/index.html",
  "out/teaching/index.html",
  "out/awards/index.html",
  "out/service/index.html",
];

for (const route of expectedRoutes) {
  const file = await stat(resolve(route));
  assert.ok(file.isFile(), `${route} must exist`);
  assert.ok(file.size > 0, `${route} must not be empty`);
}

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(entryPath)));
    } else if (entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }

  return files;
}

const forbiddenPatterns = [
  /\bTODO\b/i,
  /\bTBD\b/i,
  /example\.com/i,
  /lorem ipsum/i,
  /PRISM Academic Portfolio/i,
];

const htmlFiles = await collectHtmlFiles(resolve("out"));
for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  for (const pattern of forbiddenPatterns) {
    assert.doesNotMatch(html, pattern, `${htmlFile} contains ${pattern}`);
  }
}

console.log(
  `Validated ${expectedRoutes.length} routes and ${htmlFiles.length} HTML files.`,
);
