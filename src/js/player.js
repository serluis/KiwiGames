'use strict';

const Character = require('./character.js');
var config = require('./config.js');

const speed = 150;

//function 
function Player(game, x, y, imgName) {
    Character.call(this, game, x, y, imgName);
    this.scale.setTo(0.15, 0.15);
    // we create the weapon 
    this.weapon = game.add.weapon(100, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bullets.setAll('anchor.x', 0.5);
    this.weapon.bullets.setAll('anchor.y', 0.5);
    this.weapon.trackSprite(this, 0, 0, true);// the bullets come out from player
    // se puede poner un offset con los 2 numeros

    this.lastShoot = 0;
    this.speed = speed;
    this.healStat = 25;

    this.controls = {
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        heal: game.input.keyboard.addKey(Phaser.Keyboard.Q),
        shoot: game.input.activePointer,
    };

    this.shoot = this.game.add.audio('shoot');
    this.shoot.volume = config.shotsVolume;

    this.controls.heal.onDown.add(function () {
        if (Date.now() - this.lastHeal > this.timePerHeal) {
            this.lastHeal = Date.now();
            this.heal(this.healStat);
        }
    }, this);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.Q);

}

Player.prototype = Object.create(Character.prototype);
Player.constructor = Player;

Player.prototype.update = function () {
    Character.prototype.update.call(this);
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    //the character rotates to face the pointer
    this.rotation = this.game.physics.arcade.angleToPointer(this);

    if (this.controls.up.isDown) {
        this.body.velocity.y -= this.speed;
    }
    if (this.controls.right.isDown) {
        this.body.velocity.x += this.speed;
    }
    if (this.controls.down.isDown) {
        this.body.velocity.y += this.speed;
    }
    if (this.controls.left.isDown) {
        this.body.velocity.x -= this.speed;
    }
}

Player.prototype.heal = function (h) {
    Character.prototype.heal.call(this, h);
}

Player.prototype.render = function () {
}

module.exports = Player;