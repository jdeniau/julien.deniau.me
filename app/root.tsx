import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
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
  const location = useLocation();

  const prefix = location.pathname === '/' ? '' : '/';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Sidebar */}
        <section id="sidebar">
          <div className="inner">
            <nav>
              <ul>
                <li>
                  <Link to={`${prefix}#intro`}>Welcome</a>
                </li>
                <li>
                  <Link to={`${prefix}#talks`}>My talks</a>
                </li>
                <li>
                  <Link to={`${prefix}#blog`}>Blog</a>
                </li>
                <li>
                  <Link to={`${prefix}#contact`}>Get in touch</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        {/* Wrapper */}
        <div id="wrapper">
          <Outlet />
        </div>

        {/*  Footer */}
        <footer id="footer" className="wrapper style1-alt">
          <div className="inner">
            <ul className="menu">
              <li>&copy; Untitled. All rights reserved.</li>
              <li>
                Design: <a href="http://html5up.net">HTML5 UP</a>
              </li>
            </ul>
          </div>
        </footer>

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
