var aneObj = function() {
    this.x = [];
    this.headX = [];
    this.headY = [];
    this.beta = 0;
};
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
    for(var i = 0; i < this.num; i++) {
        this.x[i] = i * 16 + Math.random() * 20;
        this.headX[i] = this.x[i];
        this.headY[i] = canHeight - 250 + Math.random() * 50;
    }
};
aneObj.prototype.draw = function() {
    ctxDown.save();
    ctxDown.globalAlpha = 0.6;
    ctxDown.lineWidth = 20;
    ctxDown.lineCap = "round";
    ctxDown.strokeStyle = "#3b154e";
    this.beta += deltaTime * 0.001;
    for(var i = 0; i < this.num; i++) {
        this.headX[i] = this.x[i] + Math.sin(this.beta) * 40;
        ctxDown.beginPath();
        ctxDown.moveTo(this.x[i], canHeight);
        ctxDown.quadraticCurveTo(this.x[i], canHeight - 50, this.headX[i], this.headY[i]);
        ctxDown.stroke();
    }
    ctxDown.restore();
};