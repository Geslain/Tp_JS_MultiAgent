/**
 * Created by Gess on 08/11/2015.
 */


(function (document, window, undefined, $) {
    var Environnement = function (x, y) {
        this.cars = new Array()
        this.width = x;
        this.height = y;
        this.safeDistance = 20;
        this.changeLaneDistance = 120;
    }

    Environnement.prototype.collisionWithEnv = function (v) {
        this.v = v;
        if (v.x + v.width < this.width
            && v.y + v.height < this.height
            && v.x >= 0
            && v.y >= 0) {
            return false
        }
        return true;
    }

    Environnement.prototype.collisionWithCars = function (v) {
        for (j in this.cars) {
            v_temp = this.cars[j];

            if (i != j && v.x + v.width + this.safeDistance > v_temp.x &&
                v.x + v.width < v_temp.x + v_temp.width) {
                return true;
            }
        }
        return false;
    }

    Environnement.prototype.collision = function (v) {
        var collision = 0;
        if (!this.collisionWithEnv(v)) {
            if (this.cars.length != 1) {
                if(this.collisionWithCars(v))
                    return true;
            }
        }
        else{
            return true;
        }
        return false;
    }


    Environnement.prototype.changeLane = function (v) {
        if(v.bufferAction.length ==0 ) {
            for (j in this.cars) {
                v_temp = this.cars[j];

                if (i != j
                    && v.x + v.width + this.changeLaneDistance > v_temp.x
                    && v.x + v.width < v_temp.x + v_temp.width
                    && v.y >= v_temp.y
                    && v.y <= v_temp.y + v_temp.height) {
                    v.bufferAction.push("right");
                    v.bufferAction.push("forward");
                    v.bufferAction.push("right");
                    v.bufferAction.push("forward");
                    v.bufferAction.push("right");
                    v.bufferAction.push("forward");
                    v.bufferAction.push("left");
                    v.bufferAction.push("forward");
                    v.bufferAction.push("left");
                    v.bufferAction.push("forward");
                    v.bufferAction.push("left");
                    v.bufferAction.push("forward");
                }
            }
        }
    }


    Environnement.prototype.nextStep = function () {
        for (i in this.cars) {
            v = this.cars[i];
            if(!this.collision(v))
            {
                this.changeLane(v)
                if(v.bufferAction.length ==0 )
                v.moveForward();
                else
                {
                    switch (v.bufferAction[0])
                    {
                        case "right" :
                            v.turnRight();
                            break;
                        case "left" :
                            v.turnLeft();
                            break;
                        case "forward" :
                            v.moveForward();
                            break;
                        case "backward" :
                            v.moveBackward();
                            break;
                    }
                    v.bufferAction.splice(0,1);
                    console.log(v.bufferAction)
                }
            }

        }
    }

    window.Environnement = Environnement;

    return window;

})(document, window, undefined, jQuery)