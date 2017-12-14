let HexGrid = require('../assets/hex-grid');

let pieces = {
    'VIDE': {
        id: 0,
        src: 'vide.png',
        nb: 7
    },
    'BLEU': {
        id: 1,
        src: 'blue.png',
        nb: 7
    },
    'JAUNE': {
        id: 2,
        src: 'yellow.png',
        nb: 7
    },
    'ROUGE': {
        id: 3,
        src:'red.png',
        nb: 7
    },
    'VERT': {
        id: 4,
        src: 'vert.png',
        nb: 7
    },
    'VIOLET': {
        id: 5,
        src: 'violet.png',
        nb: 7
    },
    'ORANGE': {
        id: 6,
        src: 'orange.png',
        nb: 7
    },
    'BLANC': {
        id: 7,
        src: 'white.png',
        nb: 7
    }
};

class Engine {
    constructor(){
    }

    move( x, y){
        if(this.verifPosition(x,y) && this.verifNoPieceBefore(x,y) && this.verifColor(x,y)){
            this.pion.setX(x);
            this.pion.setY(y);
            HexGrid.getPositionByCoords(x,y);
            HexGrid.setTileImageByPos(x,y,PION);
            //ajout de la couleur dans la pile du joueur
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

    init(namePlayer1, namePlayer2){
        this.player1 = new Joueur(namePlayer1);
        this.player2 = new Joueur(namePlayer2);
        this.tokenPlayer = Math.random() >= 0.5;

        //this.pion = new Pion(x,y); a initialiser au premier tour du joueur selectionner
    }
}