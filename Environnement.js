/**
 * Created by Gess on 08/11/2015.
 */


(function (document, window, undefined, $) {
    var Environnement = function (x, y , nblanes) {
        this.cars = new Array();
        this.width = x;
        this.height =y;
        this.safeDistance = 20;
        this.changeLaneDistance = 120;
        this.nbLanes = nblanes;
        this.toll = new Toll(this.nbLanes );

    }

    Environnement.prototype.addCar = function(v){

        if(!this.collisionWithCars(v , 0)){
            this.cars.push(v);
            this.toll.addCarLane(v.y);
        }

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
                    // haut gauche
                &&(( x + w + distance + s >= xt
                && x + w + s <= xt + wt
                && y >= yt
                && y <= yt + ht))){
                console.log("hG")
                return true;
            }
                    // haut droit
            if (i != j
                    // haut gauche
                && (x + distance + s >= xt
                && x +s  <= xt + wt
                && y >= yt
                && y <= yt + ht)) {
                console.log("hD")
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
            var newLane = this.getBestLane(v);
            if(newLane > this.toll.getLane(v.y) )//&& this.canChangeLane(v , v.y+65))
            {
                this.toll.changeCarLane(v.y , v.y+65)
                v.y+= 65

            } else if (newLane < this.toll.getLane(v.y) )//&& this.canChangeLane(v , v.y-65))
            {
                this.toll.changeCarLane(v.y , v.y-65)
                v.y-= 65
            } else {

            }
        }
    }

    Environnement.prototype.canChangeLane = function(v , y){
        var v_next = v;
        v_next.y = y;
        v_next.x += v_next.speed;

        if(this.collisionWithCars(v_next))
        {
            return false;
        }
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
            } else if(this.collisionWithEnv(v))
            {
                if(v.tickStop != 0)
                v.tickStop --;
                else
                this.cars.splice(i,1);
            }

        }
    }

    Environnement.prototype.getForwardCars = function(v) {
        var temp_cars = [];
        for( var i = 0 ; i <this.nbLanes ; i++) {
            temp_cars.push(0);
        }

        for (var i = 0 ; i < this.cars.length ; i++){
            if(v != this.cars[i] && v.x <= this.cars[i].x)
            temp_cars[this.toll.getLane(this.cars[i].y)]++;
        }
        return temp_cars;
    }

    Environnement.prototype.getBestLane = function(v){
        var toll_t = this.getForwardCars(v);
        var lane = this.toll.getLane(v.y);
        var best_lane = lane;
        var ecart_lane  = this.nbLanes;
        for( var i = 0; i < this.nbLanes ; i++){
            if(toll_t[i] <= toll_t[best_lane] )
            {
                if(toll_t[i] < toll_t[best_lane] )
                {
                    best_lane= i;
                    ecart_lane = Math.abs(lane - i);
                } else if(toll_t[i] == toll_t[best_lane] && Math.abs(lane - i)<= ecart_lane) {
                    best_lane= i;
                    ecart_lane = Math.abs(lane - i);
                }

            }
        }
        return best_lane;
    }

    window.Environnement = Environnement;

    return window;

})(document, window, undefined, jQuery)