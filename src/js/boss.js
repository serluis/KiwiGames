'use strict'
const Enemy = require('./enemy.js');
var config = require('./config.js');

function Boss(game, x, y, imgName, player) {
    Enemy.call(this, game, x, y, imgName, player);
    this.speed = 35;
    this.maxHealth = this.maxHealth * 5;
    this.health = this.maxHealth;
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.player = player;
}

Boss.prototype = Object.create(Enemy.prototype);
Boss.constructor = Boss;

Boss.prototype.attack = function () {
    if (Date.now() - this.lastAttack > this.timePerAttack) {
        this.lastAttack = Date.now();
        this.damage = 50 + config.dmgScale;
        this.pDmg.play();
    }
    else {
        this.damage = 0;
    }
}

Boss.prototype.update = function () {
    Enemy.prototype.update.call(this);
}

module.exports = Boss;
