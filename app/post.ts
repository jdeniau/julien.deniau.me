import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { marked } from 'marked';
import { Octokit } from '@octokit/rest';
import { embedMarkdownWithTweeterHtml } from './twitter';

const octokit = new Octokit({
  auth: typeof process !== 'undefined' ? process.env.GITHUB_TOKEN : '', // weirdly needed by the RSS page. Probably an issue with remix
});

const BRANCHNAME =
  typeof process !== 'undefined'
    ? process.env.GIT_BRANCH ?? process.env.VERCEL_GIT_COMMIT_REF ?? 'main'
    : 'main';

export type Post = {
  title: string;
  slug: string;
  date: Date;
  icon?: string;
  emphasis?: string;
  image?: string;
  imageCredit?: string;
};

export type PostWithHTML = Post & {
  html: string;
};

function isValidPostAttributes(attributes: any): attributes is Post {
  if (!attributes?.title) {
    return false;
  }

  if (!attributes?.date) {
    return false;
  }

  if (!(attributes.date instanceof Date)) {
    if (!attributes.date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
      // wrong date pattern
      return false;
    } else {
      attributes.date = new Date(attributes.date);
    }
  }

  return true;
}

async function getPostContent(path: string): Promise<{
  attributes: Post;
  body: string;
}> {
  const fileResponse = await octokit.rest.repos.getContent({
    owner: 'jdeniau',
    repo: 'julien.deniau.me',
    path: path,
    ref: BRANCHNAME,
    headers: {
      accept: 'application/vnd.github.v3.raw',
    },
  });

  invariant(
    typeof fileResponse.data === 'string',
    'fileResponse.data is not a string'
  );

  const { attributes, body } = parseFrontMatter(fileResponse.data);
  invariant(
    isValidPostAttributes(attributes),
    `Post ${path} is missing attributes`
  );

  return { attributes, body };
}

export async function getPosts() {
  const dirResponse = await octokit.rest.repos.getContent({
    owner: 'jdeniau',
    repo: 'julien.deniau.me',
    path: 'posts',
    ref: BRANCHNAME,
  });

  invariant(
    Array.isArray(dirResponse.data),
    'dirResponse.data is not an array'
  );

  return Promise.all(
    dirResponse.data
      .map(async (file): Promise<Post> => {
        const { attributes } = await getPostContent(file.path);

        return {
          ...convertAttributes(attributes),
          slug: file.name.replace(/\.md$/, ''),
        };
      })
      .reverse()
  );
}

export async function getPost(slug: string): Promise<PostWithHTML> {
  const { attributes, body } = await getPostContent(`/posts/${slug}.md`);

  const html = marked(await embedMarkdownWithTweeterHtml(body));

  return {
    ...convertAttributes(attributes),
    slug,
    html,
  };
}

const convertAttributes = (attributes: any): Omit<Post, 'slug'> => {
  const { imageCredit, ...attributesRest } = attributes;

  return {
    ...attributesRest,
    imageCredit: imageCredit ? marked(imageCredit) : undefined,
  };
};
