/**
 * Created by Gess on 30/10/2015.
 */

$(document).ready(function(){

    var c = document.getElementById( "canvas" );
    var ctx = c.getContext("2d");
    var voiture = new Array();

    voiture.push(new Voiture());
    drawvoiture(50 , 50);

    function drawvoiture(x , y)
    {
        ctx.fillStyle = "olivedrab";
        ctx.fillRect(x,y,50,20);
    }
});