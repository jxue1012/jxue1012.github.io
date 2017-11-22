var feedWaveObj = function() {
    this.x = [];
    this.y = [];
    this.free = [];
    this.r = [];
}

feedWaveObj.prototype.num = 10;

feedWaveObj.prototype.init = function() {
    for(var i=0; i<feedWave.num; i++) {
        this.free[i] = true;
        this.x[i] = 0;
        this.y[i] = 0;
        this.r[i] = 0;
    }
}

feedWaveObj.prototype.reset = function(i) {
    this.x[i] = 0;
    this.y[i] =0;
    this.r[i] = 0;
    this.free[i] = true;
}
feedWaveObj.prototype.draw = function() {
    ctxUp.save();
    ctxUp.lineWidth = 2;
    ctxUp.shadowBlur = 10;
    ctxUp.shadowColor = "white";
    for(var i=0; i<feedWave.num; i++) {
        if(!this.free[i]) {
            this.r[i] += deltaTime * 0.05;
            var alpha = 1 - this.r[i]/100;
            if(this.r[i] > 100) {
                feedWave.reset(i);
            }
            ctxUp.beginPath();
            ctxUp.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctxUp.closePath();
            
            ctxUp.strokeStyle = "rgba(255,125, 0," + alpha + ")";
            ctxUp.stroke();
        }
    }
    ctxUp.restore();
}

feedWaveObj.prototype.born = function(x, y) {
    for(var i=0; i<feedWave.num; i++) {
        if(this.free[i]) {
            this.x[i] = x;
            this.y[i] = y;
            this.free[i] = false;
            return;
        }
    }
}


