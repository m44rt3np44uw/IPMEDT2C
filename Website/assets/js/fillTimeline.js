$(document).ready(function () {
    moment.locale('nl');

    dagOld = 0;
    from = 0;
    idOld = 0;

    //eerste
    addFirst('route');

    //artikelen
    addArticles(data, true);

    //laatste
    addLast('white-house');

    // Do click acties.
    doClick();
});

//vul de tijdlijn
function fill(id) {
    getDag(id);
    getText(id);
    getKind(id);
    getSrc(id);
    getFrom(id);
    getKind(id);
    getBron(id);

    var items = [];

    items.push("<div class='" + "cd-timeline-block" + " filter-" + from.toLowerCase() + "'>" +
        "<div class='" + "cd-timeline-img " + kind + " " + from + "'></div>" +
        "<div class='" + "cd-timeline-content " + from + "'>" +
        "<div class='imageding " + kind + "-controls'>" +
        "<img class='artikelimg' src='" + src + "' />" +
        "</div>" +
        "<h2 class='" + "kop" + from + "'>" + koptext + "</h2>" +
        "<p>" + subtext + "</p>" +
        "<a data-id='" + id + "' class='" + "cd-read-more btn icon-boek " + from.toLowerCase() + "-button'><span>Lees meer</span></a>" +
        "<span class='" + "cd-date" + "'>" + moment(date, "DD-MM-YYYY").format("LL") + "</span>" +
        "</div>" +
        "</div>");

    $('#Tijdlijn').append(items);
}

function addArticles(articles, init) {
    $.when($.each(articles, function (key, value) {
        fill("id" + value.id);
    })).then(function () {
        if(init) {
            $(document).trigger('timeline-ready');
        }
    });
}

function addFirst(image) {
    $('#Tijdlijn').append("<div class='cd-timeline-block first'>" +
        "<div class='cd-timeline-img first " + image + "'></div>" +
        "</div>");
}

function addLast(image) {
    $('#Tijdlijn').append("<div class='cd-timeline-block last'>" +
        "<div class='cd-timeline-img last " + image + "'></div>" +
        "</div>");
}

function doClick() {
    $('.cd-timeline-content').on('click', function () {
        var currentId = $(this).find('a').attr('data-id');
        doPopup(currentId);
    });
}

function doPopup(currentId) {
    //haal alle variabelen op uit de file
    getDag(currentId);
    getText(currentId);
    getKind(currentId);
    getSrc(currentId);
    getFrom(currentId);
    getKind(currentId);
    getBron(currentId);

    // hier word de pop-up in de html toegevoegd
    $("body").prepend(
        $("<div id='modal'>" + fill_popup() + "</div>").hide().fadeIn('slow')
    );

    // hier word de pop-up met content gevuld
    function fill_popup() {

        var srcString;

        if (kind == "video") {
            srcString = "<video controls poster='" + src + "'>" + "<source src='" + videosrc + "' type='video/mp4'>" + "</video>"
        } else if (kind == "image") {
            srcString = "<img src='" + src + "' />"
        } else {
            srcString = "";
        }

        var modifiedBron = bron.split('-')[0] + '.html';

        var string = $("#modal").innerHTML =
            "<span class='close'></span>" +
            "<div class='modal-content modal-content-" + from.toLowerCase() + "'>" +
            srcString +
            "<div class='modal-article modal-" + from.toLowerCase() + "'> " +
            "<h1>" + koptext + "</h1>" +
            "<p>" + subtext + "</p>" +
            "<div class='modal-article-block'> " +
            "<p>bron: <a href='" + bron + "' target='_blank'>" + modifiedBron + "<a/></p>" +
            "<p>" + moment(date, "DD-MM-YYYY").format("LL") + "</p>" +
            "</div>" +
            "</div>" +
            "</div>";


        return string;
    }

    var $modal = $('#modal');

    $modal.click(handler).find("#modal");
    $modal.click(handler).find(".close");

    function handler(event) {
        var target = $(event.target);
        if (target.is(".close")) {
            $modal.fadeOut(300, function () {
                $(this).remove()
            });
        }
        else if (target.is("#modal") && target != $(".modal-content")) {
            $modal.fadeOut(300, function () {
                $(this).remove()
            });
        }
    }
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
                        if (prop == "src") {
                            if (obj.hasOwnProperty(prop)) {
                                videosrc = obj[prop];
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
function getBron(id) {
    for (var key in data) {
        if (key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "bron") {
                        if (obj.hasOwnProperty(prop)) {
                            bron = obj[prop];
                        }
                    }
                }
            }
        }
    }

}
