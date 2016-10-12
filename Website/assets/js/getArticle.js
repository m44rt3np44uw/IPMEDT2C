var datum;
var image;
var headline;
var article;
var person;
var medium;
$(document).ready(function () {

    $("#Tijdlijn").delegate("a", "click", function () {
        var currentId = $(this).attr("data-id");

        search(currentId);

        //open popup

        //laad artikel in popup dmv id

        //laad foto's enzovoort...

    });
});

function search(currentId) {
    var deGoedeID = false;
    $.getJSON("assets/test.json", function (data) {
        $.each(data, function () {
            $.each(this, function () {
                $.each(this, function (key, val) {
                    if (key == "id") {
                        //als de goede id gevonden is in het JSON file
                        if(currentId == val){
                            deGoedeID = true;
                        }
                    }
                    if (deGoedeID){
                        // waardes inladen naar variables
                        switch (key){
                            case "date":
                                datum = val;
                                break;
                            case "src":
                                image = val;
                                break;
                            case "koptext":
                                headline = val;
                                break;
                            case "subtext":
                                article = val;
                                break;
                            case "from":
                                person = val;
                                break;
                            case "kind":
                                medium = val;
                                deGoedeID = false;
                                break;

                            //bron nog toevoegen
                        }
                    }
                });
            });
        });

    });
}
