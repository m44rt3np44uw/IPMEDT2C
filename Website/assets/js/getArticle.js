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
                        if(key == "date"){
                            console.log(val);
                            deGoedeID = false;
                        }
                        //ook voor text en hoofdtext en images enzovoort
                    }
                });
            });
        });

    });
}