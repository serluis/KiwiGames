'use strict';

const Character = require('./character.js');

var speed = 150;
var fireRate = 100;
var controls = {};

var bulletSpeed = 300;
var weapon;

//function 
function Player(game, x, y, imgName,clase) {
    //Phaser.Sprite.call(this, game, x, y, imgName);
    //game.add.existing(this); // we add the sprite

    //this.anchor.setTo(0.5, 0.5);

    Character.call(this, game, x, y, imgName);
    game.physics.arcade.enable(this);
    this.body.colliderWorldBounds = true;
    
    // we create a weapon 
    if(clase===1){
    weapon = game.add.weapon(10, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon.bulletLifespan = 2000;
    weapon.bulletSpeed = bulletSpeed;
    weapon.fireRate = fireRate*10;
    weapon.bullets.setAll('anchor.x', 0.5);
    weapon.bullets.setAll('anchor.y', 0.5);
    weapon.trackSprite(this, 0, 0, true);// the bullets come out from player
    }
    else if(clase===2){
    weapon = game.add.weapon(20, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon.bulletLifespan = 1000;
    weapon.bulletSpeed = bulletSpeed;
    weapon.fireRate = fireRate*20;
    weapon.bullets.setAll('anchor.x', 0.5);
    weapon.bullets.setAll('anchor.y', 0.5);
    weapon.trackSprite(this, 0, 0, true);// the bullets come out from player
    }
    else if(clase===3){
    weapon = game.add.weapon(30, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon.bulletLifespan = 2000;
    weapon.bulletSpeed = bulletSpeed;
    weapon.fireRate = fireRate;
    weapon.bullets.setAll('anchor.x', 0.5);
    weapon.bullets.setAll('anchor.y', 0.5);
    weapon.trackSprite(this, 0, 0, true);// the bullets come out from player
    }
    // se puede poner un offset con los 2 numeros*/

    controls = {
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        shoot: game.input.activePointer,
    };

    console.log("Player created at POS: " + this.x + "," + this.y);
}

Player.prototype = Object.create(Character.prototype);
Player.constructor = Player;

Player.prototype.update = function () {

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (controls.up.isDown) {
        this.body.velocity.y -= speed;
    }
    if (controls.right.isDown) {
        this.body.velocity.x += speed;
    }
    if (controls.down.isDown) {
        this.body.velocity.y += speed;
    }
    if (controls.left.isDown) {
        this.body.velocity.x -= speed;
    }

    if (controls.shoot.isDown) {
        weapon.fireAtPointer();
    }
}

Player.prototype.render = function () {
    weapon.debug();
}

/*Player.prototype.getWeapon = function () {
    return weapon;
}*/

module.exports = Player;