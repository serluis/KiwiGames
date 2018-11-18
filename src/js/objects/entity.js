'use strict';

function Entity(game){
    var game = game;
}

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.constructor = Entity;

Entity.prototype.create = function(){

}

Entity.prototype.update = function(){
    
}

module.exports = Entity;