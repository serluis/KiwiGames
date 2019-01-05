'use strict';
const Enemy = require('./enemy.js');
const Groups = require('./groups.js');
const Boss = require('./boss.js');
const PlayerManager = require('./playerManager.js');
const HUD = require('./hud.js');
const Shop = require('./shop.js');
var config = require('./config.js');

/*------------------------------*/

const maxRounds = config.maxRounds;

var PlayScene = {
  preload: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.cameraSize = new Phaser.Rectangle();
    this.cameraSize.setTo(0, 0, 1000, 1000);
    this.game.stage.backgroundColor = '#313131';

    this.zDmg = this.game.add.audio('Zdolor');
    this.zDmg.volume = config.entityVolume;
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
    this.map.setCollisionBetween(1, 1000, true, 'puerta1');
    this.map.setCollisionBetween(1, 1000, true, 'puerta2');
    this.map.setCollisionBetween(1, 1000, true, 'puerta3');
  },

  create: function () {
    // LEVEL MANAGING
    this.round = 0;
    this.killedEnemies = 0;
    this.money = 0;
    this.timeBetweenRound = 20000;
    this.shopTimer = this.game.time.create(false);
    this.timer = this.game.time.create(false);
    this.hudTimer = this.game.time.create(false);

    // PLAYER
    this.player = new PlayerManager(this.game, 300, 300, 'player');

    // CAMERA
    this.game.camera.follow(this.player.subClass); // camera attached to player

    // GROUPS
    this.groups = new Groups(this.game);

    //ENEMIES
    this.bosses = [];
    for (var i = 0; i < 3; i++) {
      this.bosses.push(new Boss(this.game, 0, 0, 'Boss', this.player.subClass));
    }
    this.enemies = [];
    for (var i = 0; i < 100; i++) {
      this.enemies.push(new Enemy(this.game, 0, 0, 'zombi', this.player.subClass));
    }
    this.groups.createEnemies(this.enemies, this.player.subClass);
    this.groups.createBosses(this.bosses);

    // MUSIC
    this.music = this.game.add.audio('musicaFondo');
    this.music.volume = config.musicVolume;
    this.music.play();
    this.music.loopFull();

    // UI cada vez menos cutre
    this.hud = new HUD(this.game, this.music);
    this.shop = new Shop(this.game, this.player.subClass, this);

    // INPUT
    this.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.pause.onDown.add(this.hud.pause, this.hud);
    this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ESC);


    // FIRST ROUND
    this.game.camera.flash(0xff0000, 500);
    waveInc();
    nextRound();
  },

  update: function () {
    this.game.physics.arcade.overlap(this.player.subClass.weapon.bullets.children,
      this.groups.enemies.children, bulletEnemyCollision, null, this); // miramos los hijos de cada grupo

    this.game.physics.arcade.overlap(this.player.subClass, this.groups.enemies.children,
      playerEnemyCollision, null, this);

    this.game.physics.arcade.overlap(this.player.subClass.weapon.bullets.children,
      this.groups.bosses.children, bulletBossCollision, null, this);

    this.game.physics.arcade.overlap(this.player.subClass, this.groups.bosses.children,
      playerBossCollision, null, this);

    this.mapCollision();
    this.groups.updateGroups();

    if (this.killedEnemies === this.enemiesToSpawn) {
      PlayScene.killedEnemies = 0;
      roundEnded(this.timeBetweenRound);
    }

    this.game.world.bringToTop(this.player.subClass.weapon.bullets);
    this.game.world.bringToTop(this.player.subClass);

    this.hud.update();
    this.shop.update();
    this.hud.pauseUpdate();

    gameOver(this.player.subClass);
  },

  mapCollision: function () {
    //colisiones entre paredes y jugador
    this.game.physics.arcade.collide(this.colisiones, this.player.subClass);//habilita las colisiones entre paredes y player
    this.game.physics.arcade.collide(this.puerta1, this.player.subClass);
    this.game.physics.arcade.collide(this.puerta2, this.player.subClass);
    this.game.physics.arcade.collide(this.puerta3, this.player.subClass);
    //colisiones entre paredes y enemigos
    this.game.physics.arcade.collide(this.colisiones, this.enemies);
    this.game.physics.arcade.collide(this.puerta1, this.enemies);
    this.game.physics.arcade.collide(this.puerta2, this.enemies);
    this.game.physics.arcade.collide(this.puerta3, this.enemies);
    //colisiones entre paredes y Boss
    this.game.physics.arcade.collide(this.colisiones, this.bosses);
    this.game.physics.arcade.collide(this.puerta1, this.bosses);
    this.game.physics.arcade.collide(this.puerta2, this.bosses);
    this.game.physics.arcade.collide(this.puerta3, this.bosses);
    //colisiones entre paredes y balas
    this.game.physics.arcade.collide(this.colisiones, this.player.subClass.weapon.bullets,
      bulletMapCollision, null, this);
    this.game.physics.arcade.collide(this.puerta1, this.player.subClass.weapon.bullets,
      bulletMapCollision, null, this);
    this.game.physics.arcade.collide(this.puerta2, this.player.subClass.weapon.bullets,
      bulletMapCollision, null, this);
    this.game.physics.arcade.collide(this.puerta3, this.player.subClass.weapon.bullets,
      bulletMapCollision, null, this);
  },

  render: function () {
    this.hud.healthText.setText(this.player.subClass.health);
    this.hud.shieldText.setText(this.player.subClass.shield);
    this.hud.moneyText.setText(this.money);
    this.player.subClass.render();
  },

};

function bulletMapCollision(bullet) {
  bullet.kill();
}

function bulletEnemyCollision(bullet, enemy) {
  bullet.kill();
  PlayScene.zDmg.play();
  enemy.getsDamage(PlayScene.player.subClass.damage);
  if (enemy.health <= 0) {
    PlayScene.killedEnemies++;
    createChoff(enemy);
    PlayScene.hud.enemyText.setText(
      PlayScene.killedEnemies + '/' + PlayScene.enemiesToSpawn);
    PlayScene.money += 20;
  }
}

function bulletBossCollision(bullet, enemy) {
  bulletEnemyCollision(bullet, enemy);
  if (enemy.health <= 0) {
    PlayScene.money += 30;
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

function roundEnded(time) {
  //hacer que la tienda exista
  PlayScene.shopTimer.add(4000, showShop, PlayScene.shop);
  PlayScene.shopTimer.start();
  // activamos el timer entre rondas
  PlayScene.timer.add(time, nextRound, PlayScene);
  PlayScene.hudTimer.add(time - 1500, waveInc, PlayScene);
  PlayScene.hudTimer.start();
  PlayScene.timer.start();
  // mensaje de fin de ronda
  PlayScene.hud.waveComplete();
}

function showShop() {
  // abre la tienda
  PlayScene.game.camera.flash(0x2e2e30, 1000);
  PlayScene.shop.revive();
}

function waveInc() {
  // cierra la tienda
  PlayScene.game.camera.flash(0x2e2e30, 1000);
  PlayScene.shop.kill();
  // aparece cartel de nueva oleada
  if (PlayScene.round < maxRounds) {
    PlayScene.hud.waveIncoming();
  }
}

function addSpawnPoint(x, y) {
  PlayScene.spawnPoints.push({ x: x, y: y });
}

function roundProgression() {
  config.dmgScale += config.dmgScale;

  if (PlayScene.round === 2) {
    PlayScene.puerta3.kill();
    addSpawnPoint(1000, 850);
    addSpawnPoint(1500, 950);
    addSpawnPoint(1500, 700);
  }
  else if (PlayScene.round === 3) {
    PlayScene.puerta2.kill();
    addSpawnPoint(1000, 200);
    addSpawnPoint(1500, 500);
    addSpawnPoint(1500, 200);
    spawnBoss();
  }
  else if (PlayScene.round === 5) {
    PlayScene.puerta1.kill();
    addSpawnPoint(150, 1300);
    addSpawnPoint(350, 1500);
    addSpawnPoint(800, 1500);
    addSpawnPoint(1500, 1200);
    spawnBoss();
  }
  else if (PlayScene.round === 8) {
    spawnBoss();
  }
  else if (PlayScene.round === 9) {
    spawnBoss();
    spawnBoss();
  }
  else if (PlayScene.round === 10) {
    spawnBoss();
    spawnBoss();
    spawnBoss();
  }
}

function nextRound() {
  PlayScene.round++;
  if (PlayScene.round <= maxRounds) {
    PlayScene.hud.waveText.setText(PlayScene.round + '/' + maxRounds);
    PlayScene.enemiesToSpawn = 10 * PlayScene.round;
    roundSpawn();
    roundProgression();
    PlayScene.hud.enemyText.setText(PlayScene.killedEnemies + '/' + PlayScene.enemiesToSpawn);
  }
}

function spawnEnemy() {
  PlayScene.spawnPoint = PlayScene.spawnPoints[Math.floor(Math.random() * PlayScene.spawnPoints.length)];
  if (PlayScene.groups.enemies.getFirstExists(false)) {
    var enemy = PlayScene.groups.enemies.getFirstDead();
    enemy.reset(PlayScene.spawnPoint.x, PlayScene.spawnPoint.y);
    if (enemy.maxHealth != enemy.maxHealth + PlayScene.round * 10 * config.healthScale)
      enemy.maxHealth = enemy.maxHealth + PlayScene.round * 10 * config.healthScale; // life increases by rounds
    enemy.heal(enemy.maxHealth);
    enemy.body.setSize(150, 150);
  }
}

function spawnBoss() {
  PlayScene.spawnPoint = PlayScene.spawnPoints[Math.floor(Math.random() * PlayScene.spawnPoints.length)];
  if (PlayScene.groups.bosses.getFirstExists(false)) {
    var boss = PlayScene.groups.bosses.getFirstDead();
    boss.reset(PlayScene.spawnPoint.x, PlayScene.spawnPoint.y);
    boss.maxHealth = boss.maxHealth + PlayScene.round * 2 * config.healthScale; // boss life increase
    boss.heal(boss.maxHealth);
    boss.body.setSize(200, 200);
    PlayScene.enemiesToSpawn += 1;
  }
}

function roundSpawn() {
  PlayScene.game.time.events.repeat(300, PlayScene.enemiesToSpawn, spawnEnemy, this);
}

function createChoff(corpse) {
  var choff = PlayScene.game.add.sprite(corpse.x, corpse.y, 'choff');
  choff.anchor.setTo(0.5, 0.5);
  choff.scale.setTo(0.50, 0.50);
}

function gameOver(player) {
  if (player.health <= 0) {
    PlayScene.game.state.start('GameOver');
    PlayScene.music.stop();
  }
  else if (PlayScene.round > maxRounds) {
    PlayScene.music.stop();
    PlayScene.game.state.start('youwin');
  }
}

module.exports = PlayScene;
