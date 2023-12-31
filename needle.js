class Needle{
    constructor(len){
        this.x = random(0, CANVAS_WIDTH - distBetweenTwoLattes);
        this.y = random(0, CANVAS_HEIGHT);

        this.theta = random(-(PI/2), PI/2);
        this.thetaFlip = PI/2 + this.theta;
        this.len = len;
        this.x1 = this.x + cos(this.theta) * (this.len / 2);
        this.y1 = this.y + sin(this.theta) * (this.len / 2);
        this.x2 = this.x - cos(this.theta) * (this.len / 2);
        this.y2 = this.y - sin(this.theta) * (this.len / 2);
        
        this.isCrossing = false;
    }

    draw(){
        push();
        if(this.isCrossing){
            stroke(255, 0 , 0);
        }
        else{
            stroke(0);
        }
        line(this.x1, this.y1, this.x2, this.y2);
        if(DEBUG){
            ellipse(this.x, this.y, 5, 5);
        }
        pop();
    }

    // Check if the needle is crossing a latte
    nearestLatte(){
        let r = Infinity;
        let n = 0;
        for(let i = 0; i < lattes.length; i++){
            let dist = abs(this.x - lattes[i]);
            if(dist < r){
                r = dist;
                n = i;
            }
        }
        return n;
    }

    calculDistanceBetweenClosestLatte(){
        let r = abs(this.x - lattes[this.nearestLatte()]);
        return r;
    }

    drawDistanceBetweenLatte(){
        push();
        stroke(169, 169, 169);
        if(this.x > lattes[this.nearestLatte()]){
            line(this.x, this.y, this.x - this.calculDistanceBetweenClosestLatte(), this.y);
            ellipse(this.x - this.calculDistanceBetweenClosestLatte(), this.y, 5);
        }
        else{
            line(this.x, this.y, this.x + this.calculDistanceBetweenClosestLatte(), this.y);
            ellipse(this.x + this.calculDistanceBetweenClosestLatte(), this.y, 5);
        }
        pop();
    }

    isCrossingLatte(){
        let sinTheta = sin(this.thetaFlip);
        let dist = sinTheta * (this.len / 2);

        if(dist > this.calculDistanceBetweenClosestLatte()){
            this.isCrossing = true;
        }
        else{
            this.isCrossing = false;
        }

        return dist;
    }
}