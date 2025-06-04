import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealNotes from 'reveal.js/plugin/notes/notes';

let deck = new Reveal({
  // enable hash navigation
  hash: true,

  // do not display a presentation progress bar
  progress: false,

  // display slide numbers, but only for the speaker
  slideNumber: true,
  showSlideNumber: 'speaker',

  // activate controls only for the speaker
  // @ts-expect-error -- until https://github.com/DefinitelyTyped/DefinitelyTyped/pull/72951 is merged
  controls: 'speaker-only',

  // Global override for autolaying embedded media (video/audio/iframe)
  // - null:   Media will only autoplay if data-autoplay is present
  // - true:   All media will autoplay, regardless of individual setting
  // - false:  No media will autoplay, regardless of individual setting
  autoPlayMedia: null,

  // activate plugins
  plugins: [
    // syntax highlighting
    Highlight,
    // markdown support
    RevealMarkdown,
    // speaker notes
    RevealNotes,
  ],
  // enable notes on build to publish to the web
  showNotes: process.env.NODE_ENV === 'production',
});

export default deck;
