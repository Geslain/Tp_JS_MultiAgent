/**
 * Created by Gess on 30/10/2015.
 */


//------------------------------------
// Configuration
var nblanes = 10;
var env;
var tick = 50;
var colors = [ "blue" , "red" , "green" , "black" , "gold"];

//------------------------------------

$(document).ready(function () {

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var keys = {};


    initEnv();

    function clearCanvas() {
        ctx.clearRect(0, 0, c.width, c.height);
    }

    function drawEnvironnement()
    {
        ctx.beginPath();
        ctx.rect(0,0,env.width, nblanes*65 + 20);
        ctx.fillStyle = "grey";
        ctx.fill();

        for(var j = 0 ; j < env.nbLanes ; j++)
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
            //drawCarHitbox(v);
        }
    }

    function drawCar(car) {
        x = car.x;
        y = car.y;
        width = car.width;
        height = car.height;
        angle = car.angle;
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
        ctx.fillStyle = car.color;
        ctx.fill();

        // restore the context to its untranslated/unrotated state
        ctx.restore();
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

            loop = setInterval(
                function () {
                    env.nextStep();
                    clearCanvas();
                    drawEnvironnement();
                    drawCars(env);
                    stop(loop);
                 }, tick);

        }
        else if (key == 81) {
            var lane = Math.floor((Math.random() * (env.nbLanes-1)));
            var color = colors[Math.floor((Math.random() * (colors.length)))];
            env.addCar(new Car(0, 5+lane*65 , color));
        }else if (key == 68) {
            nblanes = 3
            initEnv();
        }
    });

    function stop(loop)
    {
        $("#stopEnv").click(function(){
            clearInterval(loop);
            document.getElementById("restartEnv").disabled = false;
            document.getElementById("stopEnv").disabled = true;

        })
        $(document).keydown(function (event) {
            var key = event.which | event.keyCode;
            if (key == 83) {
                clearInterval(loop);
            }
        });
    }
    window.env = env;


    $("#changeNbVoies").click(function(){
        if($("#ipt_voies").val() <= 10)
        nblanes = $("#ipt_voies").val();

        initEnv();
    })

    $("#addCars").click(function(){
        var i=$("#range").val();
        while (i>0){
            var lane = i%10;//Math.floor((Math.random() * (env.nbLanes-1)));
            var color = colors[Math.floor((Math.random() * (colors.length)))];
            env.addCar(new Car(0, 5+lane*65 , color));
            i--;
        }

    })

    $("#initEnv").click(function(){

        initEnv();
        loop = setInterval(
            function () {
                env.nextStep();
                clearCanvas();
                drawEnvironnement();
                drawCars(env);
                stop(loop);
            }, tick);
        document.getElementById("initEnv").disabled = true;
    })

    $("#restartEnv").click(function(){
        loop = setInterval(
            function () {
                env.nextStep();
                clearCanvas();
                drawEnvironnement();
                drawCars(env);
                stop(loop);
            },tick);
        document.getElementById("restartEnv").disabled = true;
        document.getElementById("stopEnv").disabled = false;
    })

    $("#fastEnv").click(function(){
        tick=tick/2;
        loop = setInterval(
            function () {
                env.nextStep();
                clearCanvas();
                drawEnvironnement();
                drawCars(env);
                stop(loop);
            }, tick);
    })

    $("#slowEnv").click(function(){
        $("#stopEnv").trigger("click");
        tick=tick*2;
        loop = setInterval(
            function () {
                env.nextStep();
                clearCanvas();
                drawEnvironnement();
                drawCars(env);
                stop(loop);
            },tick );
    })

    function initEnv(){
        env = new Environnement(c.width, c.height ,nblanes);
        clearCanvas();
        drawEnvironnement();
        drawCars(env);
    }
});

var creatCopy = function(object) {
    return $.extend(true , {} , object);
}