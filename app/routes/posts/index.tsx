import { Link, useLoaderData } from '@remix-run/react';
import { getPosts } from '~/post';
import type { Post } from '~/post';
import cn from 'classnames';

export const loader = () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <div>
      <section id="blog">
        <div className="container">
          <header className="major">
            <h2>Posts</h2>
          </header>
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
              >
                <h3>
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.emphasis && <p>{post.emphasis}</p>}

                <Link to={`/posts/${post.slug}`} className="button primary">
                  Read post
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
