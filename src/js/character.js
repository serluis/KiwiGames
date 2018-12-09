'use strict';
const Entity = require('./entity');

const maxHealth = 100;

function Character(game, x, y, imgName) {
    Entity.call(this, game, x, y, imgName);
    game.physics.arcade.enable(this);
    this.scale.setTo(0.25, 0.25);
    this.body.colliderWorldBounds = true;
    this.health = 100;
    this.damage = 1;
}

Character.prototype = Object.create(Entity.prototype);
Character.prototype.constructor = Character;

Character.prototype.update = function () {

}

Character.prototype.getsDamage = function (dmg) {
    this.health = this.health - dmg;

    if (this.health <= 0) {
        this.kill();
        return true;
    }

    return false;
}

Character.prototype.heal = function (h) {
    if (h > 0 && this.health < maxHealth) {
        this.health += h;
    }
}

module.exports = Character;