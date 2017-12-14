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
    constructor(){
    }

    move(x,y, color){

        console.log(this.nbturn);
        if (this.nbturn == 0){
            this.turn(x,y,color);
            this.changePlayer();
            return true;
        }
        if(this.verifPosition(x,y) && this.verifNoPieceBefore(x,y,color)) {
            if (this.movePlayer > 0) {
                if (!this.verifColor(x, y, color, this.pion.getColor())) {
                    return false;
                }
            }
            this.turn(x, y, color);
            this.movePlayer++;
           /* if(this.winner()){
                return true;
            }*/
            //this.changePlayer();
        }
        return false;
    }

    turn(x,y, color) {
        this.pion.setX(x);
        this.pion.setY(y);
        console.log(color);
        this.pion.setColor(color.id);
        this.player[this.tokenPlayer].setTokenStack(color.id)
        this.nbturn++;
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

    verifNoPieceBefore(x,y, color){
        let positionX = this.pion.getX();
        let positionY = this.pion.getY();
        let signDiffX = this.signDiffX(x,y);
        let signDiffY = this.signDiffY(x,y);
        while(x != positionX && y != positionY){
            if (color.id !== pieces[0].id){
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

    verifColor(x,y, color, colorpion){
        return (colorpion != color.id);
    }

    init(namePlayer1, namePlayer2){
        this.player = [];
        this.player.push(new Joueur(namePlayer1));
        this.player.push(new Joueur(namePlayer2));
        this.pion = new Pion();
        this.tokenPlayer = Math.floor(Math.random()*2);
        console.log(this.tokenPlayer);
        this.nbturn = 0;
        this.movePlayer= 0;

    }

    changePlayer(){
        this.movePlayer = 0;
        this.tokenPlayer = (this.tokenPlayer == 1) ? 0 : 1;
    }

    winner(){
        for (let i = 1;i<8;i++){
            if(this.player[this.tokenPlayer].getTokenStack(i) == 7){
                return true
            }
        }
        return false;
    }

    getNbTurn(){
        return this.nbturn;
    }
}