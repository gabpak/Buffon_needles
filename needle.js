class Needle{
    constructor(x, y, theta, len){
        this.x = x;
        this.y = y;
        this.x1 = x + cos(theta) * (len / 2);
        this.y1 = y + sin(theta) * (len / 2);
        this.x2 = x - cos(theta) * (len / 2);
        this.y2 = y - sin(theta) * (len / 2);
    }

    draw(){
        push();
        stroke(0);
        line(this.x1, this.y1, this.x2, this.y2);
        ellipse(this.x, this.y, 5, 5);
        pop();
    }
}