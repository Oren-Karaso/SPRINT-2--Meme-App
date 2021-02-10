'use strict'

function loadFromStorage(key) {
    var json = localStorage.getItem(key);
    var value = JSON.parse(json);
    return value;    
}
function saveToStorage(key, value) {
    var json = JSON.stringify(value);
    localStorage.setItem(key, json);    
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme);
}