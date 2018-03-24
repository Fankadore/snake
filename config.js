"use strict";

const TILE_SIZE = 32;
const WIDTH = TILE_SIZE * 12;
const HEIGHT = TILE_SIZE * 12;
const GAME_COLUMNS = Math.floor(WIDTH / TILE_SIZE) - 1;
const GAME_ROWS = Math.floor(HEIGHT / TILE_SIZE) - 1;

const FRAMERATE = 1000/1;       // updates per second (ms)
const START_X = 5;              // x position for snake head to start (grid)
const START_Y = 5;              // y position for snake head to start (grid)
const FOOD_RESETRATE = 2000;    // time for food to reset after being eaten (ms)