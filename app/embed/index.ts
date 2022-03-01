import { embedMarkdownWithTweeterHtml } from './twitter';
import { embedMarkdownWithYoutubeHtml } from './youtube';

export async function embedMarkdown(text: string): Promise<string> {
  return await embedMarkdownWithTweeterHtml(embedMarkdownWithYoutubeHtml(text));
}
