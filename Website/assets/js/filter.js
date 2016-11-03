// Als de tijdlijn geladen is.
$(document).on('timeline-ready', function() {

    // Als de filter geklikt wordt.
    $('.filter').on('click', function() {

        // Haal alle items op.
        var $items = $('.cd-timeline-block');

        // Loop door alle items heen.
        $.each($items, function(index, item) {

            if($(item).is(':visible')) {
                if($(item).hasClass('filter-trump') || $(item).hasClass('filter-clinton')) {
                    $(item).fadeOut();
                }
            } else {
                if($(item).hasClass('filter-trump') || $(item).hasClass('filter-clinton')) {
                    $(item).fadeIn();
                }
            }
        });

        // Pas de hoogte aan.
        $.fn.fullpage.reBuild();
    });
});