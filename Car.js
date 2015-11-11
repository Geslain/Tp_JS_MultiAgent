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
        this.speed =Math.floor(( Math.random()*20)+ 10);
        this.bufferAction= [];
        this.tickStop= Math.floor(( Math.random()*100)+ 50);

        //hitbox
        this.hitbox = new Hitbox(this.width+10 ,  this.height+30)
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

        this.x += this.speed *Math.cos(this.angle*Math.PI/180)
        this.y -= this.speed *Math.sin(this.angle*Math.PI/180)
    }

    Car.prototype.moveBackward = function() {
        this.x -= this.speed *Math.cos(this.angle)
        this.y += this.speed0 *Math.sin(this.angle)
    }

    Car.prototype.getHitboxX = function() {
        return (this.x - (this.hitbox.width- this.width)/2);
    }

    Car.prototype.getHitboxY = function() {
        return (this.y - (this.hitbox.height- this.height)/2);
    }




    window.Car = Car;

    return window;

})(document , window , undefined , jQuery)