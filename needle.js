class Needle{
    constructor(x, y, theta, len){
        this.x = x;
        this.y = y;
        this.theta = theta;
        this.len = len;
        this.x1 = x + cos(theta) * (len / 2);
        this.y1 = y + sin(theta) * (len / 2);
        this.x2 = x - cos(theta) * (len / 2);
        this.y2 = y - sin(theta) * (len / 2);
        this.isCrossing = false;
    }

    draw(){
        push();
        if(this.isCrossingLatte()){
            stroke(255, 0 , 0);
        }
        else{
            stroke(0);
        }
        line(this.x1, this.y1, this.x2, this.y2);
        ellipse(this.x, this.y, 5, 5);
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
        stroke(255, 0, 0);
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
        let sinTheta = sin(this.theta);
        let dist = sinTheta * (this.len / 2);

        // Si distance r > tips alors ça ne touche pas
        // BUG HERE
        if(this.calculDistanceBetweenClosestLatte() > dist){
            this.isCrossing = false;
            return false;
        }
        else{
            this.isCrossing = true;
            return true;
        }
    }
}