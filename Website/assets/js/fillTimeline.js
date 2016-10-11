$(document).ready(function() {
    $.getJSON( "assets/test.json", function( data ) {
        var items = [];
        var id = 0;
        var dag = 0;
        var date = 0;
        var src = 0;
        var from = 0;
        $.each( data, function() {
            $.each( this, function() {
                $.each(this, function (key, val) {
                    if(key === "date"){
                        date = val;

                        var res = val.split("-", 2); //split datum in dag en maand
                        dag = parseInt(res[0]);
                        var maand = parseInt(res[1]);
                        //maak dagen van maanden
                        maand = maand * 30;
                        dag = dag + maand;
                        //tijdlijn begint bij 1 oktober 2015 = 301 dagen
                        dag = dag - 301;
                        //uitkomst gaat hier beneden bij de margin-top
                    }
                    // kijk welke foto er moet worden getoont
                    if(key === "src"){
                        src = val;
                    }
                    // Trump of Clinton
                    if(key === "from"){
                        if(val === "Trump"){
                            from = 1;
                        }
                        else{
                            from = 2;
                        }
                    }
                    if(key === "kind") {
                        console.log(dag);

                        // per dag is 10 margin-top
                        items.push("<div id='" + "circle" + id + "' class='" + "circle " + val + "' style='" + "margin-top: " + dag*10 + "px" + "'></div>");
                        if(from === 1) {
                            items.push("<div id='" + "square" + id + "' class='" + "squareleft " + val + "' style='" + "margin-top: " + dag * 10 + "px" + "'><img src='" + src + "' /></div>");
                        }
                        if(from === 2){
                            items.push("<div id='" + "square" + id + "' class='" + "squareright " + val + "' style='" + "margin-top: " + dag * 10 + "px" + "'><img src='" + src + "' /></div>");
                        }

                        id = id + 1;
                    }
                })
            });
        });
        $('#Tijdlijn').append(items);
    });
});
