class Needle{
    constructor(len){
        this.x = random(0, CANVAS_WIDTH);
        this.y = random(0, CANVAS_HEIGHT);
        this.angle = random(0, 2 * PI);
        this.length = len;
    }

    draw(){
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        line(0, 0, this.length, 0);
        pop();
    }
}