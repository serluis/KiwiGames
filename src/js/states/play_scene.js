'use strict';

//var player = 
require('./player/player.js');
//var bullet = require('../objects/bullet.js');

  var PlayScene = {
  	preload: function(){
			this.game.load.image('prueba', 'images/prueba.jpg');
			var player = new Player(this.game);
			
  	},
  	create: function () {
    	var logo = this.game.add.sprite(
      	this.game.world.centerX, this.game.world.centerY, 'prueba');
			logo.anchor.setTo(0.5, 0.5);
		//this.game.physics
		player.create();
		},
		update: function(){
		}
};

module.exports = PlayScene;
/*var Entity = function (game,x,y){
	sprite.call(this,game,x,y);
	console.log("Hola");
}
var Enemy = function (game,x,y){
  Entity.call(this,game,x,y)
}
//Enemy.prototype= object.create(Entity.prototype);
Enemy.prototype.constructor=Enemy;

var cosa = function(cosa1,x,y){//esto es una constructora
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
