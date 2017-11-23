var board = [];
var score = 0;
var hasConflict=[];
var startX;
var startY;
var endX;
var endY;

window.onload = function() {
    prepareForMobile();
    newGame();
}

function prepareForMobile() {

    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width', gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02* gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02* cellSideLength);
    
}
function newGame() {
     //初始化棋盘格
     init();
     //随机两个格子生成数字
     generateOneNumber();
     generateOneNumber();
}

function init() {
    for(var i=0; i<4; i++) {
        for(var j=0;j<4;j++) {
            var gridCell = $("#grid-cell-" + i +"-" + j);
            gridCell.css('top', getPosTop(i,j));
            gridCell.css('left', getPosLeft(i,j));
        }
    }      
    
    for(var i=0; i<4; i++) {
       board[i] = [];
       hasConflict[i] = [];
       for(var j=0;j<4;j++) {
           board[i][j] = 0;
           hasConflict[i][j]=false;
       }
    }  
    
    updateBoardView();

    score=0;
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            var x= "<div class='number-cell'";
            var id = "id=number-cell-" + i + '-' + j;
            $("#grid-container").append(x + id + '></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);
            
            if(board[i][j]==0){
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("top", getPosTop(i,j) + cellSideLength/2);
                theNumberCell.css("left", getPosLeft(i,j)+cellSideLength/2);
            }
            else{
                theNumberCell.css("width", cellSideLength);
                theNumberCell.css("height", cellSideLength);
                theNumberCell.css("top", getPosTop(i,j));
                theNumberCell.css("left", getPosLeft(i,j));
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflict[i][j]=false;
        }
        $('.number-cell').css('line-height', cellSideLength + 'px');
        $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');

}

function generateOneNumber(){
    
    if(nospace(board)) return false;

    //随机一个位置
    var randx=parseInt(Math.floor(Math.random() * 4));
    var randy=parseInt(Math.floor(Math.random() * 4));

    var times=0;
    while(times<50){
        if(board[randx][randy] == 0)
            break;
        
        randx=parseInt(Math.floor(Math.random() * 4));
        randy=parseInt(Math.floor(Math.random() * 4));

        times++;
    }
    if(times==50){
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++){
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:  //left
            event.preventDefault();
            if(moveLeft()){
                generateOneNumber();
                setTimeout("isGameOver()",300);
            }
            break;
        case 38:  //up
            event.preventDefault();
            if(moveUp()){
                generateOneNumber();
                setTimeout("isGameOver()",300);
            }
            break;
        case 39:  //right
            event.preventDefault();
            if(moveRight()){
                generateOneNumber();
                setTimeout("isGameOver()",300);
            }
            break;
        case 40:  //down
            event.preventDefault();
            if(moveDown()){
                generateOneNumber();
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break;
    }
});

document.addEventListener("touchstart", function(event){
    startX=event.touches[0].pageX;
    startY=event.touches[0].pageY;
})

document.addEventListener("touchend", function(event){
    endX=event.changedTouches[0].pageX;
    endY=event.changedTouches[0].pageY;

    deltaX=endX-startX;
    deltaY=endY-startY;

    if(Math.abs(deltaX) < 0.3 * documentWidth && Math.abs(deltaY) < 0.3* documentWidth)
        return;

    if(Math.abs(deltaX) >= Math.abs(deltaY)){
        if(deltaX > 0) {
            //move right
            if(moveRight()){
                generateOneNumber();
                setTimeout("isGameOver()",300);
            }
        }
        else{
            //move left
            if(moveLeft()){
                generateOneNumber();
                setTimeout("isGameOver()",300);
            }
        }
    }
    else{
        if(deltaY > 0){
            //move down
            if(moveDown()){
                generateOneNumber();
                setTimeout("isGameOver()",300);
            }
        }
        else{
            //move up
            if(moveUp()){
                generateOneNumber();
                setTimeout("isGameOver()",300);
            }
        }
    }
})
function isGameOver() {
    if(nospace(board) && nomove(board)){
        gameOver();
    }
}

function gameOver(){
    $('#score').text(score +" *GameOver*");
    console.log('gameOver');
}
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }

    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++){
            if(board[i][j] !=0){
                for(var k=0;k<j;k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue; 
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflict[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }

    for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--){
            if(board[i][j] !=0){
                for(var k=3;k>j;k--){
                    if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue; 
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflict[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }

    for(var i=1;i<4;i++)
        for(var j=0;j<4;j++){
            if(board[i][j] !=0){
                for(var k=0;k<i;k++){
                    if(board[k][j] == 0 && noBlockVertical(k,i,j,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue; 
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(k,i,j,board) && !hasConflict[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflict[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }

    for(var i=2;i>=0;i--)
        for(var j=0;j<4;j++){
            if(board[i][j] !=0){
                for(var k=3;k>i;k--){
                    if(board[k][j] == 0 && noBlockVertical(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue; 
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(i,k,j,board) && !hasConflict[k][j]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflict[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}