#!/usr/bin/env node
// Slice public/audio/_master.mp3 into per-line clips based on
// tools/audio-timestamps.json. Each output file is named <lineId>.mp3
// in the configured output directory. Existing files are overwritten.
//
// Usage:
//   node tools/split-audio.mjs                  # split using config defaults
//   node tools/split-audio.mjs --dry-run        # preview the ffmpeg commands
//
// Requires ffmpeg on PATH.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const configPath = path.join(__dirname, "audio-timestamps.json");

const dryRun = process.argv.includes("--dry-run");

if (!fs.existsSync(configPath)) {
  console.error(`Missing config: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const sourcePath = path.join(projectRoot, config.source);
const outputDir = path.join(projectRoot, config.outputDir);

if (!fs.existsSync(sourcePath)) {
  console.error(`Source audio not found: ${sourcePath}`);
  process.exit(1);
}
fs.mkdirSync(outputDir, { recursive: true });

let ok = 0;
let failed = 0;

for (const { id, start, end } of config.lines) {
  if (typeof start !== "number" || typeof end !== "number" || end <= start) {
    console.warn(`! ${id}: invalid timestamps, skipping`);
    failed++;
    continue;
  }
  const duration = (end - start).toFixed(3);
  const outFile = path.join(outputDir, `${id}.mp3`);
  const args = [
    "-y",
    "-loglevel",
    "error",
    "-i",
    sourcePath,
    "-ss",
    String(start),
    "-t",
    duration,
    "-acodec",
    "libmp3lame",
    "-b:a",
    "128k",
    outFile,
  ];

  if (dryRun) {
    console.log(`ffmpeg ${args.join(" ")}`);
    continue;
  }

  const result = spawnSync("ffmpeg", args, { encoding: "utf-8" });
  if (result.status !== 0) {
    console.error(`! ${id}: ffmpeg failed`);
    if (result.stderr) console.error(result.stderr);
    failed++;
    continue;
  }
  console.log(`✓ ${id}.mp3 (${duration}s)`);
  ok++;
}

if (!dryRun) {
  console.log(`\nDone. ${ok} succeeded, ${failed} failed.`);
}
