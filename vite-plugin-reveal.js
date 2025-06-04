import { promises as fs } from 'fs';
import path from 'path';

function randomString(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

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

      let outHtml = html;

      for (const asset of assetPaths) {
        // Only handle relative paths
        if (!asset.startsWith('/')) {
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

          // add hash before the file extension if it exists
          const finalAssetName = asset.replace(
            /(\.[^.]+)$/,
            (match) => `.${randomString()}${match}`
          );

          const finalDestPath = path.resolve(
            destPath,
            // 'assets',
            finalAssetName
          );
          console.log({
            asset,
            dest: finalDestPath,
          });

          await fs.mkdir(path.dirname(finalDestPath), { recursive: true });
          await fs.copyFile(srcPath, finalDestPath);

          // Replace the asset path in the HTML with the new path
          outHtml = outHtml.replace(
            new RegExp(`(["'])${asset}(["'])`, 'g'),
            `$1${finalAssetName}$2`
          );
        }
      }

      return outHtml;
    },
  };
}
