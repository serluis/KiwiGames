'use strict';
const Character = require('./character.js');
var config = require('./config.js');

const speed = 75;

function Enemy(game, x, y, imgName, player) {
    Character.call(this, game, x, y, imgName);

    this.speed = speed;
    this.maxHealth = 90;
    this.timePerAttack = 2000; // ataca cada X milisegundos
    this.lastAttack = 0; // tiempo desde el ultimo ataque

    this.pDmg = this.game.add.audio('Pdolor'); // el player recibe daño
    this.pDmg.volume = config.entityVolume;
    this.player = player;
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.constructor = Enemy;

Enemy.prototype.update = function () {
    this.rotation = this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
}

Enemy.prototype.attack = function () {
    if (Date.now() - this.lastAttack > this.timePerAttack) {
        this.lastAttack = Date.now();
        this.damage = 20 + config.dmgScale;
        console.log(this.damage);
        this.pDmg.play();
    }
    else {
        this.damage = 0;
    }
}

module.exports = Enemy;