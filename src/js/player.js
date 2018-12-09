'use strict';

const Character = require('./character.js');

const speed = 150;
//const fireRate = 100;
//const bulletSpeed = 350;

//function 
function Player(game, x, y, imgName) {
    Character.call(this, game, x, y, imgName);
    
    // we create the weapon 
    this.weapon = game.add.weapon(30, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bullets.setAll('anchor.x', 0.5);
    this.weapon.bullets.setAll('anchor.y', 0.5);
    this.weapon.trackSprite(this, 0, 0, true);// the bullets come out from player
    // se puede poner un offset con los 2 numeros

    this.controls = {
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        heal: game.input.keyboard.addKey(Phaser.Keyboard.Q),
        shoot: game.input.activePointer,
    };

    this.controls.heal.onDown.add(Character.prototype.heal, this);

    console.log("Player created at POS: " + this.x + "," + this.y);
}

Player.prototype = Object.create(Character.prototype);
Player.constructor = Player;

Player.prototype.update = function () {

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.rotation = this.game.physics.arcade.angleToPointer(this) + 1.5;

    if (this.controls.up.isDown) {
        this.body.velocity.y -= speed;
    }
    if (this.controls.right.isDown) {
        this.body.velocity.x += speed;
    }
    if (this.controls.down.isDown) {
        this.body.velocity.y += speed;
    }
    if (this.controls.left.isDown) {
        this.body.velocity.x -= speed;
    }
}

Player.prototype.render = function () {
    this.weapon.debug(10, 10, true);
    console.log("Health: " + this.health);
}

module.exports = Player;