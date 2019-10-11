function gridTop(i) {
    return 20+i*120;
}
function gridLeft(j) {
    return 20+j*120;
}
function getbgColor(number) {
    switch (number) {
        case 2:return "#f6e58d";break;
        case 4:return "#ffbe76";break;
        case 8:return "#f9ca24";break;
        case 16:return "#7ed6df";break;
        case 32:return "#22a6b3";break;
        case 64:return "#be2edd";break;
        case 128:return "#686de0";break;
        case 256:return "#30336b";break;
        case 512:return "#95afc0";break;
        case 1024:return "#dff9fb";break;
        case 2048:return "#95afc0";break;
        case 4096:return "#badc58";break;
        case 8192:return "#535c68";break;
    }
    return "black";
}
function getColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}
function nospace(board) {
    for (var i=0;i<4;i++)
        for (var j=0;j<4;j++){
            if ( board[i][j]  == 0 )
                return false;
        }
    return true;
}
function canMoveLeft(board) {
    //alert('1')
    for (var i = 0; i < 4; i++) {
        for (var j=1;j<4;j++){
            if (board[i][j] !=0) {
                if (board[i][j-1]==0 || board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveup(board) {
    //alert('1')
    for (var j=0;j<4;j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0){
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveright(board) {
    //alert('1')
    for (var i=0;i<4;i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j+1] ==0 || board[i][j+1] == board[i][j] ) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMovedown(board) {
    //alert('1')
    for (var j=0;j<4;j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i+1][j] ==0 || board[i+1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function noblockhorizontal(row, col1, col2, board) {

    //col1加1的目的是为了判断空格子是否没有，如果不加1，则会造成当两个紧挨的时候判断为false从而进不了循环
    for (var i=col1+1;i<col2;i++){
        if ( board[row][i] !=0){
            return false;
        }
    }
    return true;
}
function noblockvertical(col, row1, row2, board) {
    //                      j,    i,    k,  board
    for (var i=row1+1;i<row2;i++){
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}
function nomove(board) {
    if (canMovedown(board) ||
        canMoveLeft(board) ||
        canMoveLeft(board) ||
        canMoveright(board)) {
        return false;
    }
    return true;
}
function updatescore(score) {
    $("#score").text(score);
}
function maxscore() {
    for (var i=0;i<4;i++){
        for (var j=0;j<4;j++){
            var numCell = $('#num-cell-'+i+'-'+j);
            //console.log(numCell.text())
            var maxnum = numCell.text();
            if (maxnum >=32) {
                return true;
            }
        }
    }
    return false;
}
