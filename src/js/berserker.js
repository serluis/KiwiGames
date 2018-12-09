'use strict';

const Player = require('./player.js');

const fireRate = 0;
const bulletSpeed = 350;
const bulletLife = 700;


function Berserker(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);
    
    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.weapon.bulletAngleVariance = 15;
    this.weapon.multiFire = true;
    this.weapon.fireLimit = 3;
    this.damage = 34;
    
    console.log("Im a berserker");
}

Berserker.prototype = Object.create(Player.prototype);
Berserker.constructor = Berserker;

Berserker.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        this.weapon.fireAtPointer();
        //this.weapon.fireAtPointer();
        //this.weapon.fireAtPointer();
        //this.weapon.fireOffset(0, 0);
    }

    this.weapon.resetShots();
}

module.exports = Berserker;