#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import pkg from 'gltf-validator';
const { validateBytes } = pkg;

let errorCount = 0;
let successCount = 0;

async function validateFile(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    if (buffer.length < 12) {
      throw new Error('File is empty or too small');
    }
    const report = await validateBytes(new Uint8Array(buffer));
    if (report.issues.numErrors > 0) {
      console.warn(`❌ ${filePath} - Issues found: ${JSON.stringify(report.issues, null, 2)}`);
      errorCount++;
    } else {
      console.log(`✅ ${filePath} - No errors.`);
      successCount++;
    }
  } catch (err) {
    console.error(`❌ ${filePath} validation failed: ${err.message}`);
    errorCount++;
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (fullPath.endsWith('.glb') || fullPath.endsWith('.gltf')) {
      await validateFile(fullPath);
    }
  }
}

async function main() {
  const targetDir = process.argv[2] || 'public/assets/models';
  console.log(`Validating GLB/GLTF files in: ${targetDir}`);
  try {
    await walk(targetDir);
    console.log(`Validation complete. Success: ${successCount}, Errors: ${errorCount}`);
    if (errorCount > 0) process.exitCode = 1;
  } catch (err) {
    console.error('Validation process failed:', err.message);
    process.exit(1);
  }
}

main();
