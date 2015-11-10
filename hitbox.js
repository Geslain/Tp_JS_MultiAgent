/**
 * Created by gdahan on 10/11/2015.
 */

(function(document , window , undefined , $)
{
    var Hitbox = function(w, h){
        this.width = w;
        this.height = h;
    }

    window.Hitbox = Hitbox;

    return window;

})(document , window , undefined , jQuery)