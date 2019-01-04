'use strict';

const Player = require('./player.js');
var config = require('./config.js');

const fireRate = 0;
const bulletSpeed = 350;
const bulletLife = 700;
const timePerShoot = 650;


function Berserker(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);

    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.timePerShoot = timePerShoot;
    this.weapon.bulletAngleVariance = 15;
    this.weapon.multiFire = true;
    this.weapon.fireLimit = 5;
    this.damage = 15;
    this.shoot = this.game.add.audio('shotgun2');
    this.shoot.volume = config.shotsVolume;
}

Berserker.prototype = Object.create(Player.prototype);
Berserker.constructor = Berserker;

Berserker.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        if (this.controls.shoot.active) {
            if (Date.now() - this.lastShoot > this.timePerShoot) {
                this.lastShoot = Date.now();
                this.weapon.fireAtPointer();
                this.weapon.fireAtPointer();
                this.weapon.fireAtPointer();
                this.weapon.fireAtPointer();
                this.weapon.fireAtPointer();
                this.shoot.play();
                this.weapon.resetShots();
            }
        }
    }
}

module.exports = Berserker;