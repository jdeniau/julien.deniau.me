import { promises as fs } from 'fs';
import path from 'path';

/**
 * This plugin copies assets referenced in data-background and data-background-iframe attributes
 * to the output directory during the build process.
 *
 * @return {import('vite').Plugin}
 */
export default function revealDataBackgroundPlugin() {
  let c;

  return {
    name: 'reveal-data-background-assets',
    enforce: 'post',
    apply(config, env) {
      // memoize the config for use in transformIndexHtml
      c = config;

      return true;
    },
    async transformIndexHtml(html, ctx) {
      // Find all data-background and data-background-iframe attributes
      const regex = /data-background(?:-iframe)?=["']([^"']+)["']/g;
      let match;
      const assetPaths = new Set();
      while ((match = regex.exec(html))) {
        assetPaths.add(match[1]);
      }

      // Copy each asset to the output dir if needed
      if (ctx && ctx.server) return html; // Only run during build

      for (const asset of assetPaths) {
        // Only handle relative paths
        if (
          // asset.startsWith('.')
          !asset.startsWith('/')
        ) {
          const srcPath = path.resolve(
            ctx.filename ? path.dirname(ctx.filename) : process.cwd(),
            asset
          );

          // get destPath from context
          const destPath = c.build?.outDir;

          if (!destPath) {
            console.warn(
              'No output directory specified in Vite config. Skipping asset copy.'
            );
            continue;
          }

          const finalDestPath = path.resolve(
            destPath,
            // 'assets',
            asset.replace(/^\//, '')
          );
          console.log({
            asset,
            dest: finalDestPath,
          });

          await fs.mkdir(path.dirname(finalDestPath), { recursive: true });
          await fs.copyFile(srcPath, finalDestPath);
        }
      }
      return html;
    },
  };
}
