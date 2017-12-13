let HexGrid = require('../assets/hex-grid');
Piece = {VIDE :0, BLEU:1,JAUNE:2,ROUGE:3,VERT:4};
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
        return (this.verifColonne(x,y)
                || this.verifLigne(x,y)
                || this.verifDiagonal(x,y));
    }

    verifLigne(x,y){
        return (y == this.pion.getY() && x != this.pion.getX());
    }

    verifColonne(x,y){
        return (y != this.pion.getY() && x == this.pion.getX());
    }

    verifDiagonal(x,y) {
        return (Math.abs(x - this.pion.getX()) == Math.abs(y - this.pion.getY()))
    }

    verifNoPieceBefore(x,y){
        let positionX = this.pion.getX();
        let positionY = this.pion.getY();
        let signDiffX = this.signDiffX(x,y);
        let signDiffY = this.signDiffY(x,y);
        while(x != positionX && y != positionY){
            if (HexGrid.setTileImageByPos(x,y) != VIDE){
                return false;
            }
            positionX += signDiffX;
            positionY += signDiffY;
        }
        return true;
    };

    signDiffX(x){
        if ((this.pion.getX() - x) > 0){
            return -1;
        }
        if ((this.pion.getX() - x) == 0){
            return 0
        }
        return 1;
    }

    signDiffY(y){
        if ((this.pion.getY() - y) > 0){
            return -1;
        }
        if((this.pion.getY() - y) == 0){
            return 0;
        }
        return 1;
    }
}