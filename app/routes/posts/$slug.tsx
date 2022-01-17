import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';
import { getPost } from '~/post';
import styles from '~/styles/posts/$slug.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected params.slug');
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();

  return (
    <>
      {post.image && (
        <div
          className="post__image"
          style={{
            backgroundImage: 'url(/images/2022-01-mapado-semaine-4-jours.jpg)',
          }}
        >
          {post.imageCredit && (
            <span
              className="post__image-credit"
              dangerouslySetInnerHTML={{ __html: post.imageCredit }}
            />
          )}
        </div>
      )}

      <div className="post">
        <h1>{post.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </>
  );
}
