class Pion {
    constructor(){
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    setColor(color){
        this.color = color;
    }
    getColor(){
        return this.color;
    }
}

module.exports = Pion;