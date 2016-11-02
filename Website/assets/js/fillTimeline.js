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
        getBron(currentId);

        // hier word de pop-up in de html toegevoegd
        $("body").prepend(
            $("<div id='modal'>"+ fill_popup() + "</div>").hide().fadeIn('slow')
        );

        if(from == 'Clinton'){
            console.log("2")
            $(".modal-article").find("h1").css("color","#3598db");
            $(".modal-article").find("a").css("color","#3598db");
        } else if (from == 'Trump') {
            console.log("1")
            $(".modal-article").find("h1").css("color","#e74d3d");
            $(".modal-article").find("a").css("color","#e74d3d");
        } else {
            //veranderen?
            console.log("3")
            $(".modal-article").find("h1").css("color","grey");
        }

        // hier word de pop-up met content gevuld
        function fill_popup(){
            if (kind == "video"){
                var srcString = "<video controls poster='" + src +"'>" + "<source src='" + src + "' type='video/mp4'>" + "</video>"
            } else if (kind == "image"){
                var srcString = "<img src='" + src + "' />"
            } else {
                srcString = "";
            }

            var string = $("#modal").innerHTML =
                "<div class='modal-content'>" +
                    "<span class='close'>x</span>" +
                    srcString +
                    "<div class='modal-article'> " +
                        "<h1>" + koptext + "</h1>" +
                        "<p>" + subtext + "</p>"+
                        "<div class='modal-article-block'> " +
                            "<a href='" + bron + "'>" + bron + "<a/>" +
                            "<p>" + date + "</p>"+
                        "</div>" +
                    "</div>" +
                "</div>";
            return string;
        }


        // Close Pop-up

        $("#modal").click(handler).find("#modal");
        $("#modal").click(handler).find(".close");

        function handler(event){
            var target = $(event.target);
            if (target.is(".close")){
                $("#modal").fadeOut(300, function() {$(this).remove()});
            }
            else if (target.is("#modal") && target != $(".modal-content")){
                $("#modal").fadeOut(300, function() {$(this).remove()});
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
    getSrc(id);
    getFrom(id);
    getKind(id);
    getBron(id);

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
            "<img src='" + src + "' />" +
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
    //tijdlijn begint bij 1 april 2015 = 120 dagen ongeveer
    dag = dag - 120;
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
                            if (obj[prop] == "video"){
                                var thumbnail = true;
                            }
                            src = obj[prop];
                        }
                    }
                    if(thumbnail = true) {
                        if (prop == "thumbnail") {
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
function getBron(id) {
    for (var key in data) {
        if(key == id) { //gelijk aan degene die je wilt hebben
            if (data.hasOwnProperty(key)) {
                var obj = data[key];
                for (var prop in obj) {
                    if (prop == "bron") {
                        if(obj.hasOwnProperty(prop)){
                            bron = obj[prop];
                        }
                    }
                }
            }
        }
    }

}
