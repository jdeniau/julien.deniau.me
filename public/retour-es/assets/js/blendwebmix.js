$(document).keydown(function(event) {
    if (Albox.instance && (event.keyCode == 65 || event.keyCode == 67)) {
        Albox.instance.close();
    }
});
