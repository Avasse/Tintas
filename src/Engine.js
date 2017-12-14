let HexGrid = require('../assets/hex-grid');

Piece = {
    VIDE: {
        id: 0,
        src: 'src',
    },
    BLEU: {
        id: 1,
        src: 'src',
    },
    JAUNE: {
        id: 2,
        src: 'src',
    },
    ROUGE: {
        id: 3,
        src: 'src',
    },
    VERT: {
        id: 4,
        src: 'src',
    },
    VIOLET: {
        id: 5,
        src: 'src',
    },
    ORANGE: {
        id: 6,
        src: 'src',
    },
    BLANC: {
        id: 7,
        src: 'src',
    }
};

class Engine {
    constructor(x,y){
        this.pion = new Pion(x,y);
    }

    move( x, y){
        if(this.verifPosition(x,y) && this.verifNoPieceBefore(x,y) && this.verifColor(x,y)){
            this.pion.setX(x);
            this.pion.setY(y);
            HexGrid.setTileImageByPos(x,y,PION);
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
            if (HexGrid.getTileImageByPos(x,y) != VIDE){
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

    verifColor(x,y){
        return (HexGrid.getTileImageByPos(this.pion.getX(),this.pion.getY()) != (HexGrid.getTileImageByPos(x,y)));
    }
}