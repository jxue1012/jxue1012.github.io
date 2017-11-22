var momObj = function() {
    this.x;
    this.y;
    this.angle = 0;

    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;

    this.momBodyCount = 0;
    this.bodyPic = new Image();
}
momObj.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.bodyPic.src = "./assets/images/big.png";
}
momObj.prototype.draw = function() {
    //lerp x, y
    this.x = lerpDistance(mx, this.x, 0.98);
    this.y = lerpDistance(my, this.y, 0.98);
    //lerp angle
    var deltaX = mx - this.x;
    var deltaY = my - this.y;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.6);
    //Animation for bigTails
    this.momTailTimer += deltaTime;
    if(this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer %= 50;
    }
    //Animation for momEyes
    var openTime = Math.random() * 1500 + 1500;
    this.momEyeTimer += deltaTime;
    if(this.momEyeCount == 0) {
        if(this.momEyeTimer > openTime) {
            this.momEyeTimer %= openTime;
            this.momEyeCount = (this.momEyeCount + 1) % 2;
        }
    }
    else {
        if(this.momEyeTimer > 200) {
            this.momEyeTimer %= 200;
            this.momEyeCount = (this.momEyeCount + 1) % 2;
        }
    }

    ctxUp.save();
    var tailIndex = this.momTailCount,
        eyeIndex = this.momEyeCount;
        bodyIndex = this.momBodyCount;
    ctxUp.translate(this.x, this.y);
    ctxUp.rotate(this.angle); 

    if(data.double == 2) {
        ctxUp.drawImage(momBodyBlue[bodyIndex], -momBodyBlue[bodyIndex].width * 0.5, -momBodyBlue[bodyIndex].height * 0.5);
    }
    else {
        if(data.foodNum == 0) {
            ctxUp.drawImage(this.bodyPic, -this.bodyPic.width * 0.5, -this.bodyPic.height * 0.5);
        }
        else {
            ctxUp.drawImage(momBodyOrange[bodyIndex], -momBodyOrange[bodyIndex].width * 0.5, -momBodyOrange[bodyIndex].height * 0.5);
        }    
    }
    
    ctxUp.drawImage(momEyes[eyeIndex], -momEyes[eyeIndex].width * 0.5, -momEyes[eyeIndex].height * 0.5);
    ctxUp.drawImage(momTails[tailIndex], -momTails[tailIndex].width * 0.5 + 30, -momTails[tailIndex].height * 0.5);
    ctxUp.restore();
}