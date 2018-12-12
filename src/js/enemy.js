'use strict';
const Character = require('./character.js');

function Enemy(game, x, y, imgName) {
    //Phaser.Sprite.call(this, game, x, y, imgName);
    Character.call(this, game, x, y, imgName);
    this.scale.setTo(0.25, 0.25);
    //game.add.existing(this);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.constructor = Enemy;


module.exports = Enemy;