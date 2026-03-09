import fs from 'node:fs/promises';
import path from 'node:path';
import parseFrontMatter from 'front-matter';
import { marked } from 'marked';
import { embedMarkdown } from './embed';
import invariant from 'tiny-invariant';

type Attributes = { title: string };

export type DiversityContent = {
  html: string;
  attributes: Attributes;
};

function isValidAttributes(attributes: any): attributes is Attributes {
  if (!attributes?.title) {
    return false;
  }

  return true;
}

async function getMarkdownContent(filePath: string): Promise<string> {
  const fileContent = await fs.readFile(
    path.join(import.meta.dirname, filePath),
    'utf-8'
  );

  return fileContent;
}

export async function getDiveristyMessage(
  lang: string
): Promise<DiversityContent> {
  const content = await getMarkdownContent(`/diversity/${lang}.md`);

  const { attributes, body } = parseFrontMatter(content);

  invariant(isValidAttributes(attributes), 'Missing attributes');

  const html = marked(await embedMarkdown(body));

  return {
    attributes,
    html,
  };
}
