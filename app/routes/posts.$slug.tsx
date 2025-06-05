import { useLoaderData } from '@remix-run/react';
import type { MetaFunction, LoaderFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { BlueskyComments } from 'bluesky-comments';
import { getPost } from '../post';
import type { PostWithHTML } from '../post';
import styles from '../styles/posts/$slug.css?url';
import hljs from 'highlight.js';
import { useEffect, useState } from 'react';
// import highligtStyle from 'highlight.js/styles/base16/dracula.css?url';
import highligtStyle from '../styles/highlight-dracula.css?url';
import blueskyComments from 'bluesky-comments/bluesky-comments.css?url';
import { uri } from '../url';
import { formatDate } from '../date';
import { useHasShare } from '../hooks/useHasShare';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'stylesheet',
      href: highligtStyle,
    },
    { rel: 'stylesheet', href: blueskyComments },
  ];
}

export const meta: MetaFunction = ({ data }: { data: PostWithHTML }) => {
  const { title, date, image, slug, emphasis } = data;

  return [
    { title },
    { name: 'description', content: emphasis ?? '' },
    { property: 'og:image', content: image ? uri(image) : '' },
    // { property: 'og:locale', content: 'fr_FR',},
    { property: 'og:title', content: title },
    { property: 'og:description', content: emphasis ?? '' },
    { property: 'og:url', content: uri(`/posts/${slug}`) },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: formatDate(date) },
    { property: 'article:author,', content: 'Julien Deniau' },
    // { property: 'og:article:section', content: 'Technology',},
    { property: 'twitter:card', content: 'summary' },
    { property: 'twitter:creator', content: '@j_deniau' },
  ];
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<PostWithHTML> => {
  invariant(params.slug, 'expected params.slug');

  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData<PostWithHTML>();

  const [localeDate, setLocaleDate] = useState<string | Date>();
  const hasShare = useHasShare();
  useEffect(() => {
    setLocaleDate(post.date);
  }, [post.date]);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const author = 'julien.deniau.me';

  return (
    <>
      {post.image && (
        <aside
          className="post__image"
          style={{
            backgroundImage: `url(${post.image})`,
          }}
        >
          {post.imageCredit && (
            <span
              className="post__image-credit"
              dangerouslySetInnerHTML={{ __html: post.imageCredit }}
            />
          )}
        </aside>
      )}

      <article className="post" lang={post.lang}>
        <h1 className="post__title">
          {post.title}

          {hasShare && (
            <a
              href="#share"
              className="post__share icon solid fa-share-alt"
              title="Share"
              onClick={(e) => {
                e.preventDefault();

                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.emphasis,
                    url: uri(`/posts/${post.slug}`),
                  });
                }
              }}
            ></a>
          )}
        </h1>

        {localeDate && (
          <div className="post__date">{formatDate(localeDate)}</div>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <BlueskyComments author="julien.deniau.me" uri={post.blueskyUri} />
    </>
  );
}
