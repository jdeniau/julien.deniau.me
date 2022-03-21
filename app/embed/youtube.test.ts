import { testables, embedMarkdownWithYoutubeHtml } from './youtube';

const { isYoutubeLink, getYoutubeId } = testables;

describe('youtube pattern', () => {
  test.each([
    ['https://youtu.be/Phty0m6vvHA'],
    ['https://www.youtube.com/watch?v=JmghDKkeiik'],
    ['youtube : https://www.youtube.com/watch?v=JmghDKkeiik&feature=youtu.be'],
  ])('should match youtube links', (link) => {
    expect(isYoutubeLink(link)).toBeTruthy();
  });

  test('should not match youtube link inside a markdown link', () => {
    const link = '[bref.](https://www.youtube.com/watch?v=JmghDKkeiik)';
    expect(isYoutubeLink(link)).toBeFalsy();
  });
});

describe('get youtube id', () => {
  test.each([
    ['https://youtu.be/JmghDKkeiik'],
    ['https://www.youtube.com/watch?v=JmghDKkeiik'],
    ['youtube : https://www.youtube.com/watch?v=JmghDKkeiik&feature=youtu.be'],
  ])('should match youtube links', (link) => {
    expect(getYoutubeId(link)).toBe('JmghDKkeiik');
  });
  test('should not get an id for a  youtube link inside a markdown link', () => {
    expect(
      getYoutubeId('[bref.](https://www.youtube.com/watch?v=JmghDKkeiik)')
    ).toBeNull();
  });
});

describe('embedMarkdownWithYoutubeHtml', () => {
  test('embedMarkdownWithYoutubeHtml', () => {
    expect(embedMarkdownWithYoutubeHtml(`https://youtu.be/Phty0m6vvHA`)).toBe(
      `
  <div class=\"youtube__embed-container\">
  <iframe 
  class=\"youtube__embed-video\"
  width=\"1440\" 
  height=\"762\" 
  src=\"https://www.youtube-nocookie.com/embed/Phty0m6vvHA\" 
  frameborder=\"0\" 
  allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>
  </div>`
    );
  });
});
