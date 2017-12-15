class Joueur{
    constructor(name){
        this.name = name;
        this.score = 0;
        this.tokenStack = [];
        for (let i =1;i<8;i++){
            this.tokenStack[i] = 0;
        }
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setScore(score){
        this.score = score;
    }
    getScore(){
        return this.score;
    }
    setTokenStack(id){
        this.tokenStack[id]++;
    }
    getTokenStack(id){
        return this.tokenStack[id];
    }
}

module.exports = Joueur;