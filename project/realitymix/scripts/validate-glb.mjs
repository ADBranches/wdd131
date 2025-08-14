#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import pkg from 'gltf-validator';
const { validateBytes } = pkg;

/**
 * Validate a single GLB/GLTF file
 * @param {string} filePath - Path to the file
 */
async function validateFile(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    if (buffer.length < 12) { // Minimum GLB header size
      throw new Error('File is empty or too small');
    }
    const report = await validateBytes(new Uint8Array(buffer));
    console.log(`✅ ${filePath}`);
    if (report.issues.numErrors > 0) {
      console.warn('Issues found:', JSON.stringify(report.issues, null, 2));
    } else {
      console.log('No errors.');
    }
  } catch (err) {
    console.error(`❌ ${filePath} validation failed: ${err.message}`);
    process.exitCode = 1;
  }
}

/**
 * Recursively walk a directory and validate GLB/GLTF files
 * @param {string} dir - Directory to scan
 */
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

/**
 * Main validation script
 */
async function main() {
  const targetDir = process.argv[2] || 'public/assets/models';
  console.log(`Validating GLB/GLTF files in: ${targetDir}`);
  try {
    await walk(targetDir);
    console.log('Validation complete.');
  } catch (err) {
    console.error('Validation process failed:', err.message);
    process.exit(1);
  }
}

main();
