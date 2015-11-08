/**
 * Created by Gess on 08/11/2015.
 */


(function (document, window, undefined, $) {
    var Environnement = function (x, y) {
        this.cars = new Array()
        this.width = x;
        this.height = y;
        this.safeDistance = 20;
        this.changeLaneDistance = 100;
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
                collision = 1;
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
        for (j in this.cars) {
            v_temp = this.cars[j];

            if (i != j && v.x + v.width + this.changeLaneDistance > v_temp.x &&
                v.x + v.width < v_temp.x + v_temp.width) {
                collision = 1;
                return true;
            }
        }
        return false;
    }


    Environnement.prototype.nextStep = function () {
        for (i in this.cars) {
            v = this.cars[i];
            if(!this.collision(v))
            {
                if (this.changeLane(v))
                {
                    v.turnRight();
                }
                v.moveForward();
            }

        }
    }

    window.Environnement = Environnement;

    return window;

})(document, window, undefined, jQuery)