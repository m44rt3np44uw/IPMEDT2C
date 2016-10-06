$(document).ready(function() {
    // Scroll weg van homepage direct naar tijdlijn
    $('#fullpage').fullpage({
        scrollOverflow: true,
        normalScrollElements: '#tijdlijnSection'
    });
});