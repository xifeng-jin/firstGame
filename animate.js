function showNumAnimate(i,j,randNum) {
    var numCell = $('#num-cell-'+i+'-'+j);
    numCell.css('background-color',getbgColor(randNum));
    numCell.css('color',getColor(randNum));
    numCell.text(randNum);

    numCell.animate({
        'width':'100px',
        'height':'100px',
        'top':gridTop(i),
        'left':gridLeft(j)
    },50)
}
function showMoveAnimate(fromx,fromy,tox,toy) {
    var numCell = $('#num-cell-'+fromx+'-'+fromy);
    numCell.animate({
        'top':gridTop(tox),
        'left':gridLeft(toy)
    },200)
}