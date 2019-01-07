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
    againbutton = this.game.add.button(325, 450, 'exitbutton', this.actionOnClick, this, 1, 0, 1);

  },
  actionOnClick: function () {

    this.game.state.start('MainMenu');
  },
};


module.exports = GameOver;
},{}],2:[function(require,module,exports){
'use strict'
var config = require('./config.js');

var MainMenu = {

    preload: function () {
        this.ZombieRock = this.game.add.audio('musicaMenu');
        config.menuMusic = this.ZombieRock;
    },

    create: function () {
        this.game.stage.backgroundColor = '#182d3b';
        this.game.camera.flash(0xff0000, 300);

        if (!config.menuMusic.isPlaying) {
            this.ZombieRock.volume = config.musicVolume;
            this.ZombieRock.play();
            this.ZombieRock.loopFull();
            config.menuMusic = this.ZombieRock;
        }

        this.background = this.game.add.image(0, 0, 'menu');

        this.playButton = this.game.add.button(318, 315, 'playbutton', this.playSelection, this, 1, 0, 1);
        this.optionButton = this.game.add.button(260, 375, 'optionbutton', this.optionSelection, this, 1, 0, 1);
        this.controlButton = this.game.add.button(260, 440, 'controlbutton', this.controlSelection, this, 1, 0, 1);
        config.menuMusic = this.ZombieRock;

    },
    playSelection: function () {
        this.game.state.start('SubMenu');
    },
    optionSelection: function () {
        this.game.state.start('options');
    },
    controlSelection: function () {
        this.game.state.start('controls');

    },

};

module.exports = MainMenu;
},{"./config.js":7}],3:[function(require,module,exports){
'use strict'
var config = require('./config.js');

var SubMenu = {
	preload: function () {

	},
	create: function () {
		this.game.stage.backgroundColor = '#ffffff';

		this.background = this.game.add.image(0, 0, 'submenu');

		this.soldierButton = this.game.add.button(290, 190, 'soldierbutton', this.soldierSelection, this, 1, 0, 1);
		this.medicButton = this.game.add.button(315, 275, 'medicbutton', this.medicSelection, this, 1, 0, 1);
		this.berserkerButton = this.game.add.button(270, 380, 'berserkerbutton', this.berserkerSelection, this, 1, 0, 1);
		this.backButton = this.game.add.button(590, 530, 'backbutton', this.backSelection, this, 1, 0, 1);

		this.game.camera.flash(0xff0000, 1000);
	},
	soldierSelection: function () {
		config.menuMusic.stop();
		config.chosenClass = 1;
		this.game.state.start('play');
	},
	medicSelection: function () {
		config.menuMusic.stop();
		config.chosenClass = 2;
		this.game.state.start('play');
	},
	berserkerSelection: function () {
		config.menuMusic.stop();
		config.chosenClass = 3;
		this.game.state.start('play');
	},
	backSelection: function () {
		config.menuMusic.stop();
		this.game.state.start('MainMenu');
	},

};


module.exports = SubMenu;


},{"./config.js":7}],4:[function(require,module,exports){
'use strict';

const Player = require('./player.js');
var config = require('./config.js');

const fireRate = 0;
const bulletSpeed = 350;
const bulletLife = 700;
const timePerShoot = 650;


function Berserker(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);

    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.timePerShoot = timePerShoot;
    this.weapon.bulletAngleVariance = 15;
    this.weapon.multiFire = true;
    this.weapon.fireLimit = 5;
    this.damage = 15;
    this.shoot = this.game.add.audio('shotgun2');
    this.shoot.volume = config.shotsVolume;
}

Berserker.prototype = Object.create(Player.prototype);
Berserker.constructor = Berserker;

Berserker.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        if (this.controls.shoot.active) {
            if (Date.now() - this.lastShoot > this.timePerShoot) {
                this.lastShoot = Date.now();
                this.weapon.fireAtPointer();
                this.weapon.fireAtPointer();
                this.weapon.fireAtPointer();
                this.weapon.fireAtPointer();
                this.weapon.fireAtPointer();
                this.shoot.play();
                this.weapon.resetShots();
            }
        }
    }
}

module.exports = Berserker;
},{"./config.js":7,"./player.js":17}],5:[function(require,module,exports){
'use strict'
const Enemy = require('./enemy.js');
var config = require('./config.js');

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
        this.damage = 50 + config.dmgScale;
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

},{"./config.js":7,"./enemy.js":9}],6:[function(require,module,exports){
'use strict';
const Entity = require('./entity.js');

const maxHealth = 100;

function Character(game, x, y, imgName) {
    Entity.call(this, game, x, y, imgName);
    game.physics.arcade.enable(this);
    this.scale.setTo(0.20, 0.20);
    this.body.colliderWorldBounds = true;
    this.maxHealth = maxHealth;
    this.health = this.maxHealth;
    this.shield = 0;
    this.damage = 1;
    this.timePerHeal = 10000; // se puede curar cada X milisegundos
    this.lastHeal = 0; // tiempo desde la ultima curacion
}

Character.prototype = Object.create(Entity.prototype);
Character.prototype.constructor = Character;

Character.prototype.update = function () {
    if (this.shield < 0)
        this.shield = 0;
}

Character.prototype.getsDamage = function (dmg) {
    if (this.shield > 0) {
        this.shield = this.shield - dmg;
    }
    else
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
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }
}

module.exports = Character;
},{"./entity.js":10}],7:[function(require,module,exports){
'use strict';


var config = {
    // global attributes
    chosenClass: 0,
    maxRounds: 10,
    musicVolume: 0.5,
    entityVolume: 0.5,
    shotsVolume: 0.28,
    menuMusic: undefined,

    // money ui
    dollarY: 150,
    dollarTextX: 60,
    dollarTextY: 153,

    // rounds ui
    roundMsgX: 400,
    roundMsgY: 240,

    // player ui
    healthTextY: 573,
    shieldTextY: 540,
    playerTextX: 105,
    playerY: 590,
    healY: 555,
    healX: 27,
    healOnCD: false,


    // waves ui
    waveY: 70,
    waveX: 10,
    enemyTextX: 70,
    enemyTextY: 87,
    waveTextX: 125,
    waveTextY: 55,

    // enemies
    healthScale: 1.3,
    dmgScale: 5,

    //shop
    shopTextX: 115,
    shopButtonX: 215,
    dmgButtonY: 90,
    dmgShopY: 390,
    shieldButtonY: 190,
    shieldShopY: 440,
    rateButtonY: 290,
    rateShopY: 490,
    costTextX: 470,
    dmgCostY: 90,
    shieldCostY: 190,
    rateCostY: 290,
    fireRateScaling: 10,
    shotGunScaling: 30,
};

module.exports = config;
},{}],8:[function(require,module,exports){
'use strict'
var config = require('./config.js');

var Controls = {
    preload: function () {

    },
    create: function () {
        this.game.stage.backgroundColor = '#ffffff';

        this.background = this.game.add.image(0, 0, 'controls');

        this.backButton = this.game.add.button(590, 530, 'backbutton', this.backSelection, this, 1, 0, 1);

        this.game.camera.flash(0xff0000, 1000);
    },
    backSelection: function () {
        config.menuMusic.stop();
        this.game.state.start('MainMenu');
    },

};

module.exports = Controls;
},{"./config.js":7}],9:[function(require,module,exports){
'use strict';
const Character = require('./character.js');
var config = require('./config.js');

const speed = 75;

function Enemy(game, x, y, imgName, player) {
    Character.call(this, game, x, y, imgName);

    this.speed = speed;
    this.maxHealth = 90;
    this.timePerAttack = 2000; // ataca cada X milisegundos
    this.lastAttack = 0; // tiempo desde el ultimo ataque

    this.pDmg = this.game.add.audio('Pdolor'); // el player recibe daño
    this.pDmg.volume = config.entityVolume;
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
        this.damage = 20 + config.dmgScale;
        console.log(this.damage);
        this.pDmg.play();
    }
    else {
        this.damage = 0;
    }
}

module.exports = Enemy;
},{"./character.js":6,"./config.js":7}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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

Groups.prototype.updateGroups = function () {
    this.enemies.forEach(this.game.physics.arcade.moveToObject,
        this.game.physics.arcade, false, this.player, 75);
    this.game.physics.arcade.collide(this.enemies.children, this.enemies.children);
    this.bosses.forEach(this.game.physics.arcade.moveToObject,
        this.game.physics.arcade, false, this.player, this.bosses.speed);
    this.game.physics.arcade.collide(this.bosses.children, this.bosses.children);
    
    this.game.world.bringToTop(this.enemies);
    this.game.world.bringToTop(this.bosses);
}

Groups.prototype.render = function () {
    this.enemies.forEach(this.game.debug.body, this.game.debug);
    this.bosses.forEach(this.game.debug.body, this.game.debug);

}

module.exports = Groups;
},{}],12:[function(require,module,exports){
'use strict';

const config = require('./config.js');

function HUD(game, music) {
    this.game = game;
    this.music = music;
    this.fade = game.add.tween();

    this.waveComp = game.add.sprite(config.roundMsgX, config.roundMsgY, 'wavecomp');
    this.waveComp.anchor.setTo(0.5, 0.5);
    this.waveComp.alpha = 0;
    this.waveComp.fixedToCamera = true;

    this.waveInc = game.add.sprite(config.roundMsgX, config.roundMsgY, 'waveinc');
    this.waveInc.anchor.setTo(0.5, 0.5);
    this.waveInc.alpha = 0;
    this.waveInc.fixedToCamera = true;

    this.wave = game.add.sprite(config.waveX, config.waveY, 'waveui');
    this.wave.anchor.setTo(0, 0.5);
    this.wave.scale.setTo(0.5, 0.5);
    this.wave.fixedToCamera = true;

    this.playerUI = game.add.sprite(config.waveX, config.playerY, 'playerui');
    this.playerUI.anchor.setTo(0, 1);
    this.playerUI.scale.setTo(0.5, 0.5);
    this.playerUI.fixedToCamera = true;

    this.healUI = game.add.sprite(config.healX, config.healY, 'heal');
    this.healUI.anchor.setTo(0.5, 0.5);
    this.healUI.scale.setTo(0.5, 0.5);
    this.healUI.fixedToCamera = true;

    this.money = game.add.sprite(config.waveX, config.dollarY, 'dollar');
    this.money.anchor.setTo(0, 0.5);
    this.money.scale.setTo(0.10, 0.10);
    this.money.fixedToCamera = true;

    this.enemyText = this.game.add.text(config.enemyTextX, config.enemyTextY, "",
        {
            font: "14px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.enemyText.anchor.setTo(0, 0.5);
    this.enemyText.fixedToCamera = true;

    this.waveText = this.game.add.text(config.waveTextX, config.waveTextY, "",
        {
            font: "10px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.waveText.anchor.setTo(0, 0.5);
    this.waveText.fixedToCamera = true;

    this.moneyText = this.game.add.text(config.dollarTextX, config.dollarTextY, "90/90",
        {
            font: "18px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.moneyText.anchor.setTo(0, 0.5);
    this.moneyText.fixedToCamera = true;

    this.healthText = this.game.add.text(config.playerTextX, config.healthTextY, "100",
        {
            font: "14px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.healthText.anchor.setTo(0, 0.5);
    this.healthText.fixedToCamera = true;

    this.shieldText = this.game.add.text(config.playerTextX, config.shieldTextY, "000",
        {
            font: "14px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldText.anchor.setTo(0, 0.5);
    this.shieldText.fixedToCamera = true;

    // PAUSE MENU
    game.input.onDown.add(this.unpause, this);

    this.panel = this.game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'panel');
    this.resume = this.game.add.sprite(
        game.camera.width / 2, 90, 'resumebutton');
    this.restart = this.game.add.sprite(
        game.camera.width / 2, 290, 'restartbutton');
    this.exit = this.game.add.sprite(
        game.camera.width / 2, 490, 'exitpause');

    this.panel.anchor.setTo(0.5, 0.5);
    this.panel.fixedToCamera = true;

    this.resume.anchor.setTo(0.5, 0.5);
    this.resume.scale.setTo(0.75, 0.75);
    this.resume.fixedToCamera = true;

    this.restart.anchor.setTo(0.5, 0.5);
    this.restart.scale.setTo(0.75, 0.75);
    this.restart.fixedToCamera = true;

    this.exit.anchor.setTo(0.5, 0.5);
    this.exit.scale.setTo(0.75, 0.75);
    this.exit.fixedToCamera = true;

    // we initialize de pausemenu deactivated
    this.panel.kill();
    this.resume.kill();
    this.restart.kill();
    this.exit.kill();

}

HUD.prototype.pause = function () {
    this.game.paused = !this.game.paused;
    this.panel.exists = this.resume.exists = this.restart.exists = this.exit.exists = this.game.paused;
}

HUD.prototype.unpause = function () {
    if (this.game.paused) {
        if (this.resume.getBounds().contains(this.game.input.x, this.game.input.y)) {
            this.game.paused = false;
            this.panel.exists = this.resume.exists = this.restart.exists = this.exit.exists = this.game.paused;
        }
        else if (this.restart.getBounds().contains(this.game.input.x, this.game.input.y)) {
            this.game.paused = false;
            this.music.stop();
            this.panel.exists = this.resume.exists = this.restart.exists = this.exit.exists = this.game.paused;
            this.game.state.restart();
        }
        else if (this.exit.getBounds().contains(this.game.input.x, this.game.input.y)) {
            this.game.paused = false;
            this.music.stop();
            this.panel.exists = this.resume.exists = this.restart.exists = this.exit.exists = this.game.paused;
            this.game.state.start('MainMenu');
        }
    }
}

HUD.constructor = HUD;

HUD.prototype.update = function () {
    this.healUI.exists = config.healOnCD;

    this.game.world.bringToTop(this.waveComp);
    this.game.world.bringToTop(this.waveInc);
    this.game.world.bringToTop(this.wave);
    this.game.world.bringToTop(this.playerUI);
    this.game.world.bringToTop(this.healUI);
    this.game.world.bringToTop(this.money);

    this.game.world.bringToTop(this.waveText);
    this.game.world.bringToTop(this.enemyText);
    this.game.world.bringToTop(this.shieldText);
    this.game.world.bringToTop(this.healthText);
    this.game.world.bringToTop(this.moneyText);

}

HUD.prototype.pauseUpdate = function () {
    this.game.world.bringToTop(this.panel);
    this.game.world.bringToTop(this.resume);
    this.game.world.bringToTop(this.restart);
    this.game.world.bringToTop(this.exit);
}

HUD.prototype.waveComplete = function () {
    fadeInOutCallback(this.waveComp, 1, 2000, this.game, fadeOut);
    //	cuando el tween acabe llama a la funcion
}

HUD.prototype.waveIncoming = function () {
    fadeInOutCallback(this.waveInc, 1, 2000, this.game, fadeOut);
}

function fadeInOutCallback(sprite, alpha, time, game, callback) {
    // crea un tween que hace fade in o fade out del sprite indicado
    // y al acabar ejecuta la funcion indicada
    game.add.tween(sprite).to({ alpha: alpha }, time,
        Phaser.Easing.Linear.None, true).onComplete.add(
            function () { game.time.events.add(1000, callback, this, sprite, game); }, this);
}

function fadeInOut(sprite, alpha, time, game) {
    // crea un tween que hace fade in o fade out del sprite indicado
    game.add.tween(sprite).to({ alpha: alpha }, time,
        Phaser.Easing.Linear.None, true);
}

function fadeOut(sprite, game) {
    fadeInOut(sprite, 0, 2000, game);
}

module.exports = HUD;
},{"./config.js":7}],13:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');
var SubMenu = require('./SubMenu.js');
var MainMenu = require('./MainMenu.js');
var GameOver = require('./GameOver.js');
var youWin = require('./youwin.js');
var Controls = require('./controls.js');
var Options = require('./options.js');

var BootScene = {
  preload: function () {
    // aqui se ponen los recursos, imagenes y sonido
    this.game.load.image('preloader_bar', './assets/images/preloader_bar.png');

  },
  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
  },

  create: function () {
    this.game.state.start('preloader');
  },
};
var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(70, 440, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);
    // TODO: load here the assets for the game

    //images
    this.game.load.image('background', './assets/images/background.png');
    this.game.load.image('menu', './assets/images/menu1.png');
    this.game.load.image('controls', './assets/images/controls.png');
    this.game.load.image('submenu', './assets/images/submenu.png');
    this.game.load.image('gameover', './assets/images/gameover.png');
    this.game.load.image('youwin', './assets/images/youwin.png');
    this.game.load.image('wavecomp', './assets/images/waveComplete.png');
    this.game.load.image('waveinc', './assets/images/waveIncoming.png');
    this.game.load.image('waveui', './assets/images/waveUI.png');
    this.game.load.image('playerui', './assets/images/playerUI.png');
    this.game.load.image('defeat', './assets/images/defeat.png');
    this.game.load.image('panel', './assets/images/pausePanel.png');
    this.game.load.image('volume', './assets/images/volume.png');
    this.game.load.image('volumebar', './assets/images/volumeBar.png');
    this.game.load.image('dollar', './assets/images/dollar.png');
    this.game.load.image('heal', './assets/images/heal.png');

    //botones
    this.game.load.image('againbutton', './assets/images/againbutton.png');
    this.game.load.image('resumebutton', './assets/images/resumebutton.png');
    this.game.load.image('restartbutton', './assets/images/restart.png');
    this.game.load.image('exitpause', './assets/images/exitbutton1.png');
    this.game.load.image('dmgup', './assets/images/dmgUp.png');
    this.game.load.image('shieldup', './assets/images/shieldUp.png');
    this.game.load.image('rateup', './assets/images/rateUp.png');
    this.game.load.image('up', './assets/images/up.png');
    this.game.load.image('down', './assets/images/down.png');

    // botones spritesheet
    this.game.load.spritesheet('playbutton', './assets/images/playbutton2.png', 156, 46, 2);
    this.game.load.spritesheet('exitbutton', './assets/images/exitbutton3.png', 128, 44, 2);
    this.game.load.spritesheet('optionbutton', './assets/images/optionbutton.png', 269, 50, 2);
    this.game.load.spritesheet('controlbutton', './assets/images/controlbutton.png', 269, 50, 2);
    this.game.load.spritesheet('backbutton', './assets/images/backbutton.png', 150, 40, 2);
    this.game.load.spritesheet('soldierbutton', './assets/images/soldadobutton1.png', 224, 30, 2);
    this.game.load.spritesheet('medicbutton', './assets/images/medicobutton1.png', 182, 32, 2);
    this.game.load.spritesheet('berserkerbutton', './assets/images/berserkerbutton1.png', 269, 26, 2);

    //muñecos
    this.game.load.image('bullet', './assets/images/red_bullet.png');
    this.game.load.image('zombi', './assets/images/zombi2.png');
    this.game.load.image('player', './assets/images/player.png');
    this.game.load.image('Boss', './assets/images/Boss.png');
    this.game.load.image('choff', './assets/images/chof.png');

    //music & sounds
    this.game.load.audio('musicaFondo', './assets/sounds/Pentagram.mp3');
    this.game.load.audio('musicaAccion', './assets/sounds/HeavyAction.mp3');
    this.game.load.audio('musicaMenu', './assets/sounds/ZombieRock.mp3');
    this.game.load.audio('Zhola', './assets/sounds/zombihola.wav');
    this.game.load.audio('Zdolor', './assets/sounds/zombidolor.mp3');
    this.game.load.audio('shoot', './assets/sounds/shoot.wav');
    this.game.load.audio('shotgun1', './assets/sounds/shotgun1.wav');
    this.game.load.audio('shotgun2', './assets/sounds/shotgun2.wav');
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

var WebFontConfig = {
  active: function () {
    console.log("font loaded");
  },

  google: {
    families: ['Press Start 2P']
  },

  custom: {
    families: ['8-bit'],
    urls: ["./fonts.css"],
  },

};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  WebFont.load(WebFontConfig);

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('SubMenu', SubMenu);
  game.state.add('MainMenu', MainMenu);
  game.state.add('GameOver', GameOver);
  game.state.add('controls', Controls);
  game.state.add('youwin', youWin);
  game.state.add('options', Options);

  game.state.start('boot');
};

},{"./GameOver.js":1,"./MainMenu.js":2,"./SubMenu.js":3,"./controls.js":8,"./options.js":15,"./play_scene.js":16,"./youwin.js":21}],14:[function(require,module,exports){
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
    this.healStat = 40;
}

Medic.prototype = Object.create(Player.prototype);
Medic.constructor = Medic;

Medic.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        if (this.controls.shoot.active) {
            if (!this.shoot.isPlaying)
                this.shoot.play();
            this.weapon.fireAtPointer();
        }
    }
}

module.exports = Medic;

},{"./player.js":17}],15:[function(require,module,exports){
'use strict'

var config = require('./config.js');

var Options = {
    preload: function () {

    },
    create: function () {
        this.game.stage.backgroundColor = '#ffffff';

        this.background = this.game.add.image(0, 0, 'background');
        this.panel = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'panel');
        this.panel.anchor.setTo(0.5, 0.5);
        this.panel.scale.setTo(0.55, 0.55);

        this.bars = this.game.add.group();
        this.musicBar = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 - 100, 'volume');
        this.bars.add(this.musicBar);
        this.soundBar = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'volume');
        this.bars.add(this.soundBar);
        this.shootBar = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 + 100, 'volume');
        this.bars.add(this.shootBar);
        this.bars.setAll('anchor.x', 0.5);
        this.bars.setAll('anchor.y', 0.5);
        this.bars.setAll('scale.x', 0.5);
        this.bars.setAll('scale.y', 0.5);

        this.upButtons = this.game.add.group();
        this.upButton = this.game.add.button(this.game.camera.width / 2 + this.musicBar.width / 2 + 30, this.game.camera.height / 2 - 100, 'up', this.musicUp, this);
        this.upButton1 = this.game.add.button(this.game.camera.width / 2 + this.musicBar.width / 2 + 30, this.game.camera.height / 2, 'up', this.soundUp, this);
        this.upButton2 = this.game.add.button(this.game.camera.width / 2 + this.musicBar.width / 2 + 30, this.game.camera.height / 2 + 100, 'up', this.shootUp, this);
        this.upButtons.add(this.upButton);
        this.upButtons.add(this.upButton1);
        this.upButtons.add(this.upButton2);
        this.upButtons.setAll('anchor.x', 0.5);
        this.upButtons.setAll('anchor.y', 0.5);
        this.upButtons.setAll('scale.x', 0.5);
        this.upButtons.setAll('scale.y', 0.5);

        this.downButtons = this.game.add.group();
        this.downButton = this.game.add.button(this.game.camera.width / 2 - this.musicBar.width / 2 - 30, this.game.camera.height / 2 - 100, 'down', this.musicDown, this);
        this.downButton1 = this.game.add.button(this.game.camera.width / 2 - this.musicBar.width / 2 - 30, this.game.camera.height / 2, 'down', this.soundDown, this);
        this.downButton2 = this.game.add.button(this.game.camera.width / 2 - this.musicBar.width / 2 - 30, this.game.camera.height / 2 + 100, 'down', this.shootDown, this);
        this.downButtons.add(this.downButton);
        this.downButtons.add(this.downButton1);
        this.downButtons.add(this.downButton2);
        this.downButtons.setAll('anchor.x', 0.5);
        this.downButtons.setAll('anchor.y', 0.5);
        this.downButtons.setAll('scale.x', 0.5);
        this.downButtons.setAll('scale.y', 0.5);

        this.cursors = this.game.add.group();
        this.musicController = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 - 100, 'volumebar');
        this.soundController = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'volumebar');
        this.shootController = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2 + 100, 'volumebar');
        this.cursors.add(this.musicController);
        this.cursors.add(this.soundController);
        this.cursors.add(this.shootController);
        this.cursors.setAll('anchor.x', 0.5);
        this.cursors.setAll('anchor.y', 0.5);
        this.cursors.setAll('scale.x', 0.5);
        this.cursors.setAll('scale.y', 0.5);

        this.backButton = this.game.add.button(590, 530, 'backbutton', this.backSelection, this, 1, 0, 1);

        this.musicText = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2 - 150, "Music Volume",
            {
                font: "18px 8-bit",
                fill: "#ff9600",
                align: "center"
            });
        this.musicText.anchor.setTo(0.5, 0.5);
        this.soundText = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2 - 50, "Characters Volume",
            {
                font: "18px 8-bit",
                fill: "#ff9600",
                align: "center"
            });
        this.soundText.anchor.setTo(0.5, 0.5);
        this.shootText = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2 + 50, "Sounds Volume",
            {
                font: "18px 8-bit",
                fill: "#ff9600",
                align: "center"
            });
        this.shootText.anchor.setTo(0.5, 0.5);

        this.game.camera.flash(0xff0000, 1000);
    },

    update: function () {
        if (config.musicVolume === 0)
            this.cursors.getChildAt(0).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 2;
        else if (config.musicVolume === 0.5)
            this.cursors.getChildAt(0).x = this.game.camera.width / 2;
        else if (config.musicVolume === 0.25)
            this.cursors.getChildAt(0).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 4;
        else if (config.musicVolume === 0.75)
            this.cursors.getChildAt(0).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 4;
        else if (config.musicVolume === 1)
            this.cursors.getChildAt(0).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 2;

        if (config.entityVolume === 0)
            this.cursors.getChildAt(1).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 2;
        else if (config.entityVolume === 0.5)
            this.cursors.getChildAt(1).x = this.game.camera.width / 2;
        else if (config.entityVolume === 0.25)
            this.cursors.getChildAt(1).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 4;
        else if (config.entityVolume === 0.75)
            this.cursors.getChildAt(1).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 4;
        else if (config.entityVolume === 1)
            this.cursors.getChildAt(1).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 2;

        if (config.shotsVolume === 0)
            this.cursors.getChildAt(2).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 2;
        else if (config.shotsVolume === 0.28)
            this.cursors.getChildAt(2).x = this.game.camera.width / 2;
        else if (config.shotsVolume === 0.14)
            this.cursors.getChildAt(2).x = this.bars.getChildAt(0).x - this.bars.getChildAt(0).width / 4;
        else if (config.shotsVolume === 0.42000000000000004)
            this.cursors.getChildAt(2).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 4;
        else if (config.shotsVolume === 0.56)
            this.cursors.getChildAt(2).x = this.bars.getChildAt(0).x + this.bars.getChildAt(0).width / 2;
    },

    musicUp: function () {
        if (config.musicVolume < 1) {
            config.musicVolume += 0.25;
        }
    },
    musicDown: function () {
        if (config.musicVolume > 0) {
            config.musicVolume -= 0.25;
        }
    },

    soundDown: function () {
        if (config.entityVolume > 0) {
            config.entityVolume -= 0.25;
        }
    },

    soundUp: function () {
        if (config.entityVolume < 1) {
            config.entityVolume += 0.25;
        }
    },

    shootDown: function () {
        if (config.shotsVolume > 0) {
            config.shotsVolume -= 0.14;
        }
    },

    shootUp: function () {
        if (config.shotsVolume < 0.56) {
            config.shotsVolume += 0.14;
        }
    },

    backSelection: function () {
        config.menuMusic.stop();
        this.game.state.start('MainMenu');
    },

};


module.exports = Options;
},{"./config.js":7}],16:[function(require,module,exports){
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

    config.dmgScale = 5;
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

},{"./boss.js":5,"./config.js":7,"./enemy.js":9,"./groups.js":11,"./hud.js":12,"./playerManager.js":18,"./shop.js":19}],17:[function(require,module,exports){
'use strict';

const Character = require('./character.js');
var config = require('./config.js');

const speed = 150;

//function 
function Player(game, x, y, imgName) {
    Character.call(this, game, x, y, imgName);
    this.scale.setTo(0.15, 0.15);
    // we create the weapon 
    this.weapon = game.add.weapon(100, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bullets.setAll('anchor.x', 0.5);
    this.weapon.bullets.setAll('anchor.y', 0.5);
    this.weapon.trackSprite(this, 0, 0, true);// the bullets come out from player
    // se puede poner un offset con los 2 numeros

    this.lastShoot = 0;
    this.speed = speed;
    this.healStat = 25;

    this.controls = {
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        heal: game.input.keyboard.addKey(Phaser.Keyboard.Q),
        shoot: game.input.activePointer,
    };

    this.shoot = this.game.add.audio('shoot');
    this.shoot.volume = config.shotsVolume;

    this.controls.heal.onDown.add(function () {
        if (Date.now() - this.lastHeal > this.timePerHeal) {
            this.lastHeal = Date.now();
            this.heal(this.healStat);
            config.healOnCD = false;
        }
    }, this);
    game.input.keyboard.removeKeyCapture(Phaser.Keyboard.Q);

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

    if (Date.now() - this.lastHeal > this.timePerHeal) {
        config.healOnCD = true;

    }
}

Player.prototype.heal = function (h) {
    Character.prototype.heal.call(this, h);
}

Player.prototype.render = function () {
}

module.exports = Player;
},{"./character.js":6,"./config.js":7}],18:[function(require,module,exports){
'use strict';

var config = require('./config.js');
const Soldier = require('./soldier.js');
const Berserker = require('./berserker.js');
const Medic = require('./medic.js');

function PlayerManager(game, x, y, imgName) {
    if (config.chosenClass === 1) {
        this.subClass = new Soldier(game, x, y, imgName);
    }
    else if (config.chosenClass === 2) {
        this.subClass = new Medic(game, x, y, imgName);
    }
    else if (config.chosenClass === 3) {
        this.subClass = new Berserker(game, x, y, imgName);
    }
}

module.exports = PlayerManager;

},{"./berserker.js":4,"./config.js":7,"./medic.js":14,"./soldier.js":20}],19:[function(require,module,exports){
'use strict';

const config = require('./config.js');


function Shop(game, player, playscene) {
    this.game = game;
    this.player = player;
    this.scene = playscene;
    if (config.chosenClass != 3)
        this.fireRate = player.weapon.fireRate;
    else
        this.fireRate = player.timePerShoot;
    this.initFireRate = this.fireRate;
    this.dmgUpSelec = 1; // number of times we selected the dmg up option    
    this.costProg = 4; // the scale factor of the price
    this.dmgUpCost = 100; // initial cost
    this.shieldSelec = 1;
    this.shieldUpCost = 150;
    this.rateSelec = 1;
    this.rateUpCost = 80;

    this.panel = this.game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'panel');
    this.panel.anchor.setTo(0.5, 0.5);
    this.panel.fixedToCamera = true;
    this.dmgButton = this.game.add.button(config.shopButtonX, config.dmgButtonY, 'dmgup', this.dmgUpClick, this);
    this.dmgButton.scale.setTo(0.1, 0.1);
    this.dmgButton.anchor.setTo(0, 0.5);
    this.dmgButton.fixedToCamera = true;
    this.shieldButton = this.game.add.button(config.shopButtonX, config.shieldButtonY, 'shieldup', this.shieldUpClick, this);
    this.shieldButton.scale.setTo(0.12, 0.12);
    this.shieldButton.anchor.setTo(0, 0.5);
    this.shieldButton.fixedToCamera = true;
    this.rateButton = this.game.add.button(config.shopButtonX, config.rateButtonY, 'rateup', this.rateUpClick, this);
    this.rateButton.scale.setTo(0.12, 0.12);
    this.rateButton.anchor.setTo(0, 0.5);
    this.rateButton.fixedToCamera = true;

    this.dmgText = this.game.add.text(config.shopTextX, config.dmgShopY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.dmgText.anchor.setTo(0, 0.5);
    this.dmgText.fixedToCamera = true;

    this.shieldText = this.game.add.text(config.shopTextX, config.shieldShopY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldText.anchor.setTo(0, 0.5);
    this.shieldText.fixedToCamera = true;

    this.rateText = this.game.add.text(config.shopTextX, config.rateShopY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.rateText.anchor.setTo(0, 0.5);
    this.rateText.fixedToCamera = true;

    this.dmgCostText = this.game.add.text(config.costTextX, config.dmgCostY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.dmgCostText.anchor.setTo(0, 0.5);
    this.dmgCostText.fixedToCamera = true;

    this.shieldCostText = this.game.add.text(config.costTextX, config.shieldCostY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldCostText.anchor.setTo(0, 0.5);
    this.shieldCostText.fixedToCamera = true;

    this.rateCostText = this.game.add.text(config.costTextX, config.rateCostY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.rateCostText.anchor.setTo(0, 0.5);
    this.rateCostText.fixedToCamera = true;
    this.kill();
}

Shop.prototype.kill = function () {
    this.panel.kill();
    this.dmgButton.kill();
    this.shieldButton.kill();
    this.rateButton.kill();
    this.dmgCostText.kill();
    this.shieldCostText.kill();
    this.shieldText.kill();
    this.dmgText.kill();
    this.rateText.kill();
    this.rateCostText.kill();
}

Shop.prototype.revive = function () {
    this.panel.exists =
        this.dmgButton.exists =
        this.shieldButton.exists =
        this.rateButton.exists =
        this.dmgCostText.exists =
        this.shieldCostText.exists =
        this.shieldText.exists =
        this.dmgText.exists =
        this.rateText.exists =
        this.rateCostText.exists = true;
}

Shop.prototype.update = function () {

    this.dmgText.setText("Current damage: " + this.player.damage);
    this.shieldText.setText("Current shield: " + this.player.shield);
    this.rateText.setText("Current fire rate: " + (this.fireRate));
    this.dmgCostText.setText(this.dmgUpCost);
    this.shieldCostText.setText(this.shieldUpCost);
    this.rateCostText.setText(this.rateUpCost);

    this.game.world.bringToTop(this.panel);
    this.game.world.bringToTop(this.dmgButton);
    this.game.world.bringToTop(this.shieldButton);
    this.game.world.bringToTop(this.rateButton);
    this.game.world.bringToTop(this.dmgCostText);
    this.game.world.bringToTop(this.shieldCostText);
    this.game.world.bringToTop(this.shieldText);
    this.game.world.bringToTop(this.dmgText);
    this.game.world.bringToTop(this.rateText);
    this.game.world.bringToTop(this.rateCostText);

    if (this.panel.exists)
        this.player.controls.shoot.active = false;
    else
        this.player.controls.shoot.active = true;

}

Shop.prototype.dmgUpClick = function () {
    if (this.scene.money >= this.dmgUpCost) {
        this.scene.money -= this.dmgUpCost;

        var log = Math.log(this.dmgUpSelec) / Math.log(this.costProg);
        this.dmgUpCost += Math.floor(this.dmgUpCost * log);
        this.player.damage += Math.floor(this.player.damage * log / 3);
        this.dmgUpSelec++;
    }
}

Shop.prototype.shieldUpClick = function () {
    if (this.scene.money >= this.shieldUpCost) {
        this.scene.money -= this.shieldUpCost;

        var log = Math.log(this.shieldSelec) / Math.log(this.costProg);
        this.shieldUpCost += Math.floor(this.shieldUpCost * log);
        this.player.shield = Math.floor(80 * log / 2);
        this.shieldSelec++;
    }
}

Shop.prototype.rateUpClick = function () {
    if (this.scene.money >= this.rateUpCost) {
        this.scene.money -= this.rateUpCost;

        var log = Math.log(this.rateSelec) / Math.log(this.costProg);
        this.rateUpCost += Math.floor(this.rateUpCost * log);
        if (config.chosenClass != 3) {
            this.player.weapon.fireRate -= config.fireRateScaling;
            this.fireRate -= config.fireRateScaling; // para el ui update
        }
        else {
            this.player.timePerShoot -= config.shotGunScaling;
            this.fireRate -= config.shotGunScaling; // para el ui update

        }
        this.rateSelec++;
        if (this.fireRate <= 0)
            this.fireRate = 0
    }
}

Shop.constructor = Shop;
module.exports = Shop;

},{"./config.js":7}],20:[function(require,module,exports){
'use strict';

const Player = require('./player.js');

const fireRate = 150;
const bulletSpeed = 350;
const bulletLife = 1500;

function Soldier(game, x, y, imgName) {
    Player.call(this, game, x, y, imgName);

    this.weapon.bulletLifespan = bulletLife;
    this.weapon.bulletSpeed = bulletSpeed;
    this.weapon.fireRate = fireRate;
    this.weapon.bulletAngleVariance = 5;
    this.damage = 20;

}

Soldier.prototype = Object.create(Player.prototype);
Soldier.constructor = Soldier;

Soldier.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        if (this.controls.shoot.active) {
            this.weapon.fireAtPointer();

            this.shoot.play();
        }
    }
}

module.exports = Soldier;

},{"./player.js":17}],21:[function(require,module,exports){
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

       
        againbutton = this.game.add.button(325, 440, 'exitbutton', this.actionOnClick, this, 1, 0, 1);
        this.winsound.play();
    },
    
    actionOnClick: function () {
        this.winsound.stop();
        this.game.state.start('MainMenu');
    },    

};


module.exports = youwin;
},{}]},{},[13]);
