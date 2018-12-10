'use strict';

const Player = require('./player.js');

const fireRate = 100;
const bulletSpeed = 350;
const bulletLife = 1500;

function Soldier(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);

    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.weapon.bulletAngleVariance = 5;
    this.damage = 20;
    
    console.log("Im a soldier");
}

Soldier.prototype = Object.create(Player.prototype);
Soldier.constructor = Soldier;

Soldier.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        this.weapon.fireAtPointer();
    }
}

module.exports = Soldier;
