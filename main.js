/**
 * Created by Gess on 30/10/2015.
 */

$(document).ready(function () {


    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var keys = {};

    var env = new Environnement(c.width, c.height);


    env.addCar(new Car(0, 5));
    drawEnvironnement();
    drawCars(env);

    function clearCanvas() {
        ctx.clearRect(0, 0, c.width, c.height);
    }

    function drawEnvironnement()
    {
        ctx.beginPath();
        ctx.rect(0,0,env.width, env.height);
        ctx.fillStyle = "grey";
        ctx.fill();

        for(var j = 0 ; j < 10 ; j++)
        {
            for(var i = 0 ; i < 10 ; i++)
            {
                ctx.beginPath();
                ctx.rect(i*2*env.width/20,(j)*65 +45,env.width/20,2);
                ctx.fillStyle = "white";
                ctx.fill();
            }
        }


    }

    function drawCars(env) {
        for (i in env.cars) {
            v = env.cars[i];
            drawCar(v);
            drawCarHitbox(v);
        }
    }

    function drawCar(voiture) {
        x = voiture.x;
        y = voiture.y;
        width = voiture.width;
        height = voiture.height;
        angle = voiture.angle;
        // first save the untranslated/unrotated context
        ctx.save();

        ctx.beginPath();
        // move the rotation point to the center of the rect
        ctx.translate(x + width / 2, y + height / 2);
        // rotate the rect
        ctx.rotate(-angle * Math.PI / 180);

        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.fillStyle = "gold";
        ctx.fill();

        // restore the context to its untranslated/unrotated state
        ctx.restore();
        /*console.log("x : " + x +
            " y :" + y +
            " angle" + angle
        )*/
    }

    function drawCarHitbox(v) {
        ctx.beginPath();
        ctx.strokeStyle = "#0000ff";
        ctx.strokeRect(v.getHitboxX(), v.getHitboxY(), v.hitbox.width, v.hitbox.height);
    }


    $(document).keydown(function (event) {
        var key = event.which | event.keyCode;
        var loop = undefined;
        if (key == 90) {

            //loop = setInterval(
            //    function () {
                    env.nextStep();
                    clearCanvas();
                    drawEnvironnement();
                    drawCars(env);
           //         stop(loop);
           //     }, 50);

        }
        else if (key == 81) {
            lane = Math.floor((Math.random() * 9));
            env.addCar(new Car(0, 5+lane*65));
        }
    });

    function stop(loop)
    {
        $(document).keydown(function (event) {
            var key = event.which | event.keyCode;
            if (key == 83) {
                clearInterval(loop);
            }
        });
    }


    /*$(document).mousedown(function(event) {
     var key = event.which | event.keyCode ;
     if(key == 3)
     clearCanvas();
     else if(key == 1 )
     drawCar(voiture[0])
     }).keydown(function(event){

     var key = event.which | event.keyCode ;
     keys[key] = true;
     for(var k in keys){
     switch(k) {
     //up
     case "90" :
     voiture[0].moveForward();
     break;
     //left
     case "81" :
     voiture[0].turnLeft();
     break;
     //down
     case "83" :
     voiture[0].moveBackward();
     break;
     //right
     case "68" :
     voiture[0].turnRight();
     break;
     }
     }


     clearCanvas();
     drawCar(voiture[0])
     });

     $(document).keyup(function (event) {
     var key = event.which | event.keyCode ;
     delete keys[key] ;
     });*/
    window.env = env;
});