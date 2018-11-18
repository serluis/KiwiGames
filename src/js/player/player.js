'use strict';

require('./objects/entity.js');

var sprite;
var playerSpeed = 150;
var fireRate = 100;
var nextFire = 0;
var controls = {};
var pos = {x = 0, y = 0};

//function 
function Player(game, posX, posY){ 
     var game = game;
     pos.x = posX; pos.y = posY;
}

Player.prototype = Object.create(Entity.prototype);
Player.constructor = Player;

Player.prototype.create = function(){
    sprite = this.game.add.sprite(pos.x, pos.y, 'player');
    sprite.anchor.setTo(0.5,0.5);
    sprite.animations.add('idle',[0],1,true);
    sprite.animations.add('moveFront',[0,1,2],1,true);
    sprite.animations.add('moveRight',[3,4,5],3,true);
    sprite.animations.add('moveBack',[6,7,8],3,true);
    sprite.animations.add('moveLeft',[9,10,11],3,true);
    this.physics.arcade.enable(sprite);
    this.camera.follow(sprite);
    Player.body.colliderWorldBounds = true;

    controls = {
        right: this.input.keyboard.addKey(Phaser.Keyboard.A),
        left: this.input.keyboard.addKey(Phaser.Keyboard.L),
        up: this.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.input.keyboard.addKey(Phaser.Keyboard.S),
    };

    console.log("Player created");

}

Player.prototype.update = function(){

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;

    if(controls.up.isDown){
        sprite.animations.play('moveBack');
        sprite.body.velocity.y -= playerSpeed;
    }
    if(controls.right.isDown){
        sprite.animations.play('moveRight');
        sprite.body.velocity.x += playerSpeed;
    }
    if(controls.down.isDown){
        sprite.animations.play('moveFront');
        sprite.body.velocity.y += playerSpeed;
    }
    if(controls.left.isDown){
        sprite.animations.play('moveLeft');
        sprite.body.velocity.x -= playerSpeed;
    }

    if(sprite.body.velocity.x === 0 && sprite.body.velocity.y === 0){
        sprite.animations.play('idle');
    }
}

/*function fire(){
    if (this.game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = this.game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        this.game.physics.arcade.moveToPointer(bullet, 300);
    }
}*/

module.exports = Player;