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
    this.game.load.image('submenu', './assets/images/submenu.png');
    this.game.load.image('gameover', './assets/images/gameover.png');
    this.game.load.image('youwin', './assets/images/youwin.png');
    this.game.load.image('wavecomp', './assets/images/waveComplete.png');
    this.game.load.image('waveinc', './assets/images/waveIncoming.png');
    this.game.load.image('defeat', './assets/images/defeat.png');
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
    this.game.load.image('zombi', './assets/images/zombi.png');
    this.game.load.spritesheet('player', './assets/images/6ZombieSpriteSheet.png', 40, 36);
    this.game.load.spritesheet('enemy', './assets/images/2ZombieSpriteSheet.png', 40, 36);
    this.game.load.image('zombiBoy', './assets/images/zombiBoy.png');
    //music
    this.game.load.audio('musicaFondo', './assets/sounds/Pentagram.mp3');
    this.game.load.audio('musicaAccion', './assets/sounds/HeavyAction.mp3');
    this.game.load.audio('musicaMenu', './assets/sounds/ZombieRock.mp3');
    this.game.load.audio('Zhola', './assets/sounds/zombihola.wav');
    this.game.load.audio('Zdolor', './assets/sounds/zombidolor.mp3');
    this.game.load.audio('shoot','./assets/sounds/shoot.wav');
    this.game.load.audio('shotgun1', './assets/sounds/shotgun.wav');
    this.game.load.audio('shotgun2', './assets/sounds/shotgun+Reload.wav');
    this.game.load.audio('Pdolor', './assets/sounds/pain.wav');
    this.game.load.audio('winsound', './assets/sounds/winsound.wav');
    //mapa
    this.game.load.tilemap('Mapa', './assets/images/Mapa.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiledSangre', './assets/images/tilesetsangriento.png');
    this.game.load.image('tiledStoneInterior', './assets/images/stone_house_interior.png');
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
