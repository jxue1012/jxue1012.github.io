var canUp,
    canDown,
    ctxUp,
    ctxDown,
    canWidth,
    canHeight,

    gameOn = false,
    cover,//UI
    playButton = document.getElementById("playButton"),

    lastTime,
    deltaTime,

    mx,
    my,

    bgPic = new Image(),

    ane,
    fruit,

    mom,
    momTails = [],
    momEyes = [],
    momBodyOrange = [],
    momBodyBlue = [],
   
    baby,
    babyTails = [],
    babyEyes = [],
    babyBodies = [],

    wave,//特效
    feedWave,
    dust,
    dustPic = [],

    data;
    

document.body.onload = game;
function game() {
    init();
    lastTime = Date.now();
    gameloop();
}

function init() {
    //获取canvas context
    canUp = document.getElementById("layerUp");
    canDown = document.getElementById("layerDown");
    ctxUp = canUp.getContext("2d");
    ctxDown = canDown.getContext("2d");
    canWidth = canUp.width;
    canHeight = canUp.height;

    ctxUp.fillStyle = "white";
    ctxUp.font = "30px Verdana";
    ctxUp.textAlign = "center";

    cover = new Image();
    cover.src = "./assets/images/cover.png";
    //事件
    canUp.addEventListener("mousemove", onMouseMove,false);
    playButton.addEventListener("click", onClick, false);

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    bgPic.src = "./assets/images/background.jpg";

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();
    //init momObj
    mom = new momObj();
    mom.init();
    for(var i = 0; i < 8; i++) {
        momTails[i] = new Image();
        momTails[i].src = "./assets/images/bigTail" + i + ".png";
    }
    for(var i = 0; i < 2; i++) {
        momEyes[i] = new Image();
        momEyes[i].src = "./assets/images/bigEye" + i + ".png";
    }
    for(var i = 0; i < 8; i++) {
        momBodyOrange[i] = new Image();
        momBodyOrange[i].src = "./assets/images/bigEat" + i + ".png";
    }
    for(var i = 0; i < 8; i++) {
        momBodyBlue[i] = new Image();
        momBodyBlue[i].src = "./assets/images/bigEatBlue" + i + ".png";
    }
    //init babyObj
    baby = new babyObj();
    baby.init();
    for(var i = 0; i < 8; i++) {
        babyTails[i] = new Image();
        babyTails[i].src = "./assets/images/babyTail" + i + ".png";
    }
    for(var i = 0; i < 2; i++) {
        babyEyes[i] = new Image();
        babyEyes[i].src = "./assets/images/babyEye" + i + ".png";
    }
    for(var i = 0; i < 20; i++) {
        babyBodies[i] = new Image();
        babyBodies[i].src = "./assets/images/babyFade" + i + ".png";
    }
    //特效
    wave = new waveObj();
    wave.init();

    feedWave = new feedWaveObj();
    feedWave.init();

    dust = new dustObj();
    dust.init();
    
    for(var i=0; i<7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./assets/images/dust" + i + ".png";
        
    }
    //数据统计
    data = new dataObj();
    
}

function gameloop() {
    requestAnimationFrame(gameloop);
    if(!gameOn) {
        drawStart();
        return;
    }

    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 50) deltaTime = 50;

    
    gameController();
    drawBackground();
    ane.draw();
    dust.draw();
    fruitMonitor();
    fruit.draw();

    ctxUp.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    data.draw();
    wave.draw();
    feedWave.draw();

   
}

function onMouseMove(e) {
    if(!data.gameOver) {
        if(e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
    
}

function onClick() {
    gameOn = true;
    data.gameOver = false;
    console.log(data.gameOver);
    playButton.style.visibility = "hidden";
}
