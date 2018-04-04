"use strict";

// Snake
function Snake() {
    this.body = [new Body(Config.startX, Config.startY), new Body(Config.startX - 1, Config.startY), new Body(Config.startX - 2, Config.startY)];
    this.direction = 'right';
    this.newDirection = this.direction;
    this.speed = 1;
    this.draw();
}

function Body(x, y) {
    this.x = x;
    this.y = y
}

Snake.prototype.move = function() {
    let head = this.body[0];
    let tail = this.body[this.body.length - 1];
    let retainTailX = tail.x;
    let retainTailY = tail.y;

    // Move Body
    for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].x = this.body[i-1].x;
        this.body[i].y = this.body[i-1].y;
    }

    // Move Head
    if (this.newDirection === 'left') {
        head.x = (head.x - 1 < 0) ? Config.columns - 1 : head.x - 1;
    }
    else if (this.newDirection === 'right') {
        head.x = (head.x + 1 > Config.columns - 1) ? 0 : head.x + 1;
    }
    else if (this.newDirection === 'up') {
        head.y = (head.y - 1 < 0) ? Config.rows - 1 : head.y - 1;
    }
    else if (this.newDirection === 'down') {
        head.y = (head.y + 1 > Config.rows - 1) ? 0 : head.y + 1;
    }
    this.direction = this.newDirection;

    // Check Collision - Head with Body
    for (let currentBody of this.body) {
        if (head !== currentBody && head.x === currentBody.x && head.y === currentBody.y) {
            return gameOver();
        }
    }

    // Check Collision - Head with Food
    if (head.x === food.x && head.y === food.y) {
        this.body.push(new Body(retainTailX, retainTailY));
        if (snake.body.length >= Config.columns * Config.rows) {
            return gameOver();
        }

        this.speed += 0.1;
        food.move();
    }
};

Snake.prototype.checkCollision = function(x, y) {
    for (let currentBody of this.body) {
        if (currentBody.x === x && currentBody.y === y) {
            return true;
        }
    }
    return false;
};

Snake.prototype.draw = function() {
    ctx.strokeStyle = '#009900';
    ctx.textAlign = "center";
    ctx.font = "24px Georgia";
    this.body.forEach(function(currentBody, i) {
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(currentBody.x * Config.tileSize, currentBody.y * Config.tileSize, Config.tileSize, Config.tileSize);
        ctx.strokeRect(currentBody.x * Config.tileSize, currentBody.y * Config.tileSize, Config.tileSize, Config.tileSize);
        if (Config.showNumbers) {
            ctx.fillStyle = "#000000";
            ctx.fillText(i + 1, (currentBody.x * Config.tileSize) + (Config.tileSize / 2), (currentBody.y * Config.tileSize) + ((Config.tileSize * 3) /4));
        }
    });
};

// Food
function Food() {
    this.colour = '#ff0000';
    this.move();
    this.draw();
}

Food.prototype.move = function() {
    let randomX, randomY;
    do {
        randomX = Math.floor(Math.random() * Config.columns);
        randomY = Math.floor(Math.random() * Config.rows);
    } while (snake.checkCollision(randomX, randomY) === true);
    this.x = randomX;
    this.y = randomY;
}

Food.prototype.draw = function() {
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.x * Config.tileSize, this.y * Config.tileSize, Config.tileSize, Config.tileSize);
};