'use strict';
//var sound = require('./sound.js');
var Entity = require('./entity');
var Enemy = require ('./enemy');

var player;

/* THIS SHOULD GO IN OTHER FILES*/
var playerSpeed = 150;
var enemies;

/*------------------------------*/


var PlayScene = {
  preload: function () {
    player = new Player(this.game, 300, 300);
  },
  create: function () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.game.stage.backgroundColor = '#313131';

    /*PLAYER STUFF: Esto tiene que ir en otro file*/
    player.create();
    this.game.camera.follow(player);
    /*-------Se acaban las cosas del player--------*/
    /*ENEMIES STUFF: Para un futuro crear un file con todos los game groups*/
    enemies = this.game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 4; i++) {
      enemies.add(new Enemy(this.game, this.game.world.randomX, this.game.world.randomY));
      //enemy.name = 'enem' + i;
      enemies.children[i].name = 'enem' + i;
      console.log("An enemy created at POS: " + enemies.children[i].x + "," + enemies.children[i].y);
    }
    enemies.setAll('checkWorldBounds', true);
    enemies.setAll('anchor.x', 0.5);
    enemies.setAll('anchor.y', 0.5);
    /*-------Se acaban las cosas de enemies--------*/

    this.game.add.audio('musicaFondo').loopFull(1);
  },

  update: function () {
    //this.game.physics.arcade.overlap(enemies.children, bullets.children, this.collisionHandler, null, this);
    //this.game.physics.arcade.overlap(enemies, player.getBullets(), this.collisionHandler, null, this);
    enemies.forEach(this.game.physics.arcade.moveToObject,
      this.game.physics.arcade, false, player, playerSpeed * 0.25);

  },

  collisionHandler: function (bullet, enemy) {
    bullet.kill();
    enemy.kill();
    console.log("Collision? Enemy:" + enemy.x + "," + enemy.y);
    console.log("Bullet:" + bullet.x + "," + bullet.y)
  },

  render: function () {
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteInfo(player, 32, 250);
    this.game.debug.body(player);
    this.game.debug.body(enemies);
    enemies.forEach(this.game.debug.body, this.game.debug);
    player.render();
  },

  backToMenu: function () {
    this.game.state.start('MainMenu');
  },

};

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
