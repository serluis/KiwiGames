'use strict'
const Enemy= require('./enemy.js');

function Boss(game, x, y, imgName,player){
    Enemy.call(this,game,x,y,imgName);
    this.speed=35;
    this.health = this.health * 10;
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.rotation = this.game.physics.arcade.angleToPointer(player);
}

Boss.prototype = Object.create(Enemy.prototype);
Boss.constructor = Boss;

Boss.prototype.attack = function () {
    if (Date.now() - this.lastAttack > this.timePerAttack) {
        this.lastAttack = Date.now();
        this.damage = 50;
        this.pDmg.play();
    }
    else {
        this.damage = 0;
    }
}

module.exports = Boss;
