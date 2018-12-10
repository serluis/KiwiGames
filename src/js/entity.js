'use strict';

function Entity(game, x, y, imgName) {
  Phaser.Sprite.call(this, game, x, y, imgName);
  this.checkWorldBounds = true;
  game.add.existing(this);
  this.anchor.setTo(0.5, 0.5);
}

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.update = function () {
}

module.exports = Entity;