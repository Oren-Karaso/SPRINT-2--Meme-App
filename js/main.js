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
        txt: elMeme, posY: posY, posX: posX, size: 40, align: 'center',
        fillColor: elColor, outlineColor: elOutline, font: ''
    };

    makeMeme(meme);
    // updateMeme(elMeme, posY, elColor, elOutline);
    drawText(posX, posY);
}

function onMoveText(elBtn) {        // for some reason coulnd't use gElCanvas.length in some of the conditions
    var currMeme = getCurrMeme();

    if (elBtn.innerText === '🡫') {
        if (!(currMeme.posY + 10 < gElCanvas.height)) return console.log('Not enough space');

        updateMemePosXY(currMeme.posX, currMeme.posY + 10);

    } else if (elBtn.innerText === '🡩') {
        if (!(currMeme.posY - 10 > 40)) return console.log('Not enough space');

        updateMemePosXY(currMeme.posX, currMeme.posY - 10);

    } else if (elBtn.innerText === '🡪') {
        if (!(currMeme.posX + 10 < 420)) return console.log('Not enough space');
        updateMemePosXY(currMeme.posX + 10, currMeme.posY);
        
    } else if (elBtn.innerText === '🡨') {
        if (!(currMeme.posX - 10 > 70)) return console.log('Not enough space');

        updateMemePosXY(currMeme.posX - 10, currMeme.posY);
    }

    gCtx.save();
    var currPic = getPicById(gMeme.selectedImgId);
    drawImg(currPic.url);
    drawText(currMeme.posX, currMeme.posY);
}

function onChangeSize(elBtn) {
    var currMeme = getCurrMeme();
    if (elBtn.innerText === 'A+') updateTxtSize('+');
    else updateTxtSize('-');

    gCtx.save();
    var currPic = getPicById(gMeme.selectedImgId);
    drawImg(currPic.url);
    drawText(currMeme.posX, currMeme.posY);
}

function drawText(x, y) {

    var currMeme = getCurrMeme();

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = currMeme.outlineColor;
    gCtx.fillStyle = currMeme.fillColor;
    gCtx.font = `${currMeme.size}px Impact`;
    gCtx.textAlign = currMeme.align;
    gCtx.fillText(currMeme.txt, x, y);
    gCtx.strokeText(currMeme.txt, x, y);
}

function drawImg(url) {
    const elImg = new Image()
    elImg.src = url;

    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    var currPic = getPicById(gMeme.selectedImgId);
    var currUrl = currPic.url;
    drawImg(currUrl);
}


function renderCanvas() {
    gCtx.fillStyle = "antiquewhite";
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}


// function renderShape() {
//     const { pos, color, size } = gCurrentSahpe;
//     switch (gCurrentSahpe.name) {
//         case 'triangle': drawTriangle(pos.x, pos.y);
//             break;
//         case 'rectangle': drawRect(pos.x, pos.y);
//             break;
//         case 'circle': drawArc(pos.x, pos.y);
//     }
// }

function renderPhotos() {
    var strHtml = '';
    gGallery.map((photo) => {
        strHtml += `<div class="pic pic${photo.id}" data-id="${photo.id}" onclick="onChoosePic(this)" 
        style="background: url('sqr-img/${photo.id}.jpg');"></div>`
    });
    document.querySelector('.photo-gallery').innerHTML = strHtml;
}