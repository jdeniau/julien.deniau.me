import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { marked } from 'marked';
import { Octokit } from '@octokit/rest';
import { embedMarkdown } from './embed';

const octokit = new Octokit({
  auth: typeof process !== 'undefined' ? process.env.GITHUB_TOKEN : '', // weirdly needed by the RSS page. Probably an issue with remix
});

const BRANCHNAME =
  typeof process !== 'undefined'
    ? (process.env.GIT_BRANCH ?? process.env.VERCEL_GIT_COMMIT_REF ?? 'main')
    : 'main';

export type Post = {
  title: string;
  slug: string;
  date: Date;
  icon?: string;
  emphasis?: string;
  image?: string;
  imageCredit?: string;
  lang?: string;
  blueskyUri?: string;
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

const POST_DIRS = ['posts', 'posts-nuclino'] as const;

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

async function listPostsInDir(dir: string): Promise<Post[]> {
  let dirResponse;
  try {
    dirResponse = await octokit.rest.repos.getContent({
      owner: 'jdeniau',
      repo: 'julien.deniau.me',
      path: dir,
      ref: BRANCHNAME,
    });
  } catch (err) {
    if ((err as { status?: number }).status === 404) {
      return [];
    }
    throw err;
  }

  invariant(
    Array.isArray(dirResponse.data),
    'dirResponse.data is not an array'
  );

  return Promise.all(
    dirResponse.data
      .filter((file) => file.name.endsWith('.md'))
      .map(async (file): Promise<Post> => {
        const { attributes } = await getPostContent(file.path);

        return {
          ...convertAttributes(attributes),
          slug: file.name.replace(/\.md$/, ''),
        };
      })
  );
}

export async function getPosts() {
  const lists = await Promise.all(POST_DIRS.map(listPostsInDir));
  const all = lists.flat();
  all.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return all;
}

export async function getPost(slug: string): Promise<PostWithHTML> {
  let attributes: Post | undefined;
  let body: string | undefined;
  for (const dir of POST_DIRS) {
    try {
      ({ attributes, body } = await getPostContent(`/${dir}/${slug}.md`));
      break;
    } catch (err) {
      if ((err as { status?: number }).status === 404) {
        continue;
      }
      throw err;
    }
  }
  invariant(attributes && body !== undefined, `Post ${slug} not found`);

  const html = marked(await embedMarkdown(body));

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
