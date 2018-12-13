'use strict';
//var sound = require('./sound.js');
const Entity = require('./entity.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Soldier = require('./soldier.js');
const Berserker = require('./berserker.js');
const Medic = require('./medic.js');
//const mapa = require('./mapa.js');


/* THIS SHOULD GO IN OTHER FILES*/
const enemySpeed = 75;

/*------------------------------*/


var PlayScene = {
  preload: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.game.stage.backgroundColor = '#313131';

    this.zDmg = this.game.add.audio('Zdolor');
    this.Zhola = this.game.add.audio('Zhola');

    this.initializeMap();
  },
  initializeMap: function () {

    this.map = this.game.add.tilemap('Map');
    this.map.addTilesetImage('tilesetsangriento', 'tiledSangre');
    this.map.addTilesetImage('stone_house_interior', 'tiledStoneInterior');
    //create layer
    this.suelo = this.map.createLayer('suelo');
    this.colisiones = this.map.createLayer('colisiones');
    this.puerta1 = this.map.createLayer('puerta1');
    this.puerta2 = this.map.createLayer('puerta2');
    this.puerta3 = this.map.createLayer('puerta3');
    this.decoracion = this.map.createLayer('decoracion');
    //escalado
    this.suelo.resizeWorld();
    this.colisiones.resizeWorld();
    this.puerta1.resizeWorld();
    this.puerta2.resizeWorld();
    this.puerta3.resizeWorld();
    this.decoracion.resizeWorld();

    //collision con paredes layer
    this.map.setCollisionBetween(1, 1000, true, 'colisiones');
    //this.map.setCollisionBetween(1, 1000, true, 'puerta1');
    //this.map.setCollisionBetween(1, 1000, true, 'puerta2');
    //this.map.setCollisionBetween(1, 1000, true, 'puerta3');
  },
  create: function () {

    this.player = new Medic(this.game, 300, 300, 'zombiBoy'); // we create our player
    this.game.camera.follow(this.player); // camera attached to player

    /*ENEMIES STUFF: Para un futuro crear un file con todos los game groups*/
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 4; i++) {
      this.enemies.add(new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'zombi'));
      //enemy.name = 'enem' + i;
      this.enemies.children[i].name = 'enem' + i;
      console.log("An enemy created at POS: " + this.enemies.children[i].x + "," + this.enemies.children[i].y);
    }
    this.enemies.setAll('checkWorldBounds', true);
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    /*-------Se acaban las cosas de enemies--------*/

    /*this.musicafondo = */
    this.music = this.game.add.audio('musicaFondo');
    this.music.play();
    this.music.play.loop = true;
  },

  update: function () {
    this.game.physics.arcade.overlap(this.player.weapon.bullets.children,
      this.enemies.children, this.bulletEnemyCollisionHandler, null, this); // miramos los hijos de cada grupo

    this.game.physics.arcade.overlap(this.player, this.enemies.children,
      this.playerEnemyCollisionHandler, null, this);

    this.mapCollision();

    this.enemies.forEach(this.game.physics.arcade.moveToObject,
      this.game.physics.arcade, false, this.player, enemySpeed);
  },

  mapCollision: function () {
    //colisiones entre paredes y jugador
    this.game.physics.arcade.collide(this.colisiones, this.player);//habilita las colisiones entre paredes y player
    this.game.physics.arcade.collide(this.puerta1, this.player);
    this.game.physics.arcade.collide(this.puerta2, this.player);
    this.game.physics.arcade.collide(this.puerta3, this.player);
    //colisiones entre paredes y enemigos
    this.game.physics.arcade.collide(this.colisiones, this.enemies);
    this.game.physics.arcade.collide(this.puerta1, this.enemies);
    this.game.physics.arcade.collide(this.puerta2, this.enemies);
    this.game.physics.arcade.collide(this.puerta3, this.enemies);
    //colisiones entre paredes y balas
    this.game.physics.arcade.collide(this.colisiones, this.player.weapon.bullets,
      this.bulletMapCollisionHandler, null, this);
    this.game.physics.arcade.collide(this.puerta1, this.player.weapon.bullets,
      this.bulletMapCollisionHandler, null, this);
    this.game.physics.arcade.collide(this.puerta2, this.player.weapon.bullets,
      this.bulletMapCollisionHandler, null, this);
    this.game.physics.arcade.collide(this.puerta3, this.player.weapon.bullets,
      this.bulletMapCollisionHandler, null, this);
  },

  bulletMapCollisionHandler: function (bullet) {
    bullet.kill();
  },
  bulletEnemyCollisionHandler: function (bullet, enemy) {
    bullet.kill();
    this.zDmg.play();
    enemy.getsDamage(this.player.damage);
  },

  playerEnemyCollisionHandler: function (player, enemy) {
    enemy.attack();
    player.getsDamage(enemy.damage);
  },

  render: function () {
    this.game.debug.cameraInfo(this.game.camera, 32, 100);
    this.game.debug.spriteInfo(this.player, 32, 400);
    this.game.debug.body(this.player);
    this.game.debug.body(this.enemies);
    this.enemies.forEach(this.game.debug.body, this.game.debug);
    this.player.render();
  },

  backToMenu: function () {
    //this.game.audio('musicafondo').loopFull(0);?
    this.music.stop();
    this.game.state.start('MainMenu');
  },

};

module.exports = PlayScene;
