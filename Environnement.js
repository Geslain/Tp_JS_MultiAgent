/**
 * Created by Gess on 08/11/2015.
 */


(function (document, window, undefined, $) {
    var Environnement = function (x, y) {
        this.cars = new Array();
        this.width = x;
        this.height =y;
        this.safeDistance = 20;
        this.changeLaneDistance = 120;
        this.toll = new Toll(10);
        this.toll_t = this.toll;

    }

    Environnement.prototype.addCar = function(v){
        this.cars.push(v);
        this.toll.addCarLane(v.y);
    }

    Environnement.prototype.collisionWithEnv = function (v) {
        this.v = v;
        if (v.x + v.width < this.width - 100
            && v.y + v.height < this.height
            && v.x >= 0
            && v.y >= 0) {
            return false
        }
        return true;
    }

    Environnement.prototype.collisionWithCars = function (v , distance) {
        for (j in this.cars) {
            v_temp = this.cars[j];

            var x = v.getHitboxX();
            var y = v.getHitboxY();
            var w = v.hitbox.width;
            var h = v.hitbox.height;
            var s = v.speed;

            var xt = v_temp.getHitboxX();
            var yt = v_temp.getHitboxY();
            var wt = v_temp.hitbox.width;
            var ht = v_temp.hitbox.height;

            if (i != j
                && x + w + distance + s >= xt
                && x + w + s <= xt + wt
                && y >= yt
                && y <= yt + ht) {
                return true;
            }
        }
        return false;
    }

    Environnement.prototype.collision = function (v) {
        var collision = 0;
        if (!this.collisionWithEnv(v)) {
            if (this.cars.length != 1) {
                if(this.collisionWithCars(v , this.safeDistance))
                    return true;
            }
        }
        else{
            return true;
        }
        return false;
    }


    Environnement.prototype.changeLane = function (v) {
        if (v.bufferAction.length == 0) {
            console.log(this.toll_t.getLane(v.y))
            var newLane = this.toll_t.getBestLane(this.toll_t.getLane(v.y));
            console.log(newLane)
            this.toll_t.lanes[this.toll_t.getLane(v.y)]--;
            if(newLane > this.toll_t.getLane(v.y))
            {

                this.toll.changeCarLane(v.y , v.y+65)
                v.y+= 65

            } else if (newLane >this.toll_t.getLane(v.y)) {
                this.toll.changeCarLane(v.y , v.y-65)
                v.y-= 65
            } else {

            }
        }
    }

    Environnement.prototype.canChangeLane = function (v) {
        v_temp = v;
        v_temp.x += v_temp.speed;
        v_temp.y += 65;
        if (this.collisionWithCars(v_temp ,0))
            return false;

        return true;

    }

    Environnement.prototype.isChangeLaneBetter = function (v) {
        v_temp = v;
        v_temp.x += v_temp.speed;
        v_temp.y += 65;
        new_lane = this.toll.getLane(v_temp)
        if (this.collisionWithCars(v_temp ,0))
            return false;
        return true;
    }



    Environnement.prototype.nextStep = function () {
        this.toll_t = this.toll;
        for (var i = this.cars.length -1 ; i >= 0 ; i --) {
            v = this.cars[i];
            if(!this.collision(v))
            {

                this.changeLane(v);
                v.moveForward();
                //if(v.bufferAction.length ==0 )
                //v.moveForward();
                //else
                //{
                //    switch (v.bufferAction[0])
                //    {
                //        case "right" :
                //            v.turnRight();
                //            break;
                //        case "left" :
                //            v.turnLeft();
                //            break;
                //        case "forward" :
                //            v.moveForward();
                //            break;
                //        case "backward" :
                //            v.moveBackward();
                //            break;
                //    }
                //    v.bufferAction.splice(0,1);
                    //console.log(v.bufferAction)

                //}
                //console.log(v);
            }

        }
    }

    window.Environnement = Environnement;

    return window;

})(document, window, undefined, jQuery)