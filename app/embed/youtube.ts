const YOUTUBE_PATTERN =
  /(.{2})?(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/;

function isYoutubeLink(link: string): boolean {
  const match = link.match(new RegExp(YOUTUBE_PATTERN, 'i'));

  return !!(match && match[1] !== '](' && match[2]);
}

function getYoutubeId(link: string): string | null {
  if (!isYoutubeLink(link)) {
    return null;
  }
  const matches = link.match(new RegExp(YOUTUBE_PATTERN, 'i'));

  return matches && matches[2];
}

function getYoutubeEmbedCode(
  id: string,
  width: number = 1440,
  height: number = 762
): string {
  return `
  <div class="youtube__embed-container">
  <iframe 
  class="youtube__embed-video"
  width="${width}" 
  height="${height}" 
  src="https://www.youtube-nocookie.com/embed/${id}" 
  frameborder="0" 
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>`;
}

export function embedMarkdownWithYoutubeHtml(text: string) {
  const matches = text.match(new RegExp(YOUTUBE_PATTERN, 'gim'));

  if (matches) {
    for (const match of matches) {
      if (isYoutubeLink(match)) {
        const id = getYoutubeId(match);
        if (id) {
          const embed = getYoutubeEmbedCode(id);
          text = text.replace(match, embed);
        }
      }
    }
  }
  return text;
}

export const testables = { isYoutubeLink, getYoutubeId };
