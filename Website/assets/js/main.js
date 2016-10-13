$(document).ready(function() {
    // Scroll weg van homepage direct naar tijdlijn
    $('#fullpage').fullpage({
        scrollOverflow: true,
        normalScrollElements: '#tijdlijnSection',

        //voor de bovennav die tevoorschijn komt bij de tweede sectie
        onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);

            //after leaving section 1
            if(index == 1 && direction =='down'){
                $( "#topNav" ).animate({
                    top: "0"
                }, 600 );
            }
            else if(index == 2 && direction == 'up'){
                $( "#topNav" ).animate({
                    top: "-45px"
                }, 600 );
            }
        }
    });
});