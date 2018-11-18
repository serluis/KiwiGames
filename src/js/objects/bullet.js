'use strict';

require('entity.js');

var sprite;
var pos = {x = 0, y = 0};
function Bullet (game, posX, posY){
    var game = game;
}

Bullet.prototype = Object.create(Entity.prototype);
Bullet.constructor = Bullet;

Bullet.prototype.create = function(){
    sprite = this.game.add.sprite(pos.x, pos.y, 'bullet');
    sprite.anchor.setTo(0.5, 0.5);
    this.physics.arcade.enable(sprite);
    Bullet.body.colliderWorldBounds = true;

    console.log("Bullet created");
}

Bullet.prototype.update = function(){

}