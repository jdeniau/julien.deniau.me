import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';
import vitePluginReveal from './vite-plugin-reveal.js';

const args = process.argv.slice(2);

const PUBLIC_DIR = path.resolve('public');

// ensure a directory is provided
if (!args.length) {
  console.warn('No directory provided, using "talk" directory.');
}

const talkDir = args[0] ?? null;

const fullDir = talkDir ? path.resolve('talk', talkDir) : path.resolve('talk');

// ensure the directory exists
const isDirectory = fs
  .statSync(fullDir, { throwIfNoEntry: false })
  ?.isDirectory();

if (!isDirectory) {
  console.error(`The path "${fullDir}" is not a talk directory.`);
  process.exit(1);
}

// start dev server vite
try {
  const server = await createServer({
    configFile: false,
    root: fullDir,
    base: '/',
    publicDir: PUBLIC_DIR,
    plugins: [vitePluginReveal()],
    server: {
      host: '0.0.0.0',
      port: 5137,
    },
    // build: {
    //   outDir,
    //   emptyOutDir: true,
    // },
  });

  await server.listen();

  server.printUrls();
  server.bindCLIShortcuts({ print: true });
} catch (error) {
  console.error(`Failed to start dev server for talk "${talkDir}":`, error);
  process.exit(1);
}
