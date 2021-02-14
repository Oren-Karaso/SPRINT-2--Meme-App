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
    var elPhotosContainer = document.querySelector('.img-gallery').style;
    var elTitle = document.querySelector('.h2-gallery').style;
    elPhotosContainer.visibility = 'hidden';
    elTitle.visibility = 'hidden';
    updateMemeId(photoId);
    drawImg(currPhoto.url);
}

function onSave(ev) {
    ev.preventDefault();
    if (gLinesOnScreen === 3) return console.log('Too many text lines');

    var elMeme = document.getElementById('meme-txt').value;
    if (elMeme === '' || (/^\s/.test(elMeme))) return console.log('No Name was entered');

    var elColor = document.getElementById('color').value;
    var elOutline = document.getElementById('color-outline').value;
    var posY = 40;
    var posX = (gElCanvas.width) / 2;

    var currMeme = getCurrLine();
    if (currMeme.txt !== '') {
        var meme = {
            txt: elMeme, posY: posY, posX: posX, size: 40, align: 'center',
            fillColor: elColor, outlineColor: elOutline, font: 'Impact'
        };
        makeMeme(meme);
    } else {
        updateMeme(elMeme, posY, posX, elColor, elOutline);
    }
    document.getElementById('meme-txt').value = '';
    document.getElementById('meme-txt').placeholder = 'Your Meme...';
    drawText();
}

function onSwitchLines() {
    switchLine();
}

function onChangeAlignment(el) {
    var currMeme = getCurrLine();
    switch (el.dataset.align) {
        case 'ltr': currMeme.align = 'left';
            break;
        case 'rtl': currMeme.align = 'right';
            break;
        case 'center': currMeme.align = 'center';
    }

    var currPic = getPicById(gMeme.selectedImgId);
    drawImg(currPic.url);

    setTimeout(() => {

        gMeme.lines.map(meme => {
            drawText();
            switchLine();
        });
    }, 0)
}

function onMoveText(elBtn) {
    var currMeme = getCurrLine();
    elBtn = elBtn.dataset.direction;

    if (elBtn === 'down') {
        if (!(currMeme.posY + 10 < gElCanvas.height)) return console.log('Not enough space');

        updateMemePosXY(currMeme.posX, currMeme.posY + 10);

    } else if (elBtn === 'up') {
        if (!(currMeme.posY - 10 > 40)) return console.log('Not enough space');

        updateMemePosXY(currMeme.posX, currMeme.posY - 10);

    } else if (elBtn === 'right') {
        if (!(currMeme.posX + 10 < gElCanvas.width - 80)) return console.log('Not enough space');

        updateMemePosXY(currMeme.posX + 10, currMeme.posY);

    } else if (elBtn === 'left') {
        if (!(currMeme.posX - 10 > 70)) return console.log('Not enough space');

        updateMemePosXY(currMeme.posX - 10, currMeme.posY);
    }

    gCtx.save();
    var currPic = getPicById(gMeme.selectedImgId);
    drawImg(currPic.url);

    setTimeout(() => {

        gMeme.lines.map(meme => {
            drawText();
            switchLine();
        });
    }, 0)
}

function onChangeSize(elBtn) {
    if (elBtn.dataset.size === '+') updateTxtSize('+');
    else updateTxtSize('-');

    gCtx.save();
    var currPic = getPicById(gMeme.selectedImgId);
    drawImg(currPic.url);

    setTimeout(() => {

        gMeme.lines.map(meme => {
            drawText();
            switchLine();
        });
    }, 0)
}

function onDownloadCanvas(elLink) {

    var imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function drawText() {

    var currMeme = getCurrLine();

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = currMeme.outlineColor;
    gCtx.fillStyle = currMeme.fillColor;
    gCtx.font = `${currMeme.size}px Impact`;
    gCtx.textAlign = currMeme.align;
    gCtx.fillText(currMeme.txt, currMeme.posX, currMeme.posY);
    gCtx.strokeText(currMeme.txt, currMeme.posX, currMeme.posY);
}

function drawImg(url) {
    const elImg = new Image()
    elImg.src = url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onFilter(ev) {
    ev.preventDefault();
    var elWord = document.getElementById('search').value;
    console.log('elWord:', elWord);
    var wordIdxesArray = filterByKeyword(elWord);
    console.log('array:', wordIdxesArray);
    var strHtml = '';
    wordIdxesArray.map(img => {
        strHtml += `<div class="pic pic${img.id}" data-id="${img.id}" onclick="onChoosePic(this)">
                <img src="sqr-img/${img.id}.jpg">
                </div>`
    });
    document.querySelector('.img-gallery').innerHTML = strHtml;
}

function clearCanvas(ev) {
    ev.preventDefault();
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    var currPic = getPicById(gMeme.selectedImgId);

    gCtx.save();
    deleteCurrMeme();

    var currPic = getPicById(gMeme.selectedImgId);
    drawImg(currPic.url);

    setTimeout(() => {

        gMeme.lines.map(meme => {
            drawText();
            switchLine();
        });
    }, 0)
}

function renderCanvas() {
    gCtx.fillStyle = "antiquewhite";
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function renderPhotos() {
    var strHtml = '';
    gGallery.map((img) => {
        strHtml += `<div class="pic pic${img.id}" data-id="${img.id}" onclick="onChoosePic(this)">
        <img src="sqr-img/${img.id}.jpg">
        </div>`
    });
    document.querySelector('.img-gallery').innerHTML = strHtml;
    document.querySelector('.img-gallery').style = 'visible';
    document.getElementById('search').style = 'visible';
}

