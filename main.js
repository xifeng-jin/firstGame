var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(document).ready(function () {
    //开始新的游戏
    newgame();
});
function newgame() {
    //初始化表格
    init();
    //随机产生两个数字
    generateNumber();
    generateNumber();
}
function init() {
    for (var i=0;i<4;i++)
        for (var j=0;j<4;j++) {
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top',gridTop(i));
            gridCell.css('left',gridLeft(j));
        }
    for (var i=0;i<4;i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j=0;j<4;j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateNum();
    score = 0;
}
function updateNum() {
    $('.num-cell').remove();
    for (var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            $('.grid').append('<div class="num-cell" id="num-cell-'+i+'-'+j+'"></div>');
            var numCell = $('#num-cell-'+i+'-'+j);

            if (board[i][j] == 0) {
                numCell.css('width','0');
                numCell.css('height','0');
                numCell.css('top',gridTop(i)+50);
                numCell.css('left',gridLeft(j)+50)
            }else {
                numCell.css('width','100px');
                numCell.css('height','100px');
                numCell.css('top',gridTop(i));
                numCell.css('left',gridLeft(j));
                numCell.css('background-color',getbgColor(board[i][j]));
                numCell.css('color',getColor(board[i][j]));
                numCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
}
function generateNumber() {
    //判断能不能生成数字
    if (nospace( board ))
        return false;
    //生成一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    //生成数字区域是否已经有了新的数字 如果有那么重新生成
    var index = 0;
    while ( index <50) {
        if (board[randx][randy]==0)
            break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
        index ++;
    }
    if (index == 50) {
        for (var i=0;i<4;i++){
            for (var j=0;j<4;j++){
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                    index = 0;
                }
            }
        }
    }
    //50%的概率生成2和4
    var randNum = Math.random()<0.5 ? 2:4;
    //对位置赋值
    board[randx][randy] = randNum;
    //动画显现
    showNumAnimate(randx,randy,randNum);
    return true;
}
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://左
            if ( moveleft()) {
                setTimeout("generateNumber()",210);
                setTimeout("isgameOver()",300);
            }
            //alert('1')
            break;
        case 38://上
            if ( moveup()) {
                setTimeout("generateNumber()",210);
                setTimeout("isgameOver()",300);
            }
            break;
        case 39://右
            if ( moveright()) {
                setTimeout("generateNumber()",210);
                setTimeout("isgameOver()",300);
            }
            break;
        case 40://下
            if ( movedown()) {
                setTimeout("generateNumber()",210);
                setTimeout("isgameOver()",300);
            }
            break;
    }
});

function isgameOver() {
    if (nomove(board)){
        gameover();
    }
    else if (maxscore()) {
        alert("Victory!!" +
            "512");
        score  = 0;
        $('#score').text(score);
    }

}
function gameover() {
    alert("Game Over!!");
    score  = 0;
    $('#score').text(score);
}
function moveleft() {
    if(!canMoveLeft(board)){
        return false;
    }
    //alert('1')
    for (var i=0;i<4;i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noblockhorizontal(i, k, j, board)) {
                        //移动

                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //alert('1')
                        showMoveAnimate(i, j, i, k);
                        continue;
                    }
                    if (board[i][k] == board[i][j] && noblockhorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //移动
                        //add
                        board[i][k] = board[i][k]+board[i][j];
                        board[i][j] = 0;
                        showMoveAnimate(i, j, i,k);

                        //add score
                        score +=board[i][k];
                        updatescore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }

                }
                //for (var n=0;n<j;n++){
                //
                //}
            }
        }
    }
    setTimeout("updateNum()",200);
    return true;
}
function moveright() {
    if(!canMoveright(board)){
        return false;
    }
    //alert('1')
    for (var i=0;i<4;i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k >j; k--) {
                    if (board[i][k] == 0 && noblockhorizontal(i, j, k, board)) {
                        //移动

                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //alert('1')
                        showMoveAnimate(i, j, i, k);
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noblockhorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimate(i, j, i, k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score +=board[i][k];
                        updatescore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateNum()",200);
    return true;
}
function moveup() {
    if(!canMoveup(board)){
        return false;
    }
    //alert('1')
    for (var j=0;j<4;j++) {
        for (var i = 1; i<4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noblockvertical(j, k, i, board)) {
                        //移动

                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        //alert('1')
                        showMoveAnimate(i, j, k, j);
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noblockvertical(j, k, i, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimate(i, j, k, j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score +=board[i][k];
                        updatescore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateNum()",200);
    return true;
}
function movedown() {
    if(!canMovedown(board)){
        return false;
    }
    //alert('1')
    for (var j=0;j<4;j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k=i+1;k<4;k++) {
                    if (board[k][j] == 0 && noblockvertical(j, i, k, board)) {
                        //移动

                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        //alert('1')
                        showMoveAnimate(i, j, k, j);
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noblockvertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimate(i, j, k, j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score +=board[i][k];
                        updatescore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateNum()",200);
    return true;
}

