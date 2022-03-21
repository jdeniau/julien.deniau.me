import { testables } from './youtube';

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
