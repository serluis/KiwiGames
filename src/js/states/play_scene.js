'use strict';
/* THIS SHOULD GO IN OTHER FILES*/
var player;
var playerSpeed = 150;
var fireRate = 100;
var nextFire = 0;
var controls = {};

var bullets;
/*------------------------------*/



//require('./player/player.js');
//var bullet = require('../objects/bullet.js');

var PlayScene = {
	preload: function () {
		this.game.load.image('prueba', 'images/prueba.jpg');
		//var player = new Player(this.game);

	},
	create: function () {
		var logo = this.game.add.sprite(
			this.game.world.centerX, this.game.world.centerY, 'prueba');
		logo.anchor.setTo(0.5, 0.5);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.stage.backgroundColor = '#313131';

		/*BULLETS STUFF: Esto tiene que ir en otro file*/
		bullets = this.game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(50, 'bullet');
		bullets.setAll('checkWorldBounds', true);
		bullets.setAll('outOfBoundsKill', true);
		/*--------------------------------------------*/
		/*PLAYER STUFF: Esto tiene que ir en otro file*/
		player = this.game.add.sprite(300, 300, 'player');
		player.anchor.setTo(0.5, 0.5);
		player.animations.add('moveFront', [2, 1], 5, true);
		player.animations.add('moveRight', [3, 4,], 5, true);
		player.animations.add('moveBack', [7, 6], 5, true);
		player.animations.add('moveLeft', [9, 10], 5, true);
		this.game.physics.enable(player, Phaser.Physics.ARCADE);
		this.game.camera.follow(player);
		player.body.colliderWorldBounds = true;

		controls = {
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
		};
		/*Se acaban las cosas del player*/
		console.log("Player created");
	},

	fire: function () {
		if (this.game.time.now > nextFire && bullets.countDead() > 0) {
			nextFire = this.game.time.now + fireRate;

			var bullet = bullets.getFirstDead();

			bullet.reset(player.x - 8, player.y - 8);
			bullet.anchor.setTo(0.5, 0.5);
			bullet.width = 20; bullet.height = 10; 
			this.game.physics.arcade.moveToPointer(bullet, 300);
			console.log("PIUM PIUM");
		}
	},

	update: function () {

		/*PLAYER STUFF*/
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		if (controls.up.isDown) {
			player.animations.play('moveBack');
			player.body.velocity.y -= playerSpeed;
		}
		if (controls.right.isDown) {
			player.animations.play('moveRight');
			player.body.velocity.x += playerSpeed;
		}
		if (controls.down.isDown) {
			player.animations.play('moveFront');
			player.body.velocity.y += playerSpeed;
		}
		if (controls.left.isDown) {
			player.animations.play('moveLeft');
			player.body.velocity.x -= playerSpeed;
		}

		if (this.game.input.activePointer.isDown) {
			this.fire();
		}
		/*END PLAYER STUFF*/
	},

};

module.exports = PlayScene;
/*var Entity = function (game,x,y){
	player.call(this,game,x,y);
	console.log("Hola");
}
var Enemy = function (game,x,y){
  Entity.call(this,game,x,y)
}
//Enemy.prototype= object.create(Entity.prototype);
Enemy.prototype.constructor=Enemy;

var cosa = function(cosa1,x,y){//esto es una constructora
	player.call(this,cosa1,x,y);
	//colocar
	//rotacion
	//declaracion de variables que se usaran en update
	//direccion velocidad etc.
	//añadiduras herencia y tal

}
//justo despues se pone las cosas de prototypes
//cosa.prototype.update=function (){}//aqui se hace el update
//para usar las variables de cosa se pone this.variable=3;*/
