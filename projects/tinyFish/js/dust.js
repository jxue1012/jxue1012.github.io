var dustObj = function() {
    this.x = [];
    this.dustX = [];
    this.dustY = [];
    this.num = 7;
}

dustObj.prototype.init = function() {
    for(var i =0; i<this.num; i++){
        this.x[i] = Math.random() * canWidth;
        this.dustX[i] = this.x[i];
        this.dustY[i] = Math.random() * canHeight;
    }

}
dustObj.prototype.draw = function() {
    for(var i=0; i<this.num; i++) {
        this.dustX[i] = this.x[i] + Math.sin(ane.beta) * 40;
        ctxDown.drawImage(dustPic[i], this.dustX[i], this.dustY[i]);
    }
}



