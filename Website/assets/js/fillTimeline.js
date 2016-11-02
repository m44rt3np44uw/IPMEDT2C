$(document).ready(function () {
    moment.locale('nl');

    dagOld = 0;
    from = 0;
    idOld = 0;

    //eerste
    $('#Tijdlijn').append("<div class='" + "cd-timeline-block first" + "'>" +
        "<div class='cd-timeline-img first'></div>" +
        "</div>");

    //artikelen
    $.when($.each(data, function (key, value) {
        fill("id" + value.id);
    })).then(function () {
        $(document).trigger('timeline-ready');
    });

    //laatste
    $('#Tijdlijn').append("<div class='" + "cd-timeline-block last" + "'>" +
        "<div class='cd-timeline-img last'></div>" +
        "</div>");

    $("#Tijdlijn").delegate("a", "click", function () {
        var currentId = $(this).attr("data-id");

        //haal alle variabelen op uit de file
        getDag(currentId);
        getText(currentId);
        getKind(currentId);
        getSrc(currentId);
        getFrom(currentId);

        // hier word de pop-up in de html toegevoegd
        $("body").prepend(
            $("<div id='modal'>" + fill_popup() + "</div>").hide().fadeIn('slow')
        );

        if (from == 'Clinton') {
            console.log("2")
            $(".modal-article").find("h1").css("color", "#3598db");
        } else if (from == 'Trump') {
            console.log("1")
            $(".modal-article").find("h1").css("color", "#e74d3d");
        } else {
            //veranderen?
            console.log("3")
            $(".modal-article").find("h1").css("color", "grey");
        }

        // hier word de pop-up met content gevuld
        function fill_popup() {
            var string = $("#modal").innerHTML =
                "<div class='modal-content'>" +
                "<span class='close'>x</span>" +
                "<img src='" + src + "' />" +
                "<div class='modal-article'> " +
                "<h1>" + koptext + "</h1>" +
                "<p>" + subtext + "</p>" +
                "</div>" +
                "</div>";
            return string;
        }


        // Close Pop-up

        $("#modal").click(handler).find("#modal");
        $("#modal").click(handler).find(".close");

        function handler(event) {
            var target = $(event.target);
            if (target.is(".close")) {
                $("#modal").fadeOut(300, function () {
                    $(this).remove()
                });
            }
            else if (target.is("#modal") && target != $(".modal-content")) {
                $("#modal").fadeOut(300, function () {
                    $(this).remove()
                });
            }
        }


        // $("#modal").click('blur', function() {
        //    $(this).fadeOut(300);
        // });
        //
        // $(".close").click( function() {
        //     $("#modal").remove();
        // })
    });
});

//vul de tijdlijn
function fill(id) {
    getDag(id);
    getText(id);
    getKind(id);
    getSrc(id);
    getFrom(id);

    var items = [];

    items.push("<div class='" + "cd-timeline-block" + "'>" +
        "<div class='" + "cd-timeline-img " + kind + " " + from + "'></div>" +
        "<div class='" + "cd-timeline-content " + from + "'>" +
        "<div class='imageding'>" +
        "<img class='artikelimg' src='" + src + "' />" +
        "</div>" +
        "<h2 class='" + "kop" + from + "'>" + koptext + "</h2>" +
        "<p>" + subtext + "</p>" +
        "<a data-id='" + id + "' class='" + "cd-read-more btn icon-boek" + "'><span>Lees meer</span></a>" +
        "<span class='" + "cd-date" + "'>" + moment(date, "DD-MM-YYYY").format("LL") + "</span>" +
        "</div>" +
        "</div>");

    $('#Tijdlijn').append(items);
}

function getDag(id) {
    for (var key in data) {
        if (key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "date") {
                        if (obj.hasOwnProperty(prop)) {
                            date = obj[prop];
                        }
                    }
                }
            }
        }
    }
}

function getText(id) {
    for (var key in data) {
        if (key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "koptext") {
                        if (obj.hasOwnProperty(prop)) {
                            koptext = obj[prop];
                        }
                    }
                    if (prop == "subtext") {
                        if (obj.hasOwnProperty(prop)) {
                            subtext = obj[prop];
                        }
                    }
                }
            }
        }
    }

}

function getSrc(id) {
    for (var key in data) {
        if (key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (kind == "video") {
                        //als het een video is haal de thumbnail op.
                        if (prop == "thumbnail") {
                            if (obj.hasOwnProperty(prop)) {
                                src = obj[prop];
                            }
                        }
                    } else {
                        if (prop == "src") {
                            if (obj.hasOwnProperty(prop)) {
                                src = obj[prop];
                            }
                        }
                    }
                }
            }
        }
    }

}
function getFrom(id) {
    for (var key in data) {
        if (key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "from") {
                        if (obj.hasOwnProperty(prop)) {
                            from = obj[prop];
                        }
                    }
                }
            }
        }
    }

}
function getKind(id) {
    for (var key in data) {
        if (key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "kind") {
                        if (obj.hasOwnProperty(prop)) {
                            kind = obj[prop];
                        }
                    }
                }
            }
        }
    }

}
