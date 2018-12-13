'use strict';
const Character = require('./character.js');

function Enemy(game, x, y, imgName) {
    Character.call(this, game, x, y, imgName);
    
    this.timePerAttack = 3000; // ataca cada X milisegundos
    this.lastAttack = Date.now(); // tiempo desde el ultimo ataque

    this.pDmg = this.game.add.audio('Pdolor'); // el player recibe daño
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.constructor = Enemy;

Enemy.prototype.attack = function () {
    if (Date.now() - this.lastAttack > this.timePerAttack) {
        this.lastAttack = Date.now(); 
        this.damage = 10;
        this.pDmg.play();
    }
    else {
        this.damage = 0;
    }
}

module.exports = Enemy;