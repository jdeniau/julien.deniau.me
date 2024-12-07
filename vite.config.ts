// /**
//  * @type {import('@remix-run/dev/config').AppConfig}
//  */
// const config = {
//   appDirectory: 'app',
//   assetsBuildDirectory: 'public/build',
//   publicPath: '/build/',
//   ignoredRouteFiles: ['**/.*'],
// };

// export default config;

import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { installGlobals } from '@remix-run/node';

installGlobals();

export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },

  plugins: [remix()],
  // build: {
  //   outDir: 'public/build',
  // },
  // publicDir: 'public',
  // server: {
  //   open: true,
  // },
});
