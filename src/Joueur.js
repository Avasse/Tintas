class Joueur{
    constructor(name,score){
        this.name = name;
        this.score = score;
    }
    set name(name){
        this.name = name;
    }
    get name(){
        return this.name;
    }
    set score(score){
        this.score = score;
    }
    get score(){
        return this.score;
    }
}