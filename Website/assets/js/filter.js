// Als de tijdlijn geladen is.
$(document).on('timeline-ready', function () {

    // Als de filter geklikt wordt.
    $('.filter').on('click', function () {
        resetFilter(false);
    });

    $('.sort').on('click', function() {
        var ascending = $(this).attr('data-ascending');
        sortArticles(data, ascending);
        $(this).attr('data-ascending', (ascending !== 'true'));
    });
});

function sortArticles(data, ascending) {

    ascending = (ascending !== 'true');

    // Remove
    $('.cd-timeline-block').fadeOut("slow", function() {

        // Verwijder de inhoud.
        $('#Tijdlijn').html('');

        // Add first
        if(ascending) {
            addFirst('white-house');
        } else  {
            addFirst('route')
        }

        var new_data = {};

        if(ascending) {
            for(var i = Object.keys(data).length - 1; i >= 0; i--) {
              new_data["id" + i] = (data["id" + i]);
            }
        }

        // Add the new articles.
        if(ascending) {
            addArticles(new_data, false);
        } else {
            addArticles(data, false);
        }

        // Add last.
        if(ascending) {
            addLast('route');
        } else {
            addLast('white-house');
        }

        doClick();
    });
}

function resetFilter(makeVisible) {

    // Haal alle items op.
    var $items = $('.cd-timeline-block');

    // Loop door alle items heen.
    $.when($.each($items, function (index, item) {

        if ($(item).is(':hidden') || makeVisible) {
            if ($(item).hasClass('filter-trump') || $(item).hasClass('filter-clinton')) {
                $(item).fadeIn();
            }
        } else {
            if ($(item).hasClass('filter-trump') || $(item).hasClass('filter-clinton')) {
                $(item).fadeOut();
            }
        }
    })).then(function () {
        $(document).trigger('timeline-filtered');
    });

    // Rebuild
    $(document).on('timeline-filtered', function () {
        $.fn.fullpage.reBuild(true);
    });
}