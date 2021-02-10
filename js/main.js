'use strict'

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log('init -> gCtx', gCtx);
    // drawImg();
}

function onSave(ev) {
    ev.preventDefault();

    var elColor = document.getElementById('color').value;
    var elOutline = document.getElementById('color-outline').value; 
    var elMeme = document.getElementById('meme-txt').value; 

    updateMeme(elMeme, elColor, elOutline);
    console.log('current meme:', gMeme);
    drawText(gElCanvas.width / 2, 40);
}

function onChoosePic(pic) {
    var photoId = +pic.dataset.id;
    var currPhoto = getPicById(photoId);
    var elPhotosContainer = document.querySelector('.photo-gallery').style;
    var elTitle = document.querySelector('.h2-gallery').style;
    elPhotosContainer.visibility = 'hidden';
    elTitle.visibility = 'hidden';
    drawImg(currPhoto.url);

}


function drawText(x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = getMemeOutlineClr();
    gCtx.fillStyle = getMemeFillClr();
    gCtx.font = '40px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(getMemeTxt(), x, y);
    gCtx.strokeText(getMemeTxt(), x, y);
}


function drawImg(url) {
    const img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}


function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    // console.log('downloadCanvas -> data', data)
    elLink.href = data
    elLink.download = 'puki'
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height/4)
}


function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}