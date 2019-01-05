'use strict';
const Entity = require('./entity.js');

const maxHealth = 100;

function Character(game, x, y, imgName) {
    Entity.call(this, game, x, y, imgName);
    game.physics.arcade.enable(this);
    this.scale.setTo(0.20, 0.20);
    this.body.colliderWorldBounds = true;
    this.maxHealth = maxHealth;
    this.health = this.maxHealth;
    this.shield = 0;
    this.damage = 1;
    this.timePerHeal = 10000; // se puede curar cada X milisegundos
    this.lastHeal = 0; // tiempo desde la ultima curacion
}

Character.prototype = Object.create(Entity.prototype);
Character.prototype.constructor = Character;

Character.prototype.update = function () {
    if (this.shield < 0)
        this.shield = 0;
}

Character.prototype.getsDamage = function (dmg) {
    if (this.shield > 0) {
        this.shield = this.shield - dmg;
    }
    else
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
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }
}

module.exports = Character;