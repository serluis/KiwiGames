'use strict';
var Entity = require('./gameObjects/entity');
var Enemy = require ('./gameObjects/enemy');
var PlayScene = {
	preload: function(){
  		this.game.load.image('prueba', 'images/prueba.jpg');
  	},
  	create: function () {
    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'prueba');
   var logo = this.game.add.existing(new Entity(this.game, 10, 10, 'prueba'));
   var enemy = this.game.add.existing(new Enemy(this.game, 10, 50, 'prueba'));
   this.game.add.audio('musicaFondo').loopFull(1);
   logo.anchor.setTo(0.5, 0.5);
   enemy.cabreo = 100;
   console.log(enemy.cabreo);
   console.log(enemy._cabreo);
   }


}
module.exports = PlayScene;






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
