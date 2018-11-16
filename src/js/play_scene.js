'use strict';

  var PlayScene = {
  	preload: function(){
  		this.game.load.image('prueba', 'images/prueba.jpg');
  	},
    create: function () {
   // var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'prueba');
    var logo = this.game.add.existing(new Entity(this.game, 10, 10, 'prueba'));

    this.game.add.existing(new Enemy(this.game, 10, 50, 'prueba'));

    logo.anchor.setTo(0.5, 0.5);
  }
}

module.exports = PlayScene;
var Entity = function (game,x,y){
  Phaser.Sprite.call(this,game,x,y,'prueba');
}

Entity.prototype= Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor=Entity;

Entity.prototype.update = function() {
  this.x++;
}


var Enemy = function (game,x,y){
  Entity.call(this,game,x,y)
}
Enemy.prototype= Object.create(Entity.prototype);
Enemy.prototype.constructor=Enemy;

Enemy.prototype.update = function() {
  Entity.prototype.update.apply(this);
  this.y++;
}


/*var cosa = function(cosa1,x,y){//esto es una constructora
	sprite.call(this,cosa1,x,y);
	//colocar
	//rotacion
	//declaracion de variables que se usaran en update
	//direccion velocidad etc.
	//añadiduras herencia y tal

}
//justo despues se pone las cosas de prototypes
//cosa.prototype.update=function (){}//aqui se hace el update
//para usar las variables de cosa se pone this.variable=3;*/
