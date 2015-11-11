/**
 * Created by gdahan on 10/11/2015.
 */

(function(document , window , undefined , $)
{
    var Toll = function(nb){
        this.nbLanes = nb;
        this.lanes = []

        for( var i = 0; i < nb ; i++){
            this.lanes.push(new Lane(i, i*65));
        }
    }

    Toll.prototype.addCarLane = function(y){
        lane = Math.floor(y /65);
        this.lanes[lane].nbCar++;
    }

    Toll.prototype.changeCarLane = function(y_old, y_new){
        lane_old = Math.floor(y_old /65);
        lane_new = Math.floor(y_new /65);
        this.lanes[lane_old].nbCar--;
        this.lanes[lane_new].nbCar++;
    }

    Toll.prototype.getLane = function(y){
        return Math.floor(y /65);
    }

    Toll.prototype.getBestLane = function(v_lane){
        var lane =this.lanes[v_lane];
        for( var i = 0; i < this.nbLanes ; i++){
            if( this.lanes[v_lane] != this.lanes[i] && this.lanes[i].nbCar < lane.nbCar)
            {
                lane = this.lanes[i];
            }
        }
        if(this.lanes[v_lane].nbCar -1 == lane.nbCar)
            return this.lanes[v_lane].index;
        return lane.index;
    }

    window.Toll = Toll;

    return Toll;

})(document , window , undefined , jQuery)