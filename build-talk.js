import fs from 'node:fs';
import path from 'node:path';
import { build } from 'vite';
import vitePluginReveal from './vite-plugin-reveal.js';

const args = process.argv.slice(2);

const PUBLIC_DIR = path.resolve('public');

// ensure a directory is provided
let projects;
if (!args.length) {
  console.log('No directory provided. Building all talks.');
  projects = fs
    .readdirSync('talk')
    .filter((file) => fs.statSync(path.join('talk', file)).isDirectory())
    .map((file) => path.basename(file));
} else {
  projects = args;
  console.log(`Building talk in directory: ${projects.join(', ')}`);
}

await projects.forEach(async (talkDir) => {
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

  // build with vite
  try {
    await build({
      root: fullDir,
      base: `/${talkDir}/`,
      plugins: [vitePluginReveal()],
      build: {
        outDir,
        emptyOutDir: true,
        // rollupOptions: {
        //   input: {
        //     main: path.join(fullDir, 'index.html'),
        //   },
        // },
      },
    });

    console.log(`Built talk "${talkDir}" successfully.`);
  } catch (error) {
    console.error(`Failed to build talk "${talkDir}":`, error);
    // process.exit(1);
  }
});
