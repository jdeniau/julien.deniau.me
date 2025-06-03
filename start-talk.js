import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const args = process.argv.slice(2);

const PUBLIC_DIR = path.resolve('public');

// ensure a directory is provided
let projects;
if (!args.length) {
  console.log('No directory provided.');
  process.exit(1);
}

const talkDir = args[0];

const fullDir = path.resolve('talk', talkDir);

// ensure the directory exists
const isDirectory = fs
  .statSync(fullDir, { throwIfNoEntry: false })
  ?.isDirectory();

if (!isDirectory) {
  console.error(`The path "${talkDir}" is not a talk directory.`);
  process.exit(1);
}

const outDir = path.join(PUBLIC_DIR, talkDir);

// start dev server vite
try {
  const server = await createServer({
    configFile: false,
    root: fullDir,
    base: '/',
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

  console.log(
    `Started dev server for talk "${talkDir}" at http://localhost:3000/${talkDir}/`
  );
} catch (error) {
  console.error(`Failed to start dev server for talk "${talkDir}":`, error);
  process.exit(1);
}
