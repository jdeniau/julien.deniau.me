import { useLoaderData } from '@remix-run/react';
import type { MetaFunction, LoaderFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { getPost } from '~/post';
import type { PostWithHTML } from '~/post';
import styles from '~/styles/posts/$slug.css';
import hljs from 'highlight.js';
import { useEffect, useState } from 'react';
// import highligtStyle from 'highlight.js/styles/base16/dracula.css';
import highligtStyle from '~/styles/highlight-dracula.css';
import { uri } from '~/url';
import { formatDate } from '~/date';
import { useHasShare } from '../../hooks/useHasShare';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'stylesheet',
      href: highligtStyle,
    },
  ];
}

export const meta: MetaFunction = ({ data }: { data: PostWithHTML }) => {
  const { title, date, image, slug, emphasis } = data;

  return {
    title: title,
    description: emphasis ?? '',
    'og:image': image ? uri(image) : '',
    // 'og:locale': 'fr_FR',
    'og:title': title,
    'og:description': emphasis ?? '',
    'og:url': uri(`/posts/${slug}`),
    'og:type': 'article',
    'article:published_time': formatDate(date),
    'article:author,': 'Julien Deniau',
    // 'og:article:section': 'Technology',
    'twitter:card': 'summary',
    'twitter:creator': '@j_deniau',
  };
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
    </>
  );
}
