'use strict'

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log('init -> gCtx', gCtx);
    renderPhotos();
}

function onChoosePic(pic) {
    var photoId = +pic.dataset.id;
    var currPhoto = getPicById(photoId);
    var elPhotosContainer = document.querySelector('.photo-gallery').style;
    var elTitle = document.querySelector('.h2-gallery').style;
    elPhotosContainer.visibility = 'hidden';
    elTitle.visibility = 'hidden';
    updateMemeId(photoId);
    drawImg(currPhoto.url);
}

function onSave(ev) {
    ev.preventDefault();

    var elColor = document.getElementById('color').value;
    var elOutline = document.getElementById('color-outline').value;
    var elMeme = document.getElementById('meme-txt').value;
    var posY = 40;
    var posX = gElCanvas.width / 2;
    var meme = {
        txt: elMeme, posY: posY, posX: posX, size: elMeme.length, align: 'center',
        fillColor: elColor, outlineColor: elOutline
    };
    makeMeme(meme);
    // updateMeme(elMeme, posY, elColor, elOutline);
    drawText(posX, posY);
}

function onMoveDown() {

}

function onMoveUp() {
    var currMeme =
        drawText(gElCanvas.width / 2,)
}


function drawText(x, y) {
    gCtx.save();

    var currMeme = getCurrMeme();

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = currMeme.outlineColor;
    gCtx.fillStyle = currMeme.fillColor;
    gCtx.font = '40px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(currMeme.txt, x, y);
    gCtx.strokeText(currMeme.txt, x, y);

}


function drawImg(url) {
    const img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    var currPic = getPicById(gMeme.selectedImgId);
    var currUrl = currPic.url;
    drawImg(currUrl);

    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height/4)
}


function renderCanvas() {
    gCtx.fillStyle = "antiquewhite";
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onMoveText(btn) {

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

function renderPhotos() {
    var strHtml = '';
    gGallery.map((photo) => {
        strHtml += `<div class="pic pic${photo.id}" data-id="${photo.id}" onclick="onChoosePic(this)" 
        style="background: url('sqr-img/${photo.id}.jpg');"></div>`
    });
    document.querySelector('.photo-gallery').innerHTML = strHtml;
}