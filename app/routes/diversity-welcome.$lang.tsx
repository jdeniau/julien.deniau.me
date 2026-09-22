import { useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { getDiveristyMessage, type DiversityContent } from '../diversity';

export const loader: LoaderFunction = async ({
  params,
}): Promise<DiversityContent> => {
  invariant(params.lang, 'Missing lang parameter');

  try {
    return await getDiveristyMessage(params.lang);
  } catch {
    // return a 404 error
    throw new Response('Not Found', { status: 404 });
  }
};

export default function DiversityWelcome(): JSX.Element {
  const { attributes, html } = useLoaderData<DiversityContent>();

  return (
    <div className="container">
      <header className="major">
        <h2>{attributes.title}</h2>
      </header>
      <hr />

      <p dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
