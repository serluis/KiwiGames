'use strict';

  var PlayScene = {
  	preload: function(){
  		this.game.load.image('prueba', 'images/prueba.jpg');
  	};
  create: function () {
    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'prueba');
    logo.anchor.setTo(0.5, 0.5);
  }
};

module.exports = PlayScene;
var Entity = function (game,x,y){
  sprite.call(this,game,x,y);
}
var Enemy = function (game,x,y){
  Entity.call(this,game,x,y)
}
//Enemy.prototype= object.create(Entity.prototype);
Enemy.prototype.constructor=Enemy;

