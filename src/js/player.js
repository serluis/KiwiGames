'use strict';

const Bullet = require('./bullet.js');

var playerSpeed = 150;
var fireRate = 100;
var nextFire = 0;
var controls = {};

var bullets;
var bullet;
var bulletSpeed = 300;

//function 
function Player(game, posX, posY) {
    Phaser.Sprite.call(this, game, posX, posY, 'player');
    game.add.existing(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.constructor = Player;

Player.prototype.create = function () {
    this.anchor.setTo(0.5, 0.5);
    /*this.animations.add('idle', [0], 1, true);
    this.animations.add('moveFront', [0, 1, 2], 1, true);
    this.animations.add('moveRight', [3, 4, 5], 3, true);
    this.animations.add('moveBack', [6, 7, 8], 3, true);
    this.animations.add('moveLeft', [9, 10, 11], 3, true);*/
    this.game.physics.arcade.enable(this);
    this.body.bounce.set(1);
    this.body.colliderWorldBounds = true;

    bullets = this.game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 50; i++) {
        bullets.add(new Bullet(this.game, 0, 0));
    }
    bullets.setAll('exists', false);
    bullets.setAll('visible', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    controls = {
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        shoot: this.game.input.activePointer,
    };

    console.log("Player created at POS: " + this.x + "," + this.y);

}

Player.prototype.update = function () {

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (controls.up.isDown) {
        this.body.velocity.y -= playerSpeed;
    }
    if (controls.right.isDown) {
        this.body.velocity.x += playerSpeed;
    }
    if (controls.down.isDown) {
        this.body.velocity.y += playerSpeed;
    }
    if (controls.left.isDown) {
        this.body.velocity.x -= playerSpeed;
    }

    if (controls.shoot.isDown) {
        this.fire();
    }
}

Player.prototype.fire = function () {
    if (this.game.time.now > nextFire) {

        nextFire = this.game.time.now + fireRate;

        bullet = bullets.getFirstExists(false);

        if (bullet) {
            bullet.reset(this.x - 8, this.y - 8);
            this.game.physics.arcade.moveToPointer(bullet, bulletSpeed);
            console.log("PIUM!");
        }
    }
}
Player.prototype.render = function () {
    this.game.debug.body(bullets);
    bullets.forEach(this.game.debug.body, this.game.debug);
}

Player.prototype.getBullets = function () {
    return bullets;
}

module.exports = Player;