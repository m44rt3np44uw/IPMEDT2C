$(document).ready(function() {
    for (var key in data) {
        var id = key;
        fill(id);

    }

    $("#Tijdlijn").delegate("a", "click", function () {
        var currentId = $(this).attr("data-id");

        //haal alle variabelen op uit de file
        getDag(currentId);
        getText(currentId);
        getSrc(currentId);
        getFrom(currentId);
        getKind(currentId);

        //open popup

        //laad artikel in popup dmv id

        //laad foto's enzovoort...

    });
});

//vul de tijdlijn
function fill(id) {
    getDag(id);
    getText(id);
    getSrc(id);
    getFrom(id);
    getKind(id);

    var items = [];

    // per dag is 10 margin-top
    items.push("<div id='" + "circle" + id + "' class='" + "circle " + kind + "' style='" + "margin-top: " + dag*10 + "px" + "'></div>");
    if(from === "Trump") {
        items.push("<div id='" + "square" + id + "' class='" + "squareright " + "' style='" + "margin-top: " + dag * 10 + "px" + "'>" +
            "<div class='"+ "kopArtikel" +"'><p>"+ koptext +"</p></div>" +
            "<div class='"+ "textArtikel" +"'><p>"+ subtext +"</p><p class='" + "moreInfo" + "'><a href='#' data-id='" + id + "'>></a></p></div>" +
            "<img src='" + src + "' />" +
            "<div class='"+ "datumArtikel" +"'><p>" + date + "</p></div>" +
            "</div>");
    }
    if(from === "Clinton"){
        items.push("<div id='" + "square" + id + "' class='" + "squareleft " + "' style='" + "margin-top: " + dag * 10 + "px" + "'>" +
            "<div class='"+ "kopArtikel" +"'><p>"+ koptext +"</p></div>" +
            "<div class='"+ "textArtikel" +"'><p>"+ subtext +"</p><p class='" + "moreInfo" + "'><a href='#' data-id='" + id + "'>></a></p></div>" +
            "<video src='" + src + "' + controls />" +
            "<div class='"+ "datumArtikel" +"'><p>" + date + "</p></div>" +
            "</div>");
    }
    if(from === "Both"){
        items.push("<div id='" + "square" + id + "' class='" + "squarecenter " + "' style='" + "margin-top: " + dag * 10 + "px" + "'>" +
            "<div class='"+ "kopArtikel" +"'><p>"+ koptext +"</p></div>" +
            "<div class='"+ "textArtikel" +"'><p>"+ subtext +"</p><p class='" + "moreInfo" + "'><a href='#' data-id='" + id + "'>></a></p></div>" +
            "<img src='" + src + "' />" +
            "<div class='"+ "datumArtikel" +"'><p>" + date + "</p></div>" +
            "</div>");
    }

    $('#Tijdlijn').append(items);
}

function getDag(id) {
    for (var key in data) {
        if(key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "date") {
                        if(obj.hasOwnProperty(prop)){
                            date = obj[prop];
                        }
                    }
                }
            }
        }
    }
    var res = date.split("-", 3); //split datum in dag, maand en jaar
    dag = parseInt(res[0]);
    var maand = parseInt(res[1]);
    var jaar = parseInt(res[2]);
    //maak dagen van maanden
    maand = maand * 30;
    dag = dag + maand;
    //tijdlijn begint bij 1 oktober 2015 = 301 dagen
    dag = dag - 301;
    //compenseer voor 2016 datums
    if(jaar === 2016){
        dag = dag + 365;
    }
}

function getText(id) {
    for (var key in data) {
        if(key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "koptext") {
                        if(obj.hasOwnProperty(prop)){
                            koptext = obj[prop];
                        }
                    }
                    if (prop == "subtext") {
                        if(obj.hasOwnProperty(prop)){
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
        if(key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "src") {
                        if(obj.hasOwnProperty(prop)){
                            src = obj[prop];
                        }
                    }
                }
            }
        }
    }

}
function getFrom(id) {
    for (var key in data) {
        if(key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "from") {
                        if(obj.hasOwnProperty(prop)){
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
        if(key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "kind") {
                        if(obj.hasOwnProperty(prop)){
                            kind = obj[prop];
                        }
                    }
                }
            }
        }
    }

}
