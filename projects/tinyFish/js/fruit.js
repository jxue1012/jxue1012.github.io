var fruitObj = function() {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.size = [];
    this.speed = [];
    this.type = [];
    this.orange = new Image();
    this.blue = new Image();
    this.aneId = [];
};

fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
    for(var i=0; i<this.num;i++) {
        this.x[i] = 0;
        this.y[i] = 0;
        this.alive[i] = false;
        this.speed[i] = Math.random() * 0.005 + 0.012;
    }
    this.orange.src = "./assets/images/fruit.png";
    this.blue.src = "./assets/images/blue.png";
};
fruitObj.prototype.draw = function() {
    var foodPic;
    for(var i=0; i<this.num; i++) {
        if(this.alive[i]) {
            if(this.size[i] <= 14) {
                this.size[i] += this.speed[i] * deltaTime;
                this.x[i] = ane.headX[this.aneId[i]];    
            }
            else{
                this.y[i] -= this.speed[i] * 7 * deltaTime;
            }
            if(this.y[i] < 10) {
                this.alive[i] = false;
            }
            if(this.type[i] == "orange") {
                foodPic = this.orange;
            }
            else {
                foodPic = this.blue;
            }
            ctxDown.drawImage(foodPic, this.x[i]-this.size[i] * 0.5, this.y[i]-this.size[i] * 0.5, 
                this.size[i], this.size[i]);
        }
        
    }
};
fruitObj.prototype.born = function(i) {
    
    var typeRatio = Math.random();
    this.aneId[i] = Math.floor(Math.random() * ane.num);
    this.y[i] = ane.headY[this.aneId[i]];
    this.size[i] = 0;
    this.alive[i] = true;
    if(typeRatio < 0.8) {
        this.type[i] = "orange";
    }
    else{
        this.type[i] = "blue"
    }

}
fruitObj.prototype.die = function(i) {
    this.alive[i] = false;
}
function fruitMonitor() {
    var count = 0;
    for(var i = 0; i<fruit.num; i++) {
        if(fruit.alive[i]) count++;
    }
    if(count < 15) {
        //产生新的食物
        generateFood();
    }
}
function generateFood() {
    for(var i =0; i < fruit.num; i++) {
        if(!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}
