var waveObj = function() {
    this.x = [];
    this.y = [];
    this.free = [];
    this.r = [];
}

waveObj.prototype.num = 10;

waveObj.prototype.init = function() {
    for(var i=0; i<wave.num; i++) {
        this.free[i] = true;
        this.x[i] = 0;
        this.y[i] = 0;
        this.r[i] = 0;
    }
}

waveObj.prototype.reset = function(i) {
    this.x[i] = 0;
    this.y[i] =0;
    this.r[i] = 0;
    this.free[i] = true;
}
waveObj.prototype.draw = function() {
    ctxUp.save();
    ctxUp.lineWidth = 1.5;
    ctxUp.shadowBlur = 10;
    ctxUp.shadowColor = "white";
    for(var i=0; i<wave.num; i++) {
        if(!this.free[i]) {
            this.r[i] += deltaTime * 0.05;
            var alpha = 1 - this.r[i]/50;
            if(this.r[i] > 50) {
                wave.reset(i);
            }
            ctxUp.beginPath();
            ctxUp.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctxUp.closePath();
            
            ctxUp.strokeStyle = "rgba(255,255,255," + alpha + ")";
            ctxUp.stroke();
        }
    }
    ctxUp.restore();
}

waveObj.prototype.born = function(x, y) {
    for(var i=0; i<wave.num; i++) {
        if(this.free[i]) {
            this.x[i] = x;
            this.y[i] = y;
            this.free[i] = false;
            return;
        }
    }
}


