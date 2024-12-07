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

declare module '@remix-run/node' {
  // or cloudflare, deno, etc.
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },

  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        // v3_singleFetch: true, // will need node 20
        v3_lazyRouteDiscovery: true,
      },
    }),
  ],
  // build: {
  //   outDir: 'public/build',
  // },
  // publicDir: 'public',
  // server: {
  //   open: true,
  // },
});
