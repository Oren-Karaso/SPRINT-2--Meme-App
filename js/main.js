'use strict'

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    console.log('init -> gCtx', gCtx);
    drawImg();
    drawText('asshole', gElCanvas.width / 2, gElCanvas.height - 10);
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


function drawText(x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = getMemeOutlineClr();
    gCtx.fillStyle = getMemeFillClr();
    gCtx.font = '40px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(getMemeTxt(), x, y);
    gCtx.strokeText(getMemeTxt(), x, y);
}


function drawImg() {
    const img = new Image()
    img.src = 'sqr-img/1.jpg';
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


function drawImgFromlocal() {
    const img = new Image()
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}


function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}