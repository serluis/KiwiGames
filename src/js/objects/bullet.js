'use strict';

function Bullet(game, posX, posY) {
    Phaser.Sprite.call(this, game, posX, posY, 'bullet');
    game.add.existing(this);
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.constructor = Bullet;

module.exports = Bullet;