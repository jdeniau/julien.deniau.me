const YOUTUBE_PATTERN =
  /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/i;

export function isYoutubeLink(link: string): boolean {
  return !!link.match(YOUTUBE_PATTERN);
}

export function getYoutubeId(link: string): string | null {
  if (!isYoutubeLink(link)) {
    return null;
  }
  const matches = link.match(YOUTUBE_PATTERN);

  return matches && matches[1];
}

export function getYoutubeEmbedCode(
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
  const matches = text.match(YOUTUBE_PATTERN);

  if (matches) {
    for (const match of matches) {
      const id = getYoutubeId(match);
      if (id) {
        const embed = getYoutubeEmbedCode(id);
        text = text.replace(match, embed);
      }
    }
  }
  return text;
}
