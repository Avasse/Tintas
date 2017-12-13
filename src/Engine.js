var HexGrid = require('../assets/hex-grid');
const VIDE = 0;
class Engine {
    constructor(x,y){
        this.pion = new Pion(x,y);
    }

    move(Pion, x, y){
        if(this.verifPosition(x,y) && this.verifNoPieceBefore(x,y)){
            this.pion.setX(x);
            this.pion.setY(y);
            setTileImageByPos(x,y,VIDE)
        }

    }

    verifPosition(x,y){
        return true;
    }

    verifNoPieceBefore(x,y){
        return true;
    }
}