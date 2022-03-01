import invariant from 'tiny-invariant';

async function embedTweet(tweetUrl: string): Promise<string> {
  const response = await fetch(
    `https://publish.twitter.com/oembed?dnt=1&url=${tweetUrl}`
  );
  const data = await response.json();

  invariant(
    typeof data.html === 'string',
    'tweeter response html is not a string'
  );

  return data.html;
}

export async function embedMarkdownWithTweeterHtml(text: string) {
  // text =
  //   text +
  //   ' another tweet https://twitter.com/j_nieuviarts/status/1490689892422148096 bye';
  // TODO : handle multiple tweets
  const tweeterRegex = /https:\/\/twitter.com\/[^/]+\/status\/(?:[^\s]+)/;
  const matches = text.match(tweeterRegex);

  if (matches) {
    for (const match of matches) {
      const embeddedTweet = await embedTweet(match);

      text = text.replace(match, embeddedTweet);
    }
  }

  return text;
}
