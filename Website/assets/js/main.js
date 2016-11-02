$(document).ready(function () {

    // Timeline ready
    $(document).on('timeline-ready', function () {

        // Scroll weg van homepage direct naar tijdlijn
        $('#fullpage').fullpage({
            scrollOverflow: true,
            normalScrollElements: '#tijdlijnSection',

            //voor de bovennav die tevoorschijn komt bij de tweede sectie
            onLeave: function (index, nextIndex, direction) {
                var leavingSection = $(this);

                //after leaving section 1
                if (index == 1 && direction == 'down') {
                    $("#topNav").animate({
                        top: "0"
                    }, 1300);

                    $('.filter').animate({
                        right: "25px",
                        bottom: "25px"
                    });
                }
                else if (index == 2 && direction == 'up') {
                    $("#topNav").animate({
                        top: "-60px"
                    }, 400);

                    $('.filter').animate({
                        right: "-75px",
                        bottom: "-75px"
                    });
                }
            }
        });

        // Scroll de pagina terug omhoog.
        $('.ga-omhoog').on('click', function () {

            // Scroll omhoog.
            // TODO: tijdelijk
            location.reload();

        });
    });

});
