function gameController() {
    if(!data.gameOver) {
        momBabyCollision();
        momFruitCollision();
    }
    else {
        playButton.style.visibility = "visible";
        baby.babyBodyCount = 0;
        data.foodNum = 0;
    }
}

function momFruitCollision() {

    for(var i = 0; i < fruit.num; i++) {

        if(fruit.alive[i]) {
            var distance = calDistance(mom.x, mom.y, fruit.x[i], fruit.y[i]);

            if(distance < 900) {
                fruit.die(i);
                wave.born(fruit.x[i], fruit.y[i]);
                mom.momBodyCount += 1;

                if(mom.momBodyCount > 7) {
                    mom.momBodyCount = 7;
                }
    
                if(fruit.type[i] === "blue") {
                    data.double = 2;
                }
                else {
                    data.foodNum += 1;
                }
            }
        }
    }
    
}

function momBabyCollision() {
    if(data.foodNum > 0) {
        var distance = calDistance(mom.x, mom.y, baby.x, baby.y);
        if(distance < 900) {
            //baby recover
            feedWave.born(baby.x, baby.y);
            baby.babyBodyCount = 0;
            mom.momBodyCount = 0;
            data.addScore();
        }
    }
    
}