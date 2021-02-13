'use strict'

var STORAGE_KEY = 'my-meme';
var gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

var gElCanvas;
var gCtx;
var gStartPos;
var gLinesOnScreen = 1;

var gGallery = [{ id: 1, url: 'sqr-img/1.jpg', keywords: ['speach', 'dictators', 'smug'] },
{ id: 2, url: 'sqr-img/2.jpg', keywords: ['love', 'dogs', 'puppies', 'caring'] },
{ id: 3, url: 'sqr-img/3.jpg', keywords: ['love', 'peacfull', 'baby'] },
{ id: 4, url: 'sqr-img/4.jpg', keywords: ['cute', 'peacfull', 'chill'] },
{ id: 5, url: 'sqr-img/5.jpg', keywords: ['achieveness', 'baby', 'succsess'] },
{ id: 6, url: 'sqr-img/6.jpg', keywords: ['crazy', 'hairstyle', 'passionate'] },
{ id: 7, url: 'sqr-img/7.jpg', keywords: ['in shock', 'whatttt', 'baby'] },
{ id: 8, url: 'sqr-img/8.jpg', keywords: ['cunning', 'magician', 'patience'] },
{ id: 9, url: 'sqr-img/9.jpg', keywords: ['evil', 'freak', 'baby'] },
{ id: 10, url: 'sqr-img/10.jpg', keywords: ['happy', 'laugh', 'smile'] },
{ id: 11, url: 'sqr-img/11.jpg', keywords: ['hug', 'weird', 'whatttt'] },
{ id: 12, url: 'sqr-img/12.jpg', keywords: ['i choose you', 'achieveness', 'speach'] },
{ id: 13, url: 'sqr-img/13.jpg', keywords: ['cheers', 'health', 'champagne'] },
{ id: 14, url: 'sqr-img/14.jpg', keywords: ['matrix', 'what if', 'choose'] },
{ id: 15, url: 'sqr-img/15.jpg', keywords: ['this', 'small', 'look'] },
{ id: 16, url: 'sqr-img/16.jpg', keywords: ['joking', 'shy', 'smile'] },
{ id: 17, url: 'sqr-img/17.jpg', keywords: ['counting', 'dictator', 'this much'] },
{ id: 18, url: 'sqr-img/18.jpg', keywords: ['infinity', 'hope', 'dreams'] }];

var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{ txt: '', posY: 0, posX: 0, size: 40, align: 'center', fillColor: '', outlineColor: '', font: 'Impact' }]
}

function loadMemes() {
    var memes = loadFromStorage(STORAGE_KEY);
    if (memes.lines.length > 1) gMeme.lines = meme.lines;
    _saveMemeToStorage();
}

function makeMeme(meme) {
    gMeme.lines.push(meme);
    gMeme.selectedLineIdx++;
    _saveMemeToStorage();
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

function getCurrMeme() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function switchLine() {
    if (gLinesOnScreen === 1) return;
    else if (gMeme.selectedLineIdx + 1 !== gLinesOnScreen) gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx = 0;
}

function updateMeme(txt, posY, posX, fillColor, outlineColor) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    gMeme.lines[gMeme.selectedLineIdx].size = 40;
    gMeme.lines[gMeme.selectedLineIdx].posY = posY;
    gMeme.lines[gMeme.selectedLineIdx].posX = posX;
    gMeme.lines[gMeme.selectedLineIdx].fillColor = fillColor;
    gMeme.lines[gMeme.selectedLineIdx].outlineColor = outlineColor;
}

function updateMemeId(id) {
    gMeme.selectedImgId = id;
}

function updateSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx;
}

function updateMemePosXY(posX, posY) {
    var currMeme = getCurrMeme();
    currMeme.posY = posY;
    currMeme.posX = posX;
    _saveMemeToStorage();
}

function updateTxtSize(operator) {
    operator === '+' ? gMeme.lines[gMeme.selectedLineIdx].size++ : gMeme.lines[gMeme.selectedLineIdx].size--;
}

function deleteCurrMeme() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gLinesOnScreen--;
    gMeme.selectedLineIdx--;
    _saveMemeToStorage();
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme);
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

