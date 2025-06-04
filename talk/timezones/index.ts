import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
// import '../../public/3d-to-flat-animation/app.js';
// import '../../public/3d-to-flat-animation/three.js';

import './dist/reveal.css';
import './dist/theme/black.css';
import './dist/theme/devoxx-night.css';
import './plugin/highlight/dracula.css';

// <!-- <link rel="stylesheet" href="dist/theme/dracula.css" /> -->
// <!-- removed <link rel="stylesheet" href="dist/theme/night.css" />

// <link rel="stylesheet" href="dist/reveal.css" /> -->

// <!-- Theme used for syntax highlighted code -->
// <!-- <link rel="stylesheet" href="plugin/highlight/unikitty-light.css" /> -->

// <script src="plugin/notes/notes.js"></script>
// <script src="plugin/markdown/markdown.js"></script>
// <script src="plugin/highlight/highlight.js"></script>

let deck = new Reveal({
  hash: true,
  controls: true,
  showNotes: true,
  progress: false,
  autoPlayMedia: true,

  // Learn about plugins: https://revealjs.com/plugins/
  plugins: [Markdown, Highlight],
});
deck.initialize();
