'use strict'

var STORAGE_KEY = 'my-meme';
var gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

// let gCurrentSahpe;
// let gCurrentColor;
// let gCurrOutlineColor;
var gElCanvas;
var gCtx;
var gStartPos;

var gGallery = [{ id: 1, url: 'sqr-img/1.jpg', keywords: ['speach', 'dictators', 'smug'] }, 
                { id: 2, url: 'sqr-img/2.jpg', keywords: ['love', 'dogs', 'puppies', 'caring'] }, 
                {id: 3, url: 'sqr-img/3.jpg', keywords: ['love', 'peacfull', 'baby']}, 
                {id: 4, url: 'sqr-img/4.jpg', keywords: ['cute', 'peacfull', 'chill']}, 
                {id: 5, url: 'sqr-img/5.jpg', keywords: ['achieveness', 'baby', 'succsess']}, 
                {id: 6, url: 'sqr-img/6.jpg', keywords: ['crazy', 'hairstyle', 'passionate']}, 
                {id: 7, url: 'sqr-img/7.jpg', keywords: ['in shock', 'whatttt', 'baby']}, 
                {id: 8, url: 'sqr-img/8.jpg', keywords: ['cunning', 'magician', 'patience']}, 
                {id: 9, url: 'sqr-img/9.jpg', keywords: ['evil', 'freak', 'baby']}, 
                {id: 10, url: 'sqr-img/10.jpg', keywords: ['happy', 'laugh', 'smile']}];

var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{ txt: 'I never eat Falafel', posY: 0, size: 20, align: 'left', fillColor: 'red', outlineColor: 'red' }]
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function getPicById(id) {
    // console.log(id)
   var currPic = gGallery.find(photo => photo.id === id);
    
    // console.log(currPic);
    return currPic;
}

function getMemeTxt() {
    return gMeme.lines.txt;
}

function getMemeFillClr() {
    return gMeme.lines.fillColor;
}

function getMemeOutlineClr() {
    return gMeme.lines.outlineColor;
}

function updateMeme(txt, posY, fillColor, outlineColor) {
    gMeme.lines.txt = txt;
    gMeme.lines.size = txt.length;
    gMeme.posY = posY;
    gMeme.lines.fillColor = fillColor;
    gMeme.lines.outlineColor = outlineColor;
}



function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderCanvas();
    });
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);

    gElCanvas.addEventListener('mousedown', onDown);

    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);

    gElCanvas.addEventListener('touchstart', onDown);

    gElCanvas.addEventListener('touchend', onUp);
}


function isShapeClicked(clickedPos) {
    const { pos } = gCurrentSahpe;
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2);
    return distance <= gCurrentSahpe.size;

}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    };

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        };
    };
    return pos;
}


function onMove(ev) {
    if (gCircle.isDragging) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;

        gCircle.pos.x += dx;
        gCircle.pos.y += dy;

        gStartPos = pos;
        renderCanvas();
        renderShape();
    }
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isShapedClicked(pos)) return;
    gCircle.isDragging = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';

}

function onUp() {
    gCurrentSahpe.isDragging = false;
    document.body.style.cursor = 'grab';
}

function onMove(ev) {
    if (gCurrentSahpe.isDragging) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;

        gCurrentSahpe.pos.x += dx;
        gCurrentSahpe.pos.y += dy;

        gStartPos = pos;
        renderCanvas();
        renderShape();
    };
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isShapeClicked(pos)) return;
    gCurrentSahpe.isDragging = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';

}

