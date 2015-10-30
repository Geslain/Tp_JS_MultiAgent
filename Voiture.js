/**
 * Created by Gess on 30/10/2015.
 */


(function(document , window , undefined , $)
{
    var Voiture = function(){
        this.x = 0;
        this.y = 0;
        this.vitesse = 0;
    }

    Voiture.prototype.setCoord = function(x ,y) {
        this.x = x;
        this.y =y ;
    }



    window.Voiture = Voiture;

    return window;

})(document , window , undefined , jQuery)