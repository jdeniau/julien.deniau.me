/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['1025px', '1280px'],
    medium: ['737px', '1024px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px'],
  });

  // Play initial animations on page load.
  // $window.on('load', function () {
  //   window.setTimeout(function () {
  //     $body.removeClass('is-preload');
  //   }, 100);
  // });

  document.body.classList.remove('is-preload');

  // Tweaks/fixes.

  // Polyfill: Object fit.
  // if (!browser.canUse('object-fit')) {
  //   $('.image[data-position]').each(function () {
  //     var $this = $(this),
  //       $img = $this.children('img');

  //     // Apply img as background.
  //     $this
  //       .css('background-image', 'url("' + $img.attr('src') + '")')
  //       .css('background-position', $this.data('position'))
  //       .css('background-size', 'cover')
  //       .css('background-repeat', 'no-repeat');

  //     // Hide img.
  //     $img.css('opacity', '0');
  //   });
  // }

  // Header Panel.

  // Nav.
  const sections = document.querySelectorAll('section[id]');

  let navLocked = false;

  const options = {
    // threshold: 0.5,
    rootMargin: '0px 0px -200px 0px',
  };

  function deactivateAllLinks() {
    document.querySelectorAll(`#nav a`).forEach((link) => {
      link.classList.remove('active');
    });
  }

  observer = new IntersectionObserver((entries) => {
    if (navLocked) {
      return;
    }

    entries.forEach((entry) => {
      const id = entry.target.attributes.id.value;
      const link = document.querySelector(`#nav a[href$="#${id}"]`);
      if (!link) {
        return;
      }

      if (entry.isIntersecting) {
        // activate link when in viewport
        deactivateAllLinks();
        link.classList.add('active');
      } else {
        // change link when going out of viewport
        link.classList.remove('active');
        if (entry.boundingClientRect.y > 0) {
          // scrolling up
          link.parentElement.previousSibling
            ?.querySelector('a')
            .classList.add('active');
        } else if (entry.boundingClientRect.y < 0) {
          link.parentElement.nextSibling
            ?.querySelector('a')
            .classList.add('active');
        }
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });

  document.querySelectorAll('#nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const matches = id.match(/(.*)#(.*)$/);
      if (matches && (id[0] === '#' || location.pathname === matches[1])) {
        e.preventDefault();

        deactivateAllLinks();
        link.classList.add('active');
        navLocked = true;

        const section = document.getElementById(matches[2]);
        section.scrollIntoView({
          behavior: 'smooth',
          // block: 'start',
        });
      } else {
        navLocked = false;
      }
    });
  });
})();
