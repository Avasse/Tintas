let HexGrid = require('../assets/hex-grid');

let pieces = [
    {
        name : 'VIDE',
        id: 0,
        src: './img/blue.png',
        nb: 7
    },
    {
        name : 'BLEU',
        id: 1,
        src: './img/blue.png',
        nb: 7
    },
    {
        name : 'JAUNE',
        id: 2,
        src: './img/yellow.png',
        nb: 7
    },
    {
        name : 'ROUGE',
        id: 3,
        src:'./img/red.png',
        nb: 7
    },
    {
        name : 'VERT',
        id: 4,
        src: './img/green.png',
        nb: 7
    },
    {
        name : 'VIOLET',
        id: 5,
        src: './img/purple.png',
        nb: 7
    },
    {
        name : 'ORANGE',
        id: 6,
        src: './img/orange.png',
        nb: 7
    },
    {
        name : 'BLANC',
        id: 7,
        src: './img/white.png',
        nb: 7
    }
];

let pion= { id : 0, src : './img/pion.png'}

class Engine {
    constructor(x,y){
    }

    move( x, y){
        if(this.verifPosition(x,y) && this.verifNoPieceBefore(x,y) && this.verifColor(x,y)){
            this.pion.setX(x);
            this.pion.setY(y);
            HexGrid.setTileImageByPos(x,y,pion.src);
            //ajout de la couleur dans la pile du joueur
        }
    }

    firstturn(x,y){

        this.pion.setX(x);
        this.pion.setY(y);
        HexGrid.setTileImageByPos(x,y,pion.src);
        this.player[this.tokenPlayer].setTokenStack()

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
            if (HexGrid.getTileColorByPos(x,y) !== pieces[0].id){
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
        this.player = new Joueur()[2];
        this.player[0] = new Joueur(namePlayer1);
        this.player[1] = new Joueur(namePlayer1);
        this.tokenPlayer = Math.random() >= 0.5;

        this.nbturn = 0;

        //this.pion = new Pion(x,y); a initialiser au premier tour du joueur selectionner
    }
}