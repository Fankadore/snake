"use strict";

const canvas = document.querySelector(".game-window");
const ctx = canvas.getContext("2d");
const inputBackground = document.querySelector(".background");
const inputTileSize = document.querySelector(".tile-size");
const inputColumns = document.querySelector(".input-columns");
const inputRows = document.querySelector(".input-rows");
const buttonNewGame = document.querySelector(".new-game");

buttonNewGame.addEventListener("click", gameStart);

function changeBackground() {
    canvas.style.background = inputBackground.value;
}

function refreshTileSize() {
    if(!inputTileSize.value) return;
    inputTileSize.value = clamp(Math.floor(inputTileSize.value), 8, 128);
    inputColumns.value = "";
    inputRows.value = "";
}

function refreshColumns() {
    if (!inputColumns.value) return;
    inputColumns.value = clamp(Math.floor(inputColumns.value), 3, 24);
    inputTileSize.value = "";
}

function refreshRows() {
    if (!inputRows.value) return;
    inputRows.value = clamp(Math.floor(inputRows.value), 3, 24);
    inputTileSize.value = "";
}