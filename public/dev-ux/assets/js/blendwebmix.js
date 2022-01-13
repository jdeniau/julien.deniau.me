Reveal.addEventListener('newsletter', function () {
    $.albox({ url: 'assets/newsletter.html' });
});

$(document).keydown(function(event) {
    if (Albox.instance && (event.keyCode == 65 || event.keyCode == 67)) {
        Albox.instance.close();
    }
});

Reveal.addEventListener('presentation-title', function () {
    var timeout = 800;

    $('.present .current-custom-fragment').removeClass('current-custom-fragment');
    $('.present .custom-fragment').first().addClass('current-custom-fragment');

    var nextFragment = function() {
        var cur = $('.presentation-title .custom-fragment.current-custom-fragment');
        var next = $(cur).next('.custom-fragment');

        if ($(next).length > 0) {
            $(cur).removeClass('current-custom-fragment');
            $(next).addClass('current-custom-fragment');
        }

        timeout = timeout * 2 / 3;

        return next;
    };

    callback = function () {
        var next = nextFragment();
        if ($(next).length > 0) {
            window.setTimeout(callback, timeout);
        }
    };

    window.setTimeout(callback, timeout);
});

Reveal.addEventListener('slidechanged', function (event) {
    var toggleFragments = $(event.currentSlide).find('.toggle-fragment');
    toggleFragments.addClass('fragment');
});

Reveal.addEventListener('slidechanged', function (event) {
    $(event.currentSlide).find('[data-fade-to]').each(function (i, item) {
        var oi = $(item).find('img');
        oi.addClass('fade');

        setTimeout(function() {
            $(item)
                .height($(item).height())
                .width($(item).width())
            ;
            var ni = $('<img />').attr('src', $(item).attr('data-fade-to'))
                .addClass('fade-new')
                .css({ 'margin-left': oi.css('margin-left') })
            ;
            oi.fadeOut('slow');
            $(item).append(ni);
        }, 2000);

    });
});

$(function() {
    //$(document).on('contextmenu', function(e) {
    //    e.preventDefault();

    //    Reveal.next();

    //    return false;
    //});
});
