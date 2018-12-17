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

    this.spawnPoints = [{ x: 180, y: 100 }, { x: 300, y: 1000 }, { x: 650, y: 850 }];
  },
  initializeMap: function () {

    this.map = this.game.add.tilemap('Map');
    this.map.addTilesetImage('tilesetsangriento', 'tiledSangre');
    this.map.addTilesetImage('stone_house_interior', 'tiledStoneInterior');
    //create layer
    this.suelo = this.map.createLayer('suelo');
    this.colisiones = this.map.createLayer('colisiones');
    //this.puerta1 = this.map.createLayer('puerta1');
    //this.puerta2 = this.map.createLayer('puerta2');
    //this.puerta3 = this.map.createLayer('puerta3');
    this.decoracion = this.map.createLayer('decoracion');
    //escalado
    this.suelo.resizeWorld();
    this.colisiones.resizeWorld();
    //this.puerta1.resizeWorld();
    //this.puerta2.resizeWorld();
    //this.puerta3.resizeWorld();
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
    this.player = new Soldier(this.game, 300, 300, 'player'); // we create our player
    this.game.camera.follow(this.player); // camera attached to player

    // GROUPS
    this.groups = new Groups(this.game);

    //ENEMIES
    this.bosses = [];
    for (var i = 0; i < 3; i++) {
      this.bosses.push(new Boss(this.game, 0, 0, 'Boss', this.player));
    }
    this.enemies = [];
    for (var i = 0; i < 100; i++) {
      this.enemies.push(new Enemy(this.game, 0, 0, 'zombi', this.player));
    }
    this.groups.createEnemies(this.enemies, this.player);
    this.groups.createBosses(this.bosses);

    // MUSIC
    this.music = this.game.add.audio('musicaFondo');
    this.music.play();
    this.music.loopFull();

    //UI cutre
    this.enemyText = this.game.add.text(10, 300, this.killedEnemies + '/' + this.enemiesToSpawn,
      {
        font: "65px Arial",
        fill: "#ff0044",
        align: "center"
      });
    this.enemyText.anchor.setTo(0, 0.5);
    this.enemyText.fixedToCamera = true;

    // FIRST ROUND
    nextRound();
  },

  update: function () {
    this.game.physics.arcade.overlap(this.player.weapon.bullets.children,
      this.groups.enemies.children, bulletEnemyCollision, null, this); // miramos los hijos de cada grupo

    this.game.physics.arcade.overlap(this.player, this.groups.enemies.children,
      playerEnemyCollision, null, this);

    this.game.physics.arcade.overlap(this.player.weapon.bullets.children,
      this.groups.bosses.children, bulletEnemyCollision, null, this);

    this.game.physics.arcade.overlap(this.player, this.Boss,
      playerBossCollision, null, this);

    this.mapCollision();
    this.groups.updateGroups();

    if (this.killedEnemies === this.enemiesToSpawn) {
      PlayScene.killedEnemies = 0;
      console.log("Se acabó la ronda");
      roundEnded();
    }
    this.game.world.bringToTop(this.player);
    //this.music.play.loop = true;

    gameOver(this.player);
  },

  mapCollision: function () {
    //colisiones entre paredes y jugador
    this.game.physics.arcade.collide(this.colisiones, this.player);//habilita las colisiones entre paredes y player
    //this.game.physics.arcade.collide(this.puerta1, this.player);
    //this.game.physics.arcade.collide(this.puerta2, this.player);
    //this.game.physics.arcade.collide(this.puerta3, this.player);
    //colisiones entre paredes y enemigos
    this.game.physics.arcade.collide(this.colisiones, this.enemies);
    //this.game.physics.arcade.collide(this.puerta1, this.enemies);
   //this.game.physics.arcade.collide(this.puerta2, this.enemies);
    //this.game.physics.arcade.collide(this.puerta3, this.enemies);
    //colisiones entre paredes y Boss
    this.game.physics.arcade.collide(this.colisiones, this.bosses);
   // this.game.physics.arcade.collide(this.puerta1, this.bosses);
    //this.game.physics.arcade.collide(this.puerta2, this.bosses);
    //this.game.physics.arcade.collide(this.puerta3, this.bosses);
    //colisiones entre paredes y balas
    this.game.physics.arcade.collide(this.colisiones, this.player.weapon.bullets,
      bulletMapCollision, null, this);
   // this.game.physics.arcade.collide(this.puerta1, this.player.weapon.bullets,
    //  bulletMapCollision, null, this);
   // this.game.physics.arcade.collide(this.puerta2, this.player.weapon.bullets,
    //  bulletMapCollision, null, this);
   // this.game.physics.arcade.collide(this.puerta3, this.player.weapon.bullets,
    //  bulletMapCollision, null, this);
  },

  /*render: function () {
    this.game.debug.cameraInfo(this.game.camera, 32, 100);
    this.game.debug.spriteInfo(this.player, 32, 400);
    this.game.debug.body(this.player);
    //this.game.debug.body(this.groups.enemies);
    this.player.render();
    this.groups.render();

  },*/

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
    createChoff(enemy);
    console.log("Killed enemies: " + PlayScene.killedEnemies);
    PlayScene.enemyText.setText(PlayScene.killedEnemies + '/' + PlayScene.enemiesToSpawn);
    // mostrar un cadaver o algo asi si queremos
  }
}

function playerEnemyCollision(player, enemy) {
  enemy.attack();
  player.getsDamage(enemy.damage);
}
function playerBossCollision(player, Boss) {
  Boss.attack();
  player.getsDamage(Boss.damage);
}

function roundEnded() {
  //hacer que la tienda exista
  // ...
  // activamos el timer entre rondas
  PlayScene.timer.add(4000, nextRound, PlayScene);
  PlayScene.timer.start();
}

function addSpawnPoint(x, y) {
  PlayScene.spawnPoints.push({ x: x, y: y });
}

function nextRound() {
  PlayScene.round++;
  console.log("RONDA: " + PlayScene.round);
  PlayScene.enemiesToSpawn = 10 * PlayScene.round;
  roundSpawn();
  if (PlayScene.round === 2) {
    addSpawnPoint(1000, 850);
    addSpawnPoint(1500, 950);
    addSpawnPoint(1500, 700);
    spawnBoss();
    spawnBoss();
  }
  else if (PlayScene.round === 3) {
    addSpawnPoint(1000, 200);
    addSpawnPoint(1500, 500);
    addSpawnPoint(1500, 200);
    spawnBoss();
  }
  else if (PlayScene.round === 5) {
    addSpawnPoint(150, 1300);
    addSpawnPoint(350, 1500);
    addSpawnPoint(800, 1500);
    addSpawnPoint(1500, 1200);
    spawnBoss();
  }
  PlayScene.enemyText.setText(PlayScene.killedEnemies + '/' + PlayScene.enemiesToSpawn);
}

function spawnEnemy() {
  PlayScene.spawnPoint = PlayScene.spawnPoints[Math.floor(Math.random() * PlayScene.spawnPoints.length)];
  if (PlayScene.groups.enemies.getFirstExists(false)) {
    var enemy = PlayScene.groups.enemies.getFirstDead();
    enemy.reset(PlayScene.spawnPoint.x, PlayScene.spawnPoint.y);
    enemy.heal(enemy.maxHealth);
    enemy.body.setSize(150, 150);
  }
}

function spawnBoss() {
  PlayScene.spawnPoint = PlayScene.spawnPoints[Math.floor(Math.random() * PlayScene.spawnPoints.length)];
  if (PlayScene.groups.bosses.getFirstExists(false)) {
    var boss = PlayScene.groups.bosses.getFirstDead();
    boss.reset(PlayScene.spawnPoint.x, PlayScene.spawnPoint.y);
    boss.heal(boss.maxHealth);
    boss.body.setSize(200, 200);
    PlayScene.enemiesToSpawn += 1;
  }
}

function roundSpawn() {
  PlayScene.game.time.events.repeat(500, PlayScene.enemiesToSpawn, spawnEnemy, this);
}

function createChoff(cadaver) {
  //Phaser.Sprite.call(this, game, x, y, imgName);
  var choff = PlayScene.game.add.sprite(cadaver.x, cadaver.y, 'choff');
  choff.anchor.setTo(0.5, 0.5);
  choff.scale.setTo(0.50, 0.50);
}

function gameOver(player){
  if(player.health<=0){
    PlayScene.game.state.start('GameOver');
    PlayScene.music.stop();
  }
}

module.exports = PlayScene;
