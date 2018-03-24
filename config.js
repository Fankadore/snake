"use strict";

const TILE_SIZE = 16;
const WIDTH = TILE_SIZE * 12;
const HEIGHT = TILE_SIZE * 12;
const GAME_COLUMNS = Math.floor(WIDTH / TILE_SIZE) - 1;
const GAME_ROWS = Math.floor(HEIGHT / TILE_SIZE) - 1;

const FRAMERATE = 1000/1;
const START_X = 5;
const START_Y = 5;