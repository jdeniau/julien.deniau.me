import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { useEffect, useState } from 'react';
import cn from 'classnames';

type NavItems = Array<[string, string]>;
const NAV_ITEMS: NavItems = [
  ['intro', 'Welcome'],
  ['blog', 'Blog'],
  ['talks', 'My talks'],
];

export const meta: MetaFunction = () => {
  return { title: 'Julien Deniau' };
};

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: '/theme/assets/css/main.css',
    },

    {
      rel: 'stylesheet',
      href: '/theme/assets/css/fontawesome-all.min.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Lato:400,400italic,700,700italic|Source+Code+Pro:400',
    },
  ];
}

function usePreload() {
  const [preload, setPreload] = useState('is-preload');

  useEffect(() => {
    setPreload('');
  }, []);

  return preload;
}

type NavProps = {
  items: NavItems;
  prefix: '' | '/';
  onClick: () => void;
};

function Nav({ items, prefix, onClick }: NavProps): JSX.Element {
  return (
    <nav id="nav">
      <ul>
        {items.map(([href, label], index) => (
          <li key={href}>
            <Link
              to={`${prefix}#${href}`}
              onClick={onClick}
              className={cn(index === 0 && 'active')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function App() {
  const location = useLocation();
  const [headerVisible, setHeaderVisible] = useState(false);
  const isPreload = usePreload();

  const prefix = location.pathname === '/' ? '' : '/';

  return (
    <html
      lang="en"
      // @ts-expect-error -- ignore xmlns errors
      xmlns:og="http://ogp.me/ns#"
      xmlns:article="http://ogp.me/ns/article#"
      xmlns:profile="http://ogp.me/ns/profile#"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />

        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Julien Deniau"
          href="/posts.rss"
        />
      </head>
      <body className={cn(isPreload, headerVisible && 'header-visible')}>
        <div id="titleBar">
          <a
            href="#header"
            className="toggle"
            onClick={(e) => {
              e.preventDefault();
              setHeaderVisible((prev) => !prev);
            }}
          />
          <span className="title">
            <Link to="/">Julien Deniau</Link>
          </span>
        </div>

        <section id="header">
          <header>
            <span className="image avatar">
              <img src="/images/avatar.jpg" alt="" />
            </span>
            <h1 id="logo">
              <Link to="/">Julien Deniau</Link>
            </h1>
            <p>
              I am a french web developer <br />
              and sometimes, I talk about things.
            </p>
          </header>
          <Nav
            prefix={prefix}
            items={NAV_ITEMS}
            onClick={() => {
              setHeaderVisible(false);
            }}
          />

          <footer>
            <ul className="icons">
              <li>
                <a
                  rel="me"
                  href="https://piaille.fr/@jdeniau"
                  className="icon brands fa-mastodon"
                >
                  <span className="label">Mastodon</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/j_deniau"
                  className="icon brands fa-twitter"
                >
                  <span className="label">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/jdeniau"
                  className="icon brands fa-github"
                >
                  <span className="label">Github</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/juliendeniau/"
                  className="icon brands fa-linkedin"
                >
                  <span className="label">Linkedin</span>
                </a>
              </li>
            </ul>
          </footer>
        </section>

        {/* Wrapper */}
        <div id="wrapper">
          <div id="main">
            <Outlet />
          </div>
        </div>

        {/*  Footer */}
        <section id="footer">
          <div className="container">
            <ul className="copyright">
              <li>
                Design: <a href="http://html5up.net">HTML5 UP</a>
              </li>
            </ul>
          </div>
        </section>

        <ScrollRestoration />
        <Scripts />

        {/* <script src="/theme/assets/js/jquery.min.js"></script>
        <script src="/theme/assets/js/jquery.scrollex.min.js"></script>
        <script src="/theme/assets/js/jquery.scrolly.min.js"></script> */}
        <script src="/theme/assets/js/browser.min.js"></script>
        <script src="/theme/assets/js/breakpoints.min.js"></script>
        {/* <script src="/theme/assets/js/util.js"></script> */}
        <script src="/theme/assets/js/main.js"></script>

        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
