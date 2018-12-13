'use strict';

const Player = require('./player.js');

const fireRate = 300;
const bulletSpeed = 350;
const bulletLife = 1500;

function Medic(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);

    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.weapon.bulletAngleVariance = 5;
    this.damage = 25;
    this.shoot = this.game.add.audio('shoot');
    console.log("Im a medic");
}

Medic.prototype = Object.create(Player.prototype);
Medic.constructor = Medic;

Medic.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        if (!this.shoot.isPlaying) {
            this.shoot.play();
        }
        this.weapon.fireAtPointer();
    }
}

module.exports = Medic;
