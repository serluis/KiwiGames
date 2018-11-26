'use strict';

function Enemy(game, posX, posY) {
    Phaser.Sprite.call(this, game, posX, posY, 'enemy');
    game.add.existing(this);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.constructor = Enemy;


module.exports = Enemy;