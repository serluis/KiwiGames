'use strict';
const Character = require('./character.js');

const speed = 75;

function Enemy(game, x, y, imgName, player) {
    Character.call(this, game, x, y, imgName);

    this.speed = speed;

    this.timePerAttack = 3000; // ataca cada X milisegundos
    this.lastAttack = Date.now(); // tiempo desde el ultimo ataque

    this.pDmg = this.game.add.audio('Pdolor'); // el player recibe daño

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
        this.damage = 20;
        this.pDmg.play();
    }
    else {
        this.damage = 0;
    }
}

module.exports = Enemy;