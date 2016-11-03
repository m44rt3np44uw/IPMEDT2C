// Als de tijdlijn geladen is.
$(document).on('timeline-ready', function() {

    // Als de filter geklikt wordt.
    $('.filter').on('click', function() {
        resetFilter(false);
    });
});

function resetFilter(makeVisible) {

    // Haal alle items op.
    var $items = $('.cd-timeline-block');

    // Loop door alle items heen.
    $.when($.each($items, function(index, item) {

        if($(item).is(':hidden') || makeVisible) {
            if($(item).hasClass('filter-trump') || $(item).hasClass('filter-clinton')) {
                $(item).fadeIn();
            }
        } else {
            if($(item).hasClass('filter-trump') || $(item).hasClass('filter-clinton')) {
                $(item).fadeOut();
            }
        }
    })).then(function() {
        $(document).trigger('timeline-filtered');
    });

    // Rebuild
    $(document).on('timeline-filtered', function () {
        $.fn.fullpage.reBuild(true);
    });
}