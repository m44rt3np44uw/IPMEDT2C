$(document).ready(function () {

    // Timeline ready
    $(document).on('timeline-ready', function () {

        var $topNav = $('#topNav'),
            $filter = $('.filter'),
            $sort   = $('.sort');

        function hide() {
            $topNav.animate({
                top: "-60px"
            }, 400);

            $filter.animate({
                right: "-75px",
                bottom: "-75px"
            });

            $sort.animate({
                right: "-75px",
                bottom: "-75px"
            });
        }

        function show() {
            $topNav.animate({
                top: "0"
            }, 1300);

            $filter.animate({
                right: "25px",
                bottom: "25px"
            });

            $sort.animate({
                right: "100px",
                bottom: "25px"
            });
        }

        function init() {
            // Scroll weg van homepage direct naar tijdlijn
            $('#fullpage').fullpage({
                scrollOverflow: true,
                normalScrollElements: '#tijdlijnSection',
                scrollOverflowOptions: {click: false },

                    //voor de bovennav die tevoorschijn komt bij de tweede sectie
                onLeave: function (index, nextIndex, direction) {

                    //after leaving section 1
                    if (index == 1 && direction == 'down') {
                        show();
                    }
                    else if (index == 2 && direction == 'up') {
                        hide();
                    }
                }
            });
        }

        // Initialize.
        init();

        // Scroll de pagina terug omhoog.
        $('.ga-omhoog').on('click', function () {

            // Scroll omhoog.
            $.fn.fullpage.destroy('all');

            // Verberg.
            hide();

            // Reset filter.
            resetFilter(true);

            // Init opnieuws
            init();
        });

        // Scroll een section naar beneden als er op de "Scroll om verder te gaan" tekst wordt geklikt.
        $('#bottomText').on('click', function() {
            $.fn.fullpage.moveSectionDown();
        });
    });

});
