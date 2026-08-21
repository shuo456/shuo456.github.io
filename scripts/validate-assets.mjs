import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

const assetPaths = [
  "public/profile/shuo-xu-portrait.jpg",
  "public/papers/fma-cbf-paper.pdf",
  "public/media/ifac-case2-comparison.mp4",
  "public/media/quadrotor-gate-comparison.mp4",
  "public/media/unicycle-poster.png",
  "public/media/quadrotor-poster.png",
];

for (const assetPath of assetPaths) {
  const file = await stat(resolve(assetPath));
  assert.ok(file.isFile(), `${assetPath} must be a file`);
  assert.ok(file.size > 0, `${assetPath} must not be empty`);
  if (assetPath === "public/profile/shuo-xu-portrait.jpg") {
    assert.ok(file.size <= 2_000_000, `${assetPath} must be at most 2 MB`);
  }
}

assert.notEqual(assetPaths[2], assetPaths[3], "Video paths must be distinct");

console.log(`Validated ${assetPaths.length} public assets.`);
