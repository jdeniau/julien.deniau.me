import cn from 'classnames';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { formatDate } from '../date';
import { getPosts, Post } from '../post';

type Talk = {
  title: string;
  description?: string;
  url: string;
  urlText: string;
  secondaryUrl?: string;
  secondaryUrlText?: string;
  image?: string;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return {
    posts,
    talks: [
      {
        title: 'Open-source : pourquoi ? comment ? (in french)',
        url: '/open-source-howto/dist/presenter/',
        urlText: 'Slides',
      },
      {
        title:
          "Tout ce que vous n'avez jamais voulu savoir sur les fuseaux horaires (in french)",
        image: '/timezones/images/World_Time_Zones_Map.png',
        url: 'https://mixitconf.org/2023/tout-ce-que-vous-n-avez-jamais-voulu-savoir-sur-les-fuseaux-horaires',
        urlText: 'Vidéo',
        secondaryUrl: '/timezones/',
        secondaryUrlText: 'Slides',
      },
      {
        title: 'Les libs js, watch-module, les dépendances et le reste',
        // description: 'A personal website',
        url: '/js-lib-watch-module-dependencies/',
        urlText: 'Slides',
      },
      {
        title: 'TypeScript',
        url: '/typescript/',
        urlText: 'Slides',
        image: '/images/typescript.png',
      },
      {
        title: 'Nouveautés de ReactJS 2019-2020',
        url: '/react-2019-2020/',
        urlText: 'Slides',
        image: '/images/react-2019-2020.png',
      },
      {
        title: "Explorez votre code avec de l'analyse statique",
        description: 'Explore your code with static analysis',
        url: '/phpstan/',
        urlText: 'Français',
        image: '/images/phpstan.png',
        secondaryUrl: '/phpstan/?lang=en',
        secondaryUrlText: 'English',
      },
      {
        title: 'Git for (semi-)humans (in french)',
        image: '/images/git-t-shirt-293.png',
        url: 'https://www.youtube.com/watch?v=0TseOakTXIA',
        urlText: 'Vidéo',
        secondaryUrl:
          'https://docs.google.com/presentation/d/1W0ihaS0Mwi7SUzzK016rkYgZ6pTahABA8fsfdU9nLnQ/pub?start=false&loop=false&delayms=3000&slide=id.p',
        secondaryUrlText: 'Slides',
      },
      {
        title: "Retour d'expérience sur un an avec Elasticsearch",
        image: '/images/mapado-elasticsearch.jpeg',
        url: '/retour-es/',
        urlText: 'Slides',
      },
      {
        title: 'Développeurs, améliorez votre UX !',
        image: '/images/ux-discussion.jpg',
        url: '/dev-ux/',
        urlText: 'Slides',
      },
    ],
  };
};

function PostFlag({ lang }: { lang: string | undefined }): JSX.Element | null {
  let emoji: JSX.Element;
  switch (lang) {
    case 'fr':
      emoji = <>🇫🇷</>;
      break;

    case 'en':
      emoji = <>🇬🇧</>;
      break;

    default:
      return null;
  }

  return <span className="post-list__flag">{emoji}</span>;
}

export default function Index() {
  const { talks, posts } = useLoaderData<{ talks: Talk[]; posts: Post[] }>();

  return (
    <>
      <section id="intro">
        <div className="image main">
          <img src="/images/banner.jpg" alt="banner" />
        </div>
        <div className="container">
          <header className="major">
            <h2>Julien Deniau</h2>
            {/*
            <p>
              Just an incredibly simple responsive site
              <br />
              template freebie by <a href="http://html5up.net">HTML5 UP</a>.
            </p>*/}
          </header>
          {/*
          <p>
            Faucibus sed lobortis aliquam lorem blandit. Lorem eu nunc metus
            col. Commodo id in arcu ante lorem ipsum sed accumsan erat praesent
            faucibus commodo ac mi lacus. Adipiscing mi ac commodo. Vis aliquet
            tortor ultricies non ante erat nunc integer eu ante ornare amet
            commetus vestibulum blandit integer in curae ac faucibus integer
            non. Adipiscing cubilia elementum.
            </p>*/}
        </div>
      </section>

      <section id="blog">
        <div className="container">
          <h3>Blog</h3>
          {/* <p>
      Integer eu ante ornare amet commetus vestibulum blandit integer in
      curae ac faucibus integer non. Adipiscing cubilia elementum integer
      lorem ipsum dolor sit amet.
    </p> */}
          <hr />
          <ul className="feature-icons">
            {posts.map((post) => (
              // some example icons: code, lock, cog, desktop, link, gem, bolt, coffee, book, cubes, users …
              <li
                key={post.slug}
                className={cn(post.icon && `icon solid major fa-${post.icon}`)}
                lang={post.lang}
              >
                <PostFlag lang={post.lang} />
                <h3>
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                <em>{formatDate(post.date)}</em>
                {post.emphasis && <p>{post.emphasis}</p>}
                <Link to={`/posts/${post.slug}`} className="button primary">
                  Read post
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/posts/" className="button alt">
            See all blog posts
          </Link>
        </div>
      </section>

      <section id="talks">
        <div className="container">
          <h3>A few talks</h3>
          <hr />
          {/* <p>
            Integer eu ante ornare amet commetus vestibulum blandit integer in
            curae ac faucibus integer non. Adipiscing cubilia elementum integer.
            Integer eu ante ornare amet commetus.
          </p> */}
          <div className="features">
            {talks.map((talk: Talk, index) => (
              <article key={talk.url}>
                <a
                  href={talk.url ?? '#'}
                  className="image"
                  data-position="center center"
                >
                  <img
                    src={
                      talk.image ?? `/theme/images/pic0${(index % 3) + 1}.jpg`
                    }
                    alt=""
                    // data-size="contain"
                    // data-repeat="no-repeat"
                  />
                </a>

                <div className="inner">
                  <h4>{talk.title}</h4>
                  {talk.description && <p>{talk.description}</p>}
                  <ul className="actions">
                    <li>
                      <a href={talk.url} className="button">
                        {talk.urlText}
                      </a>
                    </li>
                    {talk.secondaryUrl && (
                      <li>
                        <a href={talk.secondaryUrl} className="button alt">
                          {talk.secondaryUrlText}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/*
      <section id="four">
        <div className="container">
          <h3>Contact Me</h3>
          <p>
            Integer eu ante ornare amet commetus vestibulum blandit integer in
            curae ac faucibus integer non. Adipiscing cubilia elementum integer.
            Integer eu ante ornare amet commetus.
          </p>
          <form method="post" action="#">
            <div className="row gtr-uniform">
              <div className="col-6 col-12-xsmall">
                <input type="text" name="name" id="name" placeholder="Name" />
              </div>
              <div className="col-6 col-12-xsmall">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                />
              </div>
              <div className="col-12">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  rows={6}
                ></textarea>
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li>
                    <input
                      type="submit"
                      className="primary"
                      value="Send Message"
                    />
                  </li>
                  <li>
                    <input type="reset" value="Reset Form" />
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section id="five">
        <div className="container">
          <h3>Elements</h3>

          <section>
            <h4>Text</h4>
            <p>
              This is <b>bold</b> and this is <strong>strong</strong>. This is{' '}
              <i>italic</i> and this is <em>emphasized</em>. This is{' '}
              <sup>superscript</sup> text and this is <sub>subscript</sub> text.
              This is <u>underlined</u> and this is code:{' '}
              <code>for (;;) {`{ ... }`}</code>. Finally,{' '}
              <a href="#">this is a link</a>.
            </p>
            <hr />
            <header>
              <h4>Heading with a Subtitle</h4>
              <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
            </header>
            <p>
              Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida
              odio porttitor sem non mi integer non faucibus ornare mi ut ante
              amet placerat aliquet. Volutpat eu sed ante lacinia sapien lorem
              accumsan varius montes viverra nibh in adipiscing blandit tempus
              accumsan.
            </p>
            <header>
              <h5>Heading with a Subtitle</h5>
              <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
            </header>
            <p>
              Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida
              odio porttitor sem non mi integer non faucibus ornare mi ut ante
              amet placerat aliquet. Volutpat eu sed ante lacinia sapien lorem
              accumsan varius montes viverra nibh in adipiscing blandit tempus
              accumsan.
            </p>
            <hr />
            <h2>Heading Level 2</h2>
            <h3>Heading Level 3</h3>
            <h4>Heading Level 4</h4>
            <h5>Heading Level 5</h5>
            <h6>Heading Level 6</h6>
            <hr />
            <h5>Blockquote</h5>
            <blockquote>
              Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis
              sagittis eget tempus euismod. Vestibulum ante ipsum primis in
              faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat
              ac adipiscing accumsan faucibus. Vestibulum ante ipsum primis in
              faucibus lorem ipsum dolor sit amet nullam adipiscing eu felis.
            </blockquote>
            <h5>Preformatted</h5>
            <pre>
              <code>
                i = 0;
                {`
while (!deck.isInOrder()) {
    print 'Iteration ' + i;
    deck.shuffle();
    i++;
}`}
                print 'It took ' + i + ' iterations to sort the deck.';
              </code>
            </pre>
          </section>

          <section>
            <h4>Lists</h4>
            <div className="row">
              <div className="col-6 col-12-xsmall">
                <h5>Unordered</h5>
                <ul>
                  <li>Dolor pulvinar etiam magna etiam.</li>
                  <li>Sagittis adipiscing lorem eleifend.</li>
                  <li>Felis enim feugiat dolore viverra.</li>
                </ul>
                <h5>Alternate</h5>
                <ul className="alt">
                  <li>Dolor pulvinar etiam magna etiam.</li>
                  <li>Sagittis adipiscing lorem eleifend.</li>
                  <li>Felis enim feugiat dolore viverra.</li>
                </ul>
              </div>
              <div className="col-6 col-12-xsmall">
                <h5>Ordered</h5>
                <ol>
                  <li>Dolor pulvinar etiam magna etiam.</li>
                  <li>Etiam vel felis at lorem sed viverra.</li>
                  <li>Felis enim feugiat dolore viverra.</li>
                  <li>Dolor pulvinar etiam magna etiam.</li>
                  <li>Etiam vel felis at lorem sed viverra.</li>
                  <li>Felis enim feugiat dolore viverra.</li>
                </ol>
                <h5>Icons</h5>
                <ul className="icons">
                  <li>
                    <a href="#" className="icon brands fa-twitter">
                      <span className="label">Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icon brands fa-facebook-f">
                      <span className="label">Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icon brands fa-instagram">
                      <span className="label">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icon brands fa-github">
                      <span className="label">Github</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icon brands fa-dribbble">
                      <span className="label">Dribbble</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icon brands fa-tumblr">
                      <span className="label">Tumblr</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <h5>Actions</h5>
            <ul className="actions">
              <li>
                <a href="#" className="button primary">
                  Default
                </a>
              </li>
              <li>
                <a href="#" className="button">
                  Default
                </a>
              </li>
              <li>
                <a href="#" className="button alt">
                  Default
                </a>
              </li>
            </ul>
            <ul className="actions small">
              <li>
                <a href="#" className="button primary small">
                  Small
                </a>
              </li>
              <li>
                <a href="#" className="button small">
                  Small
                </a>
              </li>
              <li>
                <a href="#" className="button alt small">
                  Small
                </a>
              </li>
            </ul>
            <div className="row">
              <div className="col-3 col-6-medium col-12-xsmall">
                <ul className="actions stacked">
                  <li>
                    <a href="#" className="button primary">
                      Default
                    </a>
                  </li>
                  <li>
                    <a href="#" className="button">
                      Default
                    </a>
                  </li>
                  <li>
                    <a href="#" className="button alt">
                      Default
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-3 col-6 col-12-xsmall">
                <ul className="actions stacked">
                  <li>
                    <a href="#" className="button primary small">
                      Small
                    </a>
                  </li>
                  <li>
                    <a href="#" className="button small">
                      Small
                    </a>
                  </li>
                  <li>
                    <a href="#" className="button alt small">
                      Small
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-3 col-6-medium col-12-xsmall">
                <ul className="actions stacked">
                  <li>
                    <a href="#" className="button primary fit">
                      Default
                    </a>
                  </li>
                  <li>
                    <a href="#" className="button fit">
                      Default
                    </a>
                  </li>
                  <li>
                    <a href="#" className="button alt fit">
                      Default
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-3 col-6-medium col-12-xsmall">
                <ul className="actions stacked">
                  <li>
                    <a href="#" className="button primary small fit">
                      Small
                    </a>
                  </li>
                  <li>
                    <a href="#" className="button small fit">
                      Small
                    </a>
                  </li>
                  <li>
                    <a href="#" className="button alt small fit">
                      Small
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h4>Table</h4>
            <h5>Default</h5>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Item One</td>
                    <td>Ante turpis integer aliquet porttitor.</td>
                    <td>29.99</td>
                  </tr>
                  <tr>
                    <td>Item Two</td>
                    <td>Vis ac commodo adipiscing arcu aliquet.</td>
                    <td>19.99</td>
                  </tr>
                  <tr>
                    <td>Item Three</td>
                    <td> Morbi faucibus arcu accumsan lorem.</td>
                    <td>29.99</td>
                  </tr>
                  <tr>
                    <td>Item Four</td>
                    <td>Vitae integer tempus condimentum.</td>
                    <td>19.99</td>
                  </tr>
                  <tr>
                    <td>Item Five</td>
                    <td>Ante turpis integer aliquet porttitor.</td>
                    <td>29.99</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}></td>
                    <td>100.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <h5>Alternate</h5>
            <div className="table-wrapper">
              <table className="alt">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Item One</td>
                    <td>Ante turpis integer aliquet porttitor.</td>
                    <td>29.99</td>
                  </tr>
                  <tr>
                    <td>Item Two</td>
                    <td>Vis ac commodo adipiscing arcu aliquet.</td>
                    <td>19.99</td>
                  </tr>
                  <tr>
                    <td>Item Three</td>
                    <td> Morbi faucibus arcu accumsan lorem.</td>
                    <td>29.99</td>
                  </tr>
                  <tr>
                    <td>Item Four</td>
                    <td>Vitae integer tempus condimentum.</td>
                    <td>19.99</td>
                  </tr>
                  <tr>
                    <td>Item Five</td>
                    <td>Ante turpis integer aliquet porttitor.</td>
                    <td>29.99</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}></td>
                    <td>100.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          <section>
            <h4>Buttons</h4>
            <ul className="actions">
              <li>
                <a href="#" className="button primary">
                  Primary
                </a>
              </li>
              <li>
                <a href="#" className="button">
                  Default
                </a>
              </li>
              <li>
                <a href="#" className="button alt">
                  Alternate
                </a>
              </li>
            </ul>
            <ul className="actions">
              <li>
                <a href="#" className="button primary large">
                  Large
                </a>
              </li>
              <li>
                <a href="#" className="button">
                  Default
                </a>
              </li>
              <li>
                <a href="#" className="button alt small">
                  Small
                </a>
              </li>
            </ul>
            <ul className="actions fit">
              <li>
                <a href="#" className="button primary fit">
                  Fit
                </a>
              </li>
              <li>
                <a href="#" className="button fit">
                  Fit
                </a>
              </li>
              <li>
                <a href="#" className="button alt fit">
                  Fit
                </a>
              </li>
            </ul>
            <ul className="actions fit small">
              <li>
                <a href="#" className="button primary fit small">
                  Fit + Small
                </a>
              </li>
              <li>
                <a href="#" className="button fit small">
                  Fit + Small
                </a>
              </li>
              <li>
                <a href="#" className="button alt fit small">
                  Fit + Small
                </a>
              </li>
            </ul>
            <ul className="actions">
              <li>
                <a href="#" className="button primary icon solid fa-download">
                  Icon
                </a>
              </li>
              <li>
                <a href="#" className="button icon solid fa-download">
                  Icon
                </a>
              </li>
              <li>
                <a href="#" className="button alt icon solid fa-check">
                  Icon
                </a>
              </li>
            </ul>
            <ul className="actions">
              <li>
                <span className="button primary disabled">Primary</span>
              </li>
              <li>
                <span className="button disabled">Default</span>
              </li>
              <li>
                <span className="button alt disabled">Alternate</span>
              </li>
            </ul>
          </section>

          <section>
            <h4>Form</h4>
            <form method="post" action="#">
              <div className="row gtr-uniform">
                <div className="col-6 col-12-xsmall">
                  <input
                    type="text"
                    name="demo-name"
                    id="demo-name"
                    value=""
                    placeholder="Name"
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type="email"
                    name="demo-email"
                    id="demo-email"
                    value=""
                    placeholder="Email"
                  />
                </div>
                <div className="col-12">
                  <select name="demo-category" id="demo-category">
                    <option value="">- Category -</option>
                    <option value="1">Manufacturing</option>
                    <option value="1">Shipping</option>
                    <option value="1">Administration</option>
                    <option value="1">Human Resources</option>
                  </select>
                </div>
                <div className="col-4 col-12-medium">
                  <input
                    type="radio"
                    id="demo-priority-low"
                    name="demo-priority"
                    checked
                  />
                  <label htmlFor="demo-priority-low">Low Priority</label>
                </div>
                <div className="col-4 col-12-medium">
                  <input
                    type="radio"
                    id="demo-priority-normal"
                    name="demo-priority"
                  />
                  <label htmlFor="demo-priority-normal">Normal Priority</label>
                </div>
                <div className="col-4 col-12-medium">
                  <input
                    type="radio"
                    id="demo-priority-high"
                    name="demo-priority"
                  />
                  <label htmlFor="demo-priority-high">High Priority</label>
                </div>
                <div className="col-6 col-12-medium">
                  <input type="checkbox" id="demo-copy" name="demo-copy" />
                  <label htmlFor="demo-copy">
                    Email me a copy of this message
                  </label>
                </div>
                <div className="col-6 col-12-medium">
                  <input
                    type="checkbox"
                    id="demo-human"
                    name="demo-human"
                    checked
                  />
                  <label htmlFor="demo-human">
                    I am a human and not a robot
                  </label>
                </div>
                <div className="col-12">
                  <textarea
                    name="demo-message"
                    id="demo-message"
                    placeholder="Enter your message"
                    rows={6}
                  ></textarea>
                </div>
                <div className="col-12">
                  <ul className="actions">
                    <li>
                      <input type="submit" value="Send Message" />
                    </li>
                    <li>
                      <input type="reset" value="Reset" className="alt" />
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </section>

          <section>
            <h4>Image</h4>
            <h5>Fit</h5>
            <span className="image fit">
              <img src="images/banner.jpg" alt="" />
            </span>
            <div className="box alt">
              <div className="row gtr-50 gtr-uniform">
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic01.jpg" alt="" />
                  </span>
                </div>
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic02.jpg" alt="" />
                  </span>
                </div>
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic03.jpg" alt="" />
                  </span>
                </div>
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic02.jpg" alt="" />
                  </span>
                </div>
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic03.jpg" alt="" />
                  </span>
                </div>
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic01.jpg" alt="" />
                  </span>
                </div>
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic03.jpg" alt="" />
                  </span>
                </div>
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic01.jpg" alt="" />
                  </span>
                </div>
                <div className="col-4">
                  <span className="image fit">
                    <img src="images/pic02.jpg" alt="" />
                  </span>
                </div>
              </div>
            </div>
            <h5>Left &amp; Right</h5>
            <p>
              <span className="image left">
                <img src="images/avatar.jpg" alt="" />
              </span>
              Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis
              sagittis eget. tempus euismod. Vestibulum ante ipsum primis in
              faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat
              ac adipiscing accumsan eu faucibus. Integer ac pellentesque
              praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum
              ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu
              felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer
              ac pellentesque praesent. Donec accumsan interdum nisi, quis
              tincidunt felis sagittis eget. tempus euismod. Vestibulum ante
              ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis
              iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac
              pellentesque praesent tincidunt felis sagittis eget. tempus
              euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
              Blandit adipiscing eu felis iaculis volutpat ac adipiscing
              accumsan eu faucibus. Integer ac pellentesque praesent.
            </p>
            <p>
              <span className="image right">
                <img src="images/avatar.jpg" alt="" />
              </span>
              Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis
              sagittis eget. tempus euismod. Vestibulum ante ipsum primis in
              faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat
              ac adipiscing accumsan eu faucibus. Integer ac pellentesque
              praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum
              ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu
              felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer
              ac pellentesque praesent. Donec accumsan interdum nisi, quis
              tincidunt felis sagittis eget. tempus euismod. Vestibulum ante
              ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis
              iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac
              pellentesque praesent tincidunt felis sagittis eget. tempus
              euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
              Blandit adipiscing eu felis iaculis volutpat ac adipiscing
              accumsan eu faucibus. Integer ac pellentesque praesent.
            </p>
          </section>
        </div>
      </section>
*/}
    </>
  );
}
