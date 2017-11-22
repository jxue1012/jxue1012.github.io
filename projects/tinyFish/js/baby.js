var babyObj = function() {
    this.x;
    this.y;
    this.angle = 0;

    this.babyTailsTimer = 0;
    this.babyTailsCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}
babyObj.prototype.init = function() {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
}
babyObj.prototype.draw = function() {
    //lerp x, y
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);
    //lerp angle
    var deltaX = mom.x - this.x;
    var deltaY = mom.y - this.y;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.6);
    //Animation for babyTails
    this.babyTailsTimer += deltaTime;
    if(this.babyTailsTimer > 50) {
        this.babyTailsCount = (this.babyTailsCount + 1) % 8;
        this.babyTailsTimer %= 50;
    }
    //Animation for babyEyes
    var openTime = Math.random() * 1500 + 1500;
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeCount == 0) {
        if(this.babyEyeTimer > openTime) {
            this.babyEyeTimer %= openTime;
            this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        }
    }
    else {
        if(this.babyEyeTimer > 200) {
            this.babyEyeTimer %= 200;
            this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        }
    }
    //Animation for babyBodies
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300) {
        this.babyBodyTimer %= 300;
        this.babyBodyCount = this.babyBodyCount + 1;
        if(this.babyBodyCount > 19) {
            //gameOver
            this.babyBodyCount = 19;
            data.gameOver = true;
        }
    }


    var tailIndex = this.babyTailsCount,
        eyeIndex = this.babyEyeCount;
        bodyIndex = this.babyBodyCount;
    ctxUp.save();
    ctxUp.translate(this.x, this.y);
    ctxUp.rotate(this.angle);
    ctxUp.drawImage(babyBodies[bodyIndex], -babyBodies[bodyIndex].width * 0.5, -babyBodies[bodyIndex].height * 0.5);
    ctxUp.drawImage(babyEyes[eyeIndex], -babyEyes[eyeIndex].width * 0.5, -babyEyes[eyeIndex].height * 0.5);
    ctxUp.drawImage(babyTails[tailIndex], -babyTails[tailIndex].width * 0.5 + 25, -babyTails[tailIndex].height * 0.5);
    ctxUp.restore();
}