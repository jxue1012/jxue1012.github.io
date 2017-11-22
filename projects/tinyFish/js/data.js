var dataObj = function() {
    this.double = 1;
    this.foodNum = 0;
    this.gameOver = true;
    this.score = 0;
    this.alpha = 0;
}
dataObj.prototype.draw = function() {
    ctxUp.save();
    ctxUp.shadowBlur = 10;
    ctxUp.shadowColor = "white";
    //ctxUp.fillText("double: " + this.double, canWidth * 0.5, canHeight -80);
    //ctxUp.fillText("foodNum: " + this.foodNum, canWidth * 0.5, canHeight -50);
    ctxUp.fillText("Score: " + this.score, canWidth * 0.5, canHeight -80);
    if(data.gameOver) {
        this.alpha += deltaTime * 0.0002;
        if(this.alpha > 1) {
            this.alpha = 1;
        }
        ctxUp.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        ctxUp.fillText("GameOver", canWidth * 0.5, canHeight * 0.5);
    }
    ctxUp.restore();    
}
dataObj.prototype.addScore = function() {
    this.score += this.foodNum * 10 * this.double;
    this.double = 1;
    this.foodNum = 0;
}