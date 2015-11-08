/**
 * Created by Gess on 30/10/2015.
 */


(function(document , window , undefined , $)
{
    var Car = function(x , y){
        this.x = x;
        this.y = y;
        this.height = 20;
        this.width = 50;
        this.angle = 0;
        this.speed = 0;
    }

    Car.prototype.setCoord = function(x ,y) {
        this.x = x;
        this.y =y ;
    }

    Car.prototype.turnLeft = function() {
        this.angle = (this.angle +15) %360;
    }

    Car.prototype.turnRight = function() {
        this.angle = (((this.angle -15) %360)+360 ) %360;
    }

    Car.prototype.moveForward = function() {

        this.x += 20 *Math.cos(this.angle*Math.PI/180)
        this.y -= 20 *Math.sin(this.angle*Math.PI/180)
    }

    Car.prototype.moveBackward = function() {
        this.x -= 20 *Math.cos(this.angle)
        this.y += 20 *Math.sin(this.angle)
    }




    window.Car = Car;

    return window;

})(document , window , undefined , jQuery)