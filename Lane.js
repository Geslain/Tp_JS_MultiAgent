/**
 * Created by gdahan on 10/11/2015.
 */

(function(document , window , undefined , $)
{
    var Lane = function(i , y){
        this.y = y;
        this.index = i;
        this.nbCar = 0;
    }

    window.Lane = Lane;

    return window;

})(document , window , undefined , jQuery)