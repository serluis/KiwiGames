'use strict';
const Entity = require('./entity');

var health = 100;
var speed = 150;

function Character(game, x, y, imgName) {
    Entity.call(this, game, x, y, imgName);
    game.physics.arcade.enable(this);
    this.body.colliderWorldBounds = true;

}

Character.prototype = Object.create(Entity.prototype);
Character.prototype.constructor = Character;

Character.prototype.update = function () {

}

module.exports = Entity;