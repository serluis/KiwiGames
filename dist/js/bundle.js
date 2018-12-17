(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'
//var sound = require('./sound.js');

var GameOver = {
  preload: function () {

  },
  create: function () {

    var againbutton;

    this.game.stage.backgroundColor = '#000000';
    this.background = this.game.add.image(0, 0, 'gameover');
    againbutton = this.game.add.button(325, 450, 'againbutton', this.actionOnClick, this/*, 2, 1, 0*/);

    /*button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);*/

  },
  actionOnClick: function () {

    this.game.state.start('MainMenu');
  },
};


module.exports = GameOver;
},{}],2:[function(require,module,exports){
'use strict'
//var sound = require('./sound.js');

var MainMenu = {

    preload: function () {
        //this.game.add.audio('musicaFondo').loopFull(1);
        this.ZombieRock = this.game.add.audio('musicaMenu');

    },

    create: function () {
        this.game.stage.backgroundColor = '#182d3b';

        if (!this.ZombieRock.isPlaying){
            this.ZombieRock.play();
        }

        this.background = this.game.add.image(0, 0, 'menu');

        this.playButton = this.game.add.button(318, 315, 'playbutton', this.playSelection, this/*, 2, 1, 0*/);
        this.classButton = this.game.add.button(150, 375, 'classbutton', this.classSelection, this);
        this.exitButton = this.game.add.button(325, 440, 'exitbutton', this.exitSelection, this);

        /*button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);*/

    },
    playSelection: function () {
        //this.background.visible =! this.background.visible;
        console.log(this.game.clase);
        this.ZombieRock.stop();
        this.game.state.start('play');
    },
    classSelection: function () {
        //this.background.visible =! this.background.visible;
        this.ZombieRock.stop();
        this.game.state.start('SubMenu');
    },
    exitSelection: function () {
        this.ZombieRock.stop();
        this.game.state.start('GameOver');

    },
    /*stoped: function() {
        ZombieRock.onStop.add('soundStopped', this);
    },
    soundStopped: function() {
        ZombieRock.play();
    },*/

};
/*function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}*/

module.exports = MainMenu;
},{}],3:[function(require,module,exports){
'use strict'

var SubMenu = {
	preload: function () {

	},
	create: function () {
		this.game.stage.backgroundColor = '#ffffff';

		this.background = this.game.add.image(0, 0, 'submenu');

		this.soldierButton = this.game.add.button(290, 190, 'soldadobutton', this.soldierSelection, this);
		this.medicButton = this.game.add.button(315, 275, 'medicobutton', this.medicSelection, this);
		this.berserkerButton = this.game.add.button(270, 380, 'berserkerbutton', this.berserkerSelection, this);
		/*button.onInputOver.add(over, this);
		button.onInputOut.add(out, this);
		button.onInputUp.add(up, this);*/

	},
	soldierSelection: function () {
		this.game.clase = 1;
		this.game.state.start('MainMenu');
	},
	medicSelection: function () {
		this.game.clase = 2;
		this.game.state.start('MainMenu');
	},
	berserkerSelection: function () {
		this.game.clase = 3;
		this.game.state.start('MainMenu');
	},

};


module.exports = SubMenu;


},{}],4:[function(require,module,exports){
'use strict';

const Player = require('./player.js');

const fireRate = 0;
const bulletSpeed = 350;
const bulletLife = 700;


function Berserker(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);
    
    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.weapon.bulletAngleVariance = 15;
    this.weapon.multiFire = true;
    this.weapon.fireLimit = 3;
    this.damage = 34;
    this.shoot = this.game.add.audio('shoot');
    console.log("Im a berserker");
}

Berserker.prototype = Object.create(Player.prototype);
Berserker.constructor = Berserker;

Berserker.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        this.shoot.play();
        this.weapon.fireAtPointer();
        //this.weapon.fireAtPointer();
        //this.weapon.fireAtPointer();
        //this.weapon.fireOffset(0, 0);
    }

    this.weapon.resetShots();
}

module.exports = Berserker;
},{"./player.js":13}],5:[function(require,module,exports){
'use strict'
const Enemy = require('./enemy.js');

function Boss(game, x, y, imgName, player) {
    Enemy.call(this, game, x, y, imgName, player);
    this.speed = 35;
    this.maxHealth = this.maxHealth * 5;
    this.health = this.maxHealth;
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.player = player;
}

Boss.prototype = Object.create(Enemy.prototype);
Boss.constructor = Boss;

Boss.prototype.attack = function () {
    if (Date.now() - this.lastAttack > this.timePerAttack) {
        this.lastAttack = Date.now();
        this.damage = 50;
        this.pDmg.play();
    }
    else {
        this.damage = 0;
    }
}

Boss.prototype.update = function () {
    Enemy.prototype.update.call(this);
}

module.exports = Boss;

},{"./enemy.js":7}],6:[function(require,module,exports){
'use strict';
const Entity = require('./entity.js');

const maxHealth = 100;

function Character(game, x, y, imgName) {
    Entity.call(this, game, x, y, imgName);
    game.physics.arcade.enable(this);
    this.scale.setTo(0.20, 0.20);
    this.body.colliderWorldBounds = true;
    this.maxHealth = 100;
    this.health = maxHealth;
    this.damage = 1;
}

Character.prototype = Object.create(Entity.prototype);
Character.prototype.constructor = Character;

Character.prototype.update = function () {

}

Character.prototype.getsDamage = function (dmg) {
    this.health = this.health - dmg;

    if (this.health <= 0) {
        this.kill();
        return true;
    }

    return false;
}

Character.prototype.heal = function (h) {
    if (h > 0 && this.health < maxHealth) {
        this.health += h;
        if (this.health > 100) {
            this.health = 100;
        }
    }
}

module.exports = Character;
},{"./entity.js":8}],7:[function(require,module,exports){
'use strict';
const Character = require('./character.js');

const speed = 75;

function Enemy(game, x, y, imgName, player) {
    Character.call(this, game, x, y, imgName);

    this.speed = speed;

    this.timePerAttack = 3000; // ataca cada X milisegundos
    this.lastAttack = Date.now(); // tiempo desde el ultimo ataque

    this.pDmg = this.game.add.audio('Pdolor'); // el player recibe daño

    this.player = player;
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.constructor = Enemy;

Enemy.prototype.update = function () {
    this.rotation = this.game.physics.arcade.angleToXY(this, this.player.x, this.player.y);
}

Enemy.prototype.attack = function () {
    if (Date.now() - this.lastAttack > this.timePerAttack) {
        this.lastAttack = Date.now();
        this.damage = 20;
        this.pDmg.play();
    }
    else {
        this.damage = 0;
    }
}

module.exports = Enemy;
},{"./character.js":6}],8:[function(require,module,exports){
'use strict';

function Entity(game, x, y, imgName) {
  Phaser.Sprite.call(this, game, x, y, imgName);
  this.checkWorldBounds = true;
  game.add.existing(this);
  this.anchor.setTo(0.5, 0.5);
}

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.update = function () {
}

module.exports = Entity;
},{}],9:[function(require,module,exports){
'use strict';

//Creates all the games's group
function Groups(game) {
    this.game = game;
    this.enemies = game.add.group();
    this.bosses = game.add.group();
}

Groups.prototype.createEnemies = function (entities, player) {
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.addMultiple(entities);
    this.enemies.callAll('kill');
    this.enemies.setAll('checkWorldBounds', true);
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.player = player;
}

Groups.prototype.createBosses = function (entities) {
    this.bosses.enableBody = true;
    this.bosses.physicsBodyType = Phaser.Physics.ARCADE;
    this.bosses.addMultiple(entities);
    this.bosses.callAll('kill');
    this.bosses.setAll('checkWorldBounds', true);
    this.bosses.setAll('anchor.x', 0.5);
    this.bosses.setAll('anchor.y', 0.5);
}

Groups.prototype.updateGroups = function (player) {
    this.enemies.forEach(this.game.physics.arcade.moveToObject,
        this.game.physics.arcade, false, this.player, this.enemies.speed);
    this.bosses.forEach(this.game.physics.arcade.moveToObject,
        this.game.physics.arcade, false, this.player, this.bosses.speed);
}

Groups.prototype.render=function(){
    this.enemies.forEach(this.game.debug.body, this.game.debug);
    this.bosses.forEach(this.game.debug.body, this.game.debug);

}

module.exports = Groups;
},{}],10:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');
var SubMenu = require('./SubMenu.js');
var MainMenu = require('./MainMenu.js');
var GameOver = require('./GameOver.js');
var youWin = require('./youwin.js');

var BootScene = {
  preload: function () {
    // aqui se ponen los recursos, imagenes y sonido
    this.game.load.image('preloader_bar', './assets/images/preloader_bar.png');

  },
  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    console.log("maxPointers = " + this.input.maxPointers);
  },

  create: function () {
    this.game.state.start('preloader');
  },
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(75, 340, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game

    //images
    this.game.load.image('menu', './assets/images/menu.png');
    this.game.load.image('submenu', './assets/images/submenu.png');
    this.game.load.image('gameover', './assets/images/gameover.png');
    this.game.load.image('youwin', './assets/images/youwin.png');
    this.game.load.image('wavecomp', './assets/images/waveComplete.png');
    this.game.load.image('waveinc', './assets/images/waveIncoming.png');
    this.game.load.image('defeat', './assets/images/defeat.png');
    this.game.load.image('shop', './assets/images/shop1.png');
    //botones
    this.game.load.image('playbutton', './assets/images/playbutton.png');
    this.game.load.image('classbutton', './assets/images/classbutton.png');
    this.game.load.image('soldadobutton', './assets/images/soldadobutton.png');
    this.game.load.image('medicobutton', './assets/images/medicobutton.png');
    this.game.load.image('exitbutton', './assets/images/exitbutton.png');
    this.game.load.image('berserkerbutton', './assets/images/berserkerbutton.png');
    this.game.load.image('againbutton', './assets/images/againbutton.png');

    //muñecos
    this.game.load.image('bullet', './assets/images/red_bullet.png');
    this.game.load.image('zombi', './assets/images/zombi2.png');
    this.game.load.spritesheet('player', './assets/images/6ZombieSpriteSheet.png', 40, 36);
    this.game.load.spritesheet('enemy', './assets/images/2ZombieSpriteSheet.png', 40, 36);
    this.game.load.image('zombiBoy', './assets/images/zombiBoy.png');
    this.game.load.image('player', './assets/images/player.png');
    this.game.load.image('Boss','./assets/images/Boss.png');
    this.game.load.image('choff','./assets/images/chof.png');
    //music & sounds
    this.game.load.audio('musicaFondo', './assets/sounds/Pentagram.mp3');
    this.game.load.audio('musicaAccion', './assets/sounds/HeavyAction.mp3');
    this.game.load.audio('musicaMenu', './assets/sounds/ZombieRock.mp3');
    this.game.load.audio('Zhola', './assets/sounds/zombihola.wav');
    this.game.load.audio('Zdolor', './assets/sounds/zombidolor.mp3');
    this.game.load.audio('shoot', './assets/sounds/shoot.wav');
    this.game.load.audio('shotgun1', './assets/sounds/shotgun.wav');
    this.game.load.audio('shotgun2', './assets/sounds/shotgun+Reload.wav');
    this.game.load.audio('Pdolor', './assets/sounds/pain.wav');
    this.game.load.audio('winsound', './assets/sounds/winsound.wav');
    //mapa
    this.game.load.tilemap('Map', './assets/images/Mapa.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiledSangre', './assets/images/tilesetsangriento.png');
    this.game.load.image('tiledStoneInterior', './assets/images/stone_house_interior.png');
  },

  create: function () {
    this.game.state.start('MainMenu');
  }
};

window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('SubMenu', SubMenu);
  game.state.add('MainMenu', MainMenu);
  game.state.add('GameOver', GameOver);
  game.state.add('youwin', youWin);

  game.state.start('boot');
};

},{"./GameOver.js":1,"./MainMenu.js":2,"./SubMenu.js":3,"./play_scene.js":12,"./youwin.js":15}],11:[function(require,module,exports){
'use strict';

const Player = require('./player.js');

const fireRate = 300;
const bulletSpeed = 350;
const bulletLife = 1500;

function Medic(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);

    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.weapon.bulletAngleVariance = 5;
    this.damage = 25;
    this.shoot = this.game.add.audio('shoot');
    console.log("Im a medic");
}

Medic.prototype = Object.create(Player.prototype);
Medic.constructor = Medic;

Medic.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        if (!this.shoot.isPlaying) {
            this.shoot.play();
        }
        this.weapon.fireAtPointer();
    }
}

module.exports = Medic;

},{"./player.js":13}],12:[function(require,module,exports){
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
    //Boss
    //this.game.physics.arcade.moveToObject(this.Boss, this.player, this.Boss.speed);
    //this.Boss.rotation = this.game.physics.arcade.angleToXY(this.Boss,this.player.x,this.player.y);

    gameOver(this.player);
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
    this.game.physics.arcade.collide(this.colisiones, this.bosses);
    this.game.physics.arcade.collide(this.puerta1, this.bosses);
    this.game.physics.arcade.collide(this.puerta2, this.bosses);
    this.game.physics.arcade.collide(this.puerta3, this.bosses);
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
  PlayScene.enemiesToSpawn = 2 * PlayScene.round;
  roundSpawn();
  if (PlayScene.round === 2) {
    addSpawnPoint(1000, 850);
    addSpawnPoint(1500, 950);
    addSpawnPoint(1500, 700);
    spawnBoss();
    PlayScene.enemiesToSpawn += 1;
  }
  else if (PlayScene.round === 3) {
    addSpawnPoint(1000, 200);
    addSpawnPoint(1500, 500);
    addSpawnPoint(1500, 200);
  }
  else if (PlayScene.round === 5) {
    addSpawnPoint(150, 1300);
    addSpawnPoint(350, 1500);
    addSpawnPoint(800, 1500);
    addSpawnPoint(1500, 1200);
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

},{"./berserker.js":4,"./boss.js":5,"./enemy.js":7,"./entity.js":8,"./groups.js":9,"./medic.js":11,"./player.js":13,"./soldier.js":14}],13:[function(require,module,exports){
'use strict';

const Character = require('./character.js');

const speed = 150;

//function 
function Player(game, x, y, imgName) {
    Character.call(this, game, x, y, imgName);
    this.scale.setTo(0.15, 0.15);
    // we create the weapon 
    this.weapon = game.add.weapon(30, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bullets.setAll('anchor.x', 0.5);
    this.weapon.bullets.setAll('anchor.y', 0.5);
    this.weapon.trackSprite(this, 0, 0, true);// the bullets come out from player
    // se puede poner un offset con los 2 numeros

    this.speed = speed;

    this.controls = {
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        heal: game.input.keyboard.addKey(Phaser.Keyboard.Q),
        shoot: game.input.activePointer,
    };

    this.controls.heal.onDown.add(Character.prototype.heal, this);

    console.log("Player created at POS: " + this.x + "," + this.y);
}

Player.prototype = Object.create(Character.prototype);
Player.constructor = Player;

Player.prototype.update = function () {
    Character.prototype.update.call(this);
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    //the character rotates to face the pointer
    this.rotation = this.game.physics.arcade.angleToPointer(this);

    if (this.controls.up.isDown) {
        this.body.velocity.y -= this.speed;
    }
    if (this.controls.right.isDown) {
        this.body.velocity.x += this.speed;
    }
    if (this.controls.down.isDown) {
        this.body.velocity.y += this.speed;
    }
    if (this.controls.left.isDown) {
        this.body.velocity.x -= this.speed;
    }
}

Player.prototype.render = function () {
    this.weapon.debug(10, 10, true);
    console.log("Health: " + this.health);
}
//this.game.state.start('GameOver');//cuando muera player
module.exports = Player;
},{"./character.js":6}],14:[function(require,module,exports){
'use strict';

const Player = require('./player.js');

const fireRate = 100;
const bulletSpeed = 350;
const bulletLife = 1500;

function Soldier(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);

    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.weapon.bulletAngleVariance = 5;
    this.damage = 20;
    
    console.log("Im a soldier");
}

Soldier.prototype = Object.create(Player.prototype);
Soldier.constructor = Soldier;

Soldier.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        this.weapon.fireAtPointer();
    }
}

module.exports = Soldier;

},{"./player.js":13}],15:[function(require,module,exports){
'use strict'


var youwin = {
    
    preload: function () {
        this.winsound = this.game.add.audio('winsound');
      
    },
    
    create: function () {
        
        var againbutton;
       
        var background;
      
        this.game.stage.backgroundColor = '#182d3b';

        this.background = this.game.add.image(0, 0, 'youwin');

       
        againbutton = this.game.add.button(325, 440, 'againbutton', this.actionOnClick, this);
        //this.game.add.audio('winsound').loopFull(1);
        //var winsound = this.game.add.audio('winsound');
        this.winsound.play();
    },
    
    actionOnClick: function () {
        this.winsound.stop();
        this.game.state.start('MainMenu');
    },    

};


module.exports = youwin;
},{}]},{},[10]);
