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
