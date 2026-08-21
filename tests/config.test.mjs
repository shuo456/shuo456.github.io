import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Next exports a GitHub Pages-compatible static site", async () => {
  const source = await readFile(
    new URL("../next.config.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /output:\s*["']export["']/);
  assert.match(source, /trailingSlash:\s*true/);
  assert.match(source, /unoptimized:\s*true/);
});

test("the project exposes verification scripts", async () => {
  const pkg = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  for (const name of ["lint", "typecheck", "test", "build", "verify"]) {
    assert.equal(typeof pkg.scripts[name], "string");
  }
});
