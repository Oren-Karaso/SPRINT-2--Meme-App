'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

// let gCurrentSahpe;
// let gCurrentColor;
// let gCurrOutlineColor;
let gElCanvas;
let gCtx;
var gStartPos;

let gGallery = [{ id: 1, url: 'sqr-img/1.jpg', keywords: ['speach'] }];
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', fillColor: 'red', outlineColor: 'red' }]
}


function renderCanvas() {
    gCtx.fillStyle = "antiquewhite";
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}


function renderShape() {
    const { pos, color, size } = gCurrentSahpe;
    switch (gCurrentSahpe.name) {
        case 'triangle': drawTriangle(pos.x, pos.y);
            break;
        case 'rectangle': drawRect(pos.x, pos.y);
            break;
        case 'circle': drawArc(pos.x, pos.y);
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
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

// function updateColor(color) {
//     gCurrentColor = color;
// }

// function updateOutlineColor(color) {
//     gCurrOutlineColor = color;
// }

function updateMeme(txt, fillColor, outlineColor) {
    gMeme.lines.txt = txt;
    gMeme.lines.size = txt.length;
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

