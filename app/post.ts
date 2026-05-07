import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { marked } from 'marked';
import { embedMarkdown } from './embed';

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

const postModules = {
  ...(import.meta.glob('/posts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }) as Record<string, string>),
  ...(import.meta.glob('/posts-nuclino/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }) as Record<string, string>),
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
      return false;
    } else {
      attributes.date = new Date(attributes.date);
    }
  }

  return true;
}

function slugFromPath(filePath: string): string {
  const file = filePath.split('/').pop() ?? filePath;
  return file.replace(/\.md$/, '');
}

function readPost(filePath: string, raw: string): {
  attributes: Post;
  body: string;
} {
  const { attributes, body } = parseFrontMatter(raw);
  invariant(
    isValidPostAttributes(attributes),
    `Post ${filePath} is missing attributes`
  );
  return { attributes, body };
}

export async function getPosts(): Promise<Post[]> {
  const posts = Object.entries(postModules).map(([filePath, raw]): Post => {
    const { attributes } = readPost(filePath, raw);
    return {
      ...convertAttributes(attributes),
      slug: slugFromPath(filePath),
    };
  });

  posts.sort((a, b) => +b.date - +a.date);
  return posts;
}

export async function getPost(slug: string): Promise<PostWithHTML> {
  const entry = Object.entries(postModules).find(
    ([filePath]) => slugFromPath(filePath) === slug
  );
  invariant(entry, `Post ${slug} not found`);

  const [filePath, raw] = entry;
  const { attributes, body } = readPost(filePath, raw);
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
