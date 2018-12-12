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

    this.game.state.start('youwin');
  },
};


module.exports = GameOver;
},{}],2:[function(require,module,exports){
'use strict'
//var sound = require('./sound.js');

var MainMenu = {

    preload: function () {

        //this.game.add.audio('musicaFondo').loopFull(1);


    },

    create: function () {
        var playbutton;
        var classbutton;
        var background;
        var exitbutton;
        this.game.stage.backgroundColor = '#182d3b';

        this.background = this.game.add.image(0, 0, 'menu');

        playbutton = this.game.add.button(318, 315, 'playbutton', this.actionOnClick, this/*, 2, 1, 0*/);
        classbutton = this.game.add.button(150, 375, 'classbutton', this.actionOnClick2, this);
        exitbutton = this.game.add.button(325, 440, 'exitbutton', this.actionOnClick3, this);
        this.ZombieRock = this.game.add.audio('musicaMenu');
        this.ZombieRock.play();
        /*button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);*/

    },
    actionOnClick: function () {
        //this.background.visible =! this.background.visible;
        console.log(this.game.clase);
        this.ZombieRock.stop();
        this.game.state.start('play');
    },
    actionOnClick2: function () {
        //this.background.visible =! this.background.visible;
        //this.ZombieRock.stop();
        this.game.state.start('SubMenu');
    },
    actionOnClick3: function () {
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
		var soldadobutton;
		var medicobutton;
		var background;
		var berserkerbutton;
		this.game.stage.backgroundColor = '#ffffff';

		this.background = this.game.add.image(0, 0, 'submenu');

		soldadobutton = this.game.add.button(290, 190, 'soldadobutton', this.actionOnClick, this/*, 2, 1, 0*/);
		medicobutton = this.game.add.button(315, 275, 'medicobutton', this.actionOnClick2, this);
		berserkerbutton = this.game.add.button(270, 380, 'berserkerbutton', this.actionOnClick3, this);
		/*button.onInputOver.add(over, this);
		button.onInputOut.add(out, this);
		button.onInputUp.add(up, this);*/

	},
	actionOnClick: function () {
		this.game.clase = 1;
		this.game.state.start('MainMenu');
	},
	actionOnClick2: function () {
		this.game.clase = 2;
		this.game.state.start('MainMenu');
	},
	actionOnClick3: function () {
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
    
    console.log("Im a berserker");
}

Berserker.prototype = Object.create(Player.prototype);
Berserker.constructor = Berserker;

Berserker.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        this.weapon.fireAtPointer();
        //this.weapon.fireAtPointer();
        //this.weapon.fireAtPointer();
        //this.weapon.fireOffset(0, 0);
    }

    this.weapon.resetShots();
}

module.exports = Berserker;
},{"./player.js":12}],5:[function(require,module,exports){
'use strict';
const Entity = require('./entity');

const maxHealth = 100;

function Character(game, x, y, imgName) {
    Entity.call(this, game, x, y, imgName);
    game.physics.arcade.enable(this);
    this.scale.setTo(0.25, 0.25);
    this.body.colliderWorldBounds = true;
    this.health = 100;
    this.damage = 1;
}

Character.prototype = Object.create(Entity.prototype);
Character.prototype.constructor = Character;

Character.prototype.update = function () {
    if (this.health > 100) {
        this.health = 100;
    }
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
    }
}

module.exports = Character;
},{"./entity":7}],6:[function(require,module,exports){
'use strict';
const Character = require('./character');

function Enemy(game, x, y, imgName) {
    //Phaser.Sprite.call(this, game, x, y, imgName);
    Character.call(this, game, x, y, imgName);
    this.scale.setTo(0.25, 0.25);
    //game.add.existing(this);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.constructor = Enemy;


module.exports = Enemy;
},{"./character":5}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');
var SubMenu = require('./SubMenu.js');
var MainMenu = require('./MainMenu.js');
var GameOver = require('./GameOver.js');
var youwin = require('./youwin.js');

var BootScene = {
  preload: function () {
    // aqui se ponen los recursos, imagenes y sonido
    this.game.load.image('preloader_bar', '../assets/images/preloader_bar.png');

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
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game

    //images
    this.game.load.image('menu', './assets/images/menu.png');
    this.game.load.image('submenu', '../assets/images/submenu.png');
    this.game.load.image('gameover', '../assets/images/gameover.png');
    this.game.load.image('youwin', '../assets/images/youwin.png');
    this.game.load.image('wavecomp', '../assets/images/waveComplete.png');
    this.game.load.image('waveinc', '../assets/images/waveIncoming.png');
    this.game.load.image('defeat', '../assets/images/defeat.png');
    //botones
    this.game.load.image('playbutton', './assets/images/playbutton.png');
    this.game.load.image('classbutton', '../assets/images/classbutton.png');
    this.game.load.image('soldadobutton', '../assets/images/soldadobutton.png');
    this.game.load.image('medicobutton', '../assets/images/medicobutton.png');
    this.game.load.image('exitbutton', '../assets/images/exitbutton.png');
    this.game.load.image('berserkerbutton', '../assets/images/berserkerbutton.png');
    this.game.load.image('againbutton', '../assets/images/againbutton.png');
    
    //muñecos
    this.game.load.image('bullet', '../assets/images/red_bullet.png');
    this.game.load.image('zombi', '../assets/images/zombi.png');
    this.game.load.spritesheet('player', 'assets/images/6ZombieSpriteSheet.png', 40, 36);
    this.game.load.spritesheet('enemy', 'assets/images/2ZombieSpriteSheet.png', 40, 36);
    this.game.load.image('zombiBoy', '../assets/images/zombiBoy.png');
    //music
    this.game.load.audio('musicaFondo', '../assets/sounds/Pentagram.mp3');
    this.game.load.audio('musicaAccion', '../assets/sounds/HeavyAction.mp3');
    this.game.load.audio('musicaMenu', '../assets/sounds/ZombieRock.mp3');
    this.game.load.audio('Zhola', '../assets/sounds/zombihola.wav');
    this.game.load.audio('Zdolor', '../assets/sounds/zombidolor.mp3');
    this.game.load.audio('shotgun1', '../assets/sounds/shotgun.wav');
    this.game.load.audio('shotgun2', '../assets/sounds/shotgun+Reload.wav');
    this.game.load.audio('Pdolor', '../assets/sounds/pain.wav');
    this.game.load.audio('winsound', '../assets/sounds/winsound.wav');
  },

  create: function () {
    var clase = 1;
    console.log(clase);
    var ZombieRock = this.game.add.audio('musicaMenu');
    //ZombieRock.play();

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
  game.state.add('youwin', youwin);

  game.state.start('boot');
};

},{"./GameOver.js":1,"./MainMenu.js":2,"./SubMenu.js":3,"./play_scene.js":11,"./youwin.js":14}],9:[function(require,module,exports){
'use strict';


var mapa = {
  
  preload: function () {

  },
  create: function () {
    
    this.mapa = this.game.add.tilemap('Mapa');
    this.mapa.addTilesetImage('tilesetsangriento', 'tiledSangre');
    this.mapa.addTilesetImage('stone_house_interior', 'tiledStoneInterior');
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
     //mapa
     this.game.physics.arcade.enable(player);//da fisicas al jugador para que choque
     this.game.physics.arcade.collide(this.colisiones,player);//habilita las colisiones entre paredes y player
     this.game.physics.arcade.collide(this.puerta1,player);
     this.game.physics.arcade.collide(this.puerta2,player);
     this.game.physics.arcade.collide(this.puerta3,player);
    
     this.game.physics.arcade.collide(this.colisiones,enemies);//habilita las colisiones entre paredes y enemigos
     this.game.physics.arcade.collide(this.puerta1,enemies);
     this.game.physics.arcade.collide(this.puerta2,enemies);
     this.game.physics.arcade.collide(this.puerta3,enemies);
  },

};

module.exports = mapa;


},{}],10:[function(require,module,exports){
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
    
    console.log("Im a medic");
}

Medic.prototype = Object.create(Player.prototype);
Medic.constructor = Medic;

Medic.prototype.update = function () {
    Player.prototype.update.call(this);
    if (this.controls.shoot.isDown) {
        this.weapon.fireAtPointer();
    }
}

module.exports = Medic;

},{"./player.js":12}],11:[function(require,module,exports){
'use strict';
//var sound = require('./sound.js');
const Entity = require('./entity');
const Enemy = require('./enemy');
const Player = require('./player.js');
const Soldier = require('./soldier.js');
const Berserker = require('./berserker.js');
const Medic = require('./medic.js');
const mapa = require('./mapa.js');
//const GunMan = require('./gunMan.js');


/* THIS SHOULD GO IN OTHER FILES*/
const enemySpeed = 75;

/*------------------------------*/


var PlayScene = {
  preload: function () {
  },
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.game.stage.backgroundColor = '#313131';

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
    this.game.add.audio('musicaFondo').loopFull(1);
  },

  update: function () {
    this.game.physics.arcade.overlap(this.player.weapon.bullets.children,
      this.enemies.children, this.bulletCollisionHandler, null, this); // miramos los hijos de cada grupo

    this.game.physics.arcade.overlap(this.player, this.enemies.children,
      this.playerCollisionHandler, null, this);


    this.enemies.forEach(this.game.physics.arcade.moveToObject,
      this.game.physics.arcade, false, this.player, enemySpeed);

  },

  bulletCollisionHandler: function (bullet, enemy) {
    bullet.kill();
    enemy.getsDamage(this.player.damage);
  },

  playerCollisionHandler: function (player, enemy) {
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
    this.game.state.start('MainMenu');
  },

};

module.exports = PlayScene;

},{"./berserker.js":4,"./enemy":6,"./entity":7,"./mapa.js":9,"./medic.js":10,"./player.js":12,"./soldier.js":13}],12:[function(require,module,exports){
'use strict';

const Character = require('./character.js');

const speed = 150;

//function 
function Player(game, x, y, imgName) {
    Character.call(this, game, x, y, imgName);
    
    // we create the weapon 
    this.weapon = game.add.weapon(30, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bullets.setAll('anchor.x', 0.5);
    this.weapon.bullets.setAll('anchor.y', 0.5);
    this.weapon.trackSprite(this, 0, 0, true);// the bullets come out from player
    // se puede poner un offset con los 2 numeros

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
    this.rotation = this.game.physics.arcade.angleToPointer(this) + 1.5;

    if (this.controls.up.isDown) {
        this.body.velocity.y -= speed;
    }
    if (this.controls.right.isDown) {
        this.body.velocity.x += speed;
    }
    if (this.controls.down.isDown) {
        this.body.velocity.y += speed;
    }
    if (this.controls.left.isDown) {
        this.body.velocity.x -= speed;
    }
}

Player.prototype.render = function () {
    this.weapon.debug(10, 10, true);
    console.log("Health: " + this.health);
}

module.exports = Player;
},{"./character.js":5}],13:[function(require,module,exports){
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

},{"./player.js":12}],14:[function(require,module,exports){
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
},{}]},{},[8]);
