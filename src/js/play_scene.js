'use strict';
//var sound = require('./sound.js');
const Entity = require('./entity.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Soldier = require('./soldier.js');
const Berserker = require('./berserker.js');
const Medic = require('./medic.js');
const Groups = require('./groups.js');
const Boss = require('./boss.js');

/* THIS SHOULD GO IN OTHER FILES*/
const enemySpeed = 75;

/*------------------------------*/

const maxRounds = 5;

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
    // LEVEL MANAGING
    this.round = 0;
    this.killedEnemies = 0;
    this.timer = this.game.time.create(false);
    // PLAYER
    this.player = new Medic(this.game, 300, 300, 'player'); // we create our player
    this.game.camera.follow(this.player); // camera attached to player
    // GROUPS
    this.groups = new Groups(this.game);
    //ENEMIES
    this.Boss = new Boss (this.game, 300,200,'Boss',this.player);//creamos Boss
    this.enemies = [];
    for (var i = 0; i < 5; i++) {
      this.enemies.push(new Enemy(this.game, 0, 0, 'zombi'));
    }
    this.groups.createEnemies(this.enemies, this.player);
    // FIRST ROUND
    nextRound();
    // MUSIC
    this.music = this.game.add.audio('musicaFondo');
    this.music.play();
    this.music.play.loop = true;
    //UI cutre
    this.enemyText = this.game.add.text(10, 300, this.killedEnemies + '/' + this.enemiesToSpawn,
      {
        font: "65px Arial",
        fill: "#ff0044",
        align: "center"
      });
    this.enemyText.anchor.setTo(0, 0.5);
    this.enemyText.fixedToCamera = true;
  },

  update: function () {
    this.game.physics.arcade.overlap(this.player.weapon.bullets.children,
      this.groups.enemies.children, bulletEnemyCollision, null, this); // miramos los hijos de cada grupo

    this.game.physics.arcade.overlap(this.player, this.groups.enemies.children,
      playerEnemyCollision, null, this);

    this.game.physics.arcade.overlap(this.player.weapon.bullets.children,
      this.Boss, bulletEnemyCollision, null, this);

    this.game.physics.arcade.overlap(this.player, this.Boss,
      playerBossCollision, null, this);

    this.mapCollision();
    this.groups.updateGroups(this.player);
    //this.groups.enemies.forEach(this.game.physics.arcade.moveToObject,
    //this.game.physics.arcade, false, this.player, enemySpeed);

    if (this.killedEnemies === this.enemiesToSpawn) {
      console.log("Se acabó la ronda");
      this.killedEnemies = 0;
      roundEnded();
    }
    //Boss
    this.game.physics.arcade.moveToObject(this.Boss,this.player,this.Boss.speed);
    this.Boss.rotation = this.game.physics.arcade.angleToXY(this.Boss,this.player.x,this.player.y);
    
    
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
    //colisiones entre paredes y Boss
    this.game.physics.arcade.collide(this.colisiones, this.Boss);
    this.game.physics.arcade.collide(this.puerta1, this.Boss);
    this.game.physics.arcade.collide(this.puerta2, this.Boss);
    this.game.physics.arcade.collide(this.puerta3, this.Boss);
    //colisiones entre paredes y balas
    this.game.physics.arcade.collide(this.colisiones, this.player.weapon.bullets,
      bulletMapCollision, null, this);
    this.game.physics.arcade.collide(this.puerta1, this.player.weapon.bullets,
      bulletMapCollision, null, this);
    this.game.physics.arcade.collide(this.puerta2, this.player.weapon.bullets,
      bulletMapCollision, null, this);
    this.game.physics.arcade.collide(this.puerta3, this.player.weapon.bullets,
      bulletMapCollision, null, this);
      
  },

  render: function () {
    this.game.debug.cameraInfo(this.game.camera, 32, 100);
    this.game.debug.spriteInfo(this.player, 32, 400);
    this.game.debug.body(this.player);
    this.game.debug.body(this.groups.enemies);
    this.groups.enemies.forEach(this.game.debug.body, this.game.debug);
    this.player.render();

    //UI
    this.enemyText.setText(this.killedEnemies + '/' + this.enemiesToSpawn);
  },

  backToMenu: function () {
    //this.game.audio('musicafondo').loopFull(0);?
    this.music.stop();
    this.game.state.start('MainMenu');
  },

};

function bulletMapCollision(bullet) {
  bullet.kill();
}

function bulletEnemyCollision(bullet, enemy) {
  bullet.kill();
  PlayScene.zDmg.play();
  enemy.getsDamage(PlayScene.player.damage);
  if (enemy.health <= 0) {
    PlayScene.killedEnemies++;
    console.log("Killed enemies: " + PlayScene.killedEnemies);
    // mostrar un cadaver o algo asi si queremos
  }
}

function playerEnemyCollision(player, enemy) {
  enemy.attack();
  player.getsDamage(enemy.damage);
}
function playerBossCollision(player,Boss){
  Boss.attack();
  player.getsDamage(Boss.damage);
}

function roundEnded() {
  // activamos el timer entre rondas
  PlayScene.timer.add(4000, nextRound, PlayScene);
  PlayScene.timer.start();
}

function nextRound() {
  PlayScene.round++;
  console.log("RONDA: " + PlayScene.round);
  PlayScene.enemiesToSpawn = 2 * PlayScene.round;
}

module.exports = PlayScene;
