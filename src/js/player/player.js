'use strict';

var sprite;
var fireRate = 100;
var nextFire = 0;
var controls = {};

//function 

function fire(){
    if (this.game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = this.game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        this.game.physics.arcade.moveToPointer(bullet, 300);
    }
}