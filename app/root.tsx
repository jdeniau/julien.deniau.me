import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction } from 'remix';

export const meta: MetaFunction = () => {
  return { title: 'Julien Deniau' };
};

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: '/theme/assets/css/main.css',
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />

        <script src="/theme/assets/js/jquery.min.js"></script>
        <script src="/theme/assets/js/jquery.scrollex.min.js"></script>
        <script src="/theme/assets/js/jquery.scrolly.min.js"></script>
        <script src="/theme/assets/js/browser.min.js"></script>
        <script src="/theme/assets/js/breakpoints.min.js"></script>
        <script src="/theme/assets/js/util.js"></script>
        <script src="/theme/assets/js/main.js"></script>

        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
