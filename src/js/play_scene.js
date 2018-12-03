'use strict';
//var sound = require('./sound.js');
const Entity = require('./entity');
const Enemy = require ('./enemy');
const Player = require('./player.js');

var player;

/* THIS SHOULD GO IN OTHER FILES*/
var enemySpeed = 75;
var enemies;

/*------------------------------*/


var PlayScene = {
  preload: function () {
  },
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.game.stage.backgroundColor = '#313131';

    player = new Player(this.game, 300, 300, 'player',this.game.clase); // we create our player
    this.game.camera.follow(player); // camera attached to player

    /*ENEMIES STUFF: Para un futuro crear un file con todos los game groups*/
    enemies = this.game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 4; i++) {
      enemies.add(new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'zombi'));
      //enemy.name = 'enem' + i;
      enemies.children[i].name = 'enem' + i;
      console.log("An enemy created at POS: " + enemies.children[i].x + "," + enemies.children[i].y);
    }
    enemies.setAll('checkWorldBounds', true);
    enemies.setAll('anchor.x', 0.5);
    enemies.setAll('anchor.y', 0.5);
    /*-------Se acaban las cosas de enemies--------*/
    //musica
    this.game.add.audio('musicaFondo').loopFull(1);
    //mapa
    //game.physics.startSystem(Phaser.Physics.ARCADE);//habilita las fisicas de arcade
    //variables del mapa
    var mapa;//suelo,colisiones,puerta1,puerta2,puerta3,decoracion;

    mapa = this.game.add.tilemap('Mapa');
    mapa.addTilesetImage('tilesetsangriento', 'tiledSangre');
    mapa.addTilesetImage('stone_house_interior', 'tiledStoneInterior');
    //create layer
    this.suelo = this.mapa.createLayer('suelo');
    this.colisiones = this.mapa.createLayer('colisiones');
    this.puerta1 = this.mapa.createLayer('puerta1');
    this.puerta2 = this.mapa.createLayer('puerta2');
    this.puerta3 = this.mapa.createLayer('puerta3');
    this.decoracion = this.mapa.createLayer('decoracion');
    //escalado
    this.suelo.resizeWorld();
    this.colisiones.resizeWorld();
    this.puerta1.resizeWorld();
    this.puerta2.resizeWorld();
    this.puerta3.resizeWorld();
    this.decoracion.resizeWorld();
    
    //collision con paredes layer
    this.mapa.setCollisionBetween(1, 100000, true, 'colisiones'); 
    this.mapa.setCollisionBetween(1, 100000, true, 'puerta1');
    this.mapa.setCollisionBetween(1, 100000, true, 'puerta2');
    this.mapa.setCollisionBetween(1, 100000, true, 'puerta3');
  },

  update: function () {
    //this.game.physics.arcade.overlap(enemies.children, bullets.children, this.collisionHandler, null, this);
    //this.game.physics.arcade.overlap(player.getWeapon().bullets, enemies, this.collisionHandler, null, this);
    enemies.forEach(this.game.physics.arcade.moveToObject,
      this.game.physics.arcade, false, player, enemySpeed);
     //mapa
     game.physics.arcade.enable(player);//da fisicas al jugador para que choque
     game.physics.arcade.collide(colisiones,player);//habilita las colisiones entre paredes y player
  },

  collisionHandler: function (bullet, enemy) {
    //bullet.kill();
    //enemy.kill();
    console.log("Collision? Enemy:" + enemy.x + "," + enemy.y);
    console.log("Bullet:" + bullet.x + "," + bullet.y)
  },

  render: function () {
    this.game.debug.cameraInfo(this.game.camera, 32, 100);
    this.game.debug.spriteInfo(player, 32, 400);
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
