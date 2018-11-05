'use strict';

var PlayScene = require('./states/play_scene.js');


var BootScene = {
  preload: function () {
    // aqui se ponen los recursos, imagenes y sonido
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    
  },

  init: function(){
  this.input.maxPointers = 1;
  this.stage.disableVisibilityChange = true;
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);
    this.time.advancedTiming = true;

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.spritesheet('player', 'images/6ZombieSpriteSheet.png',41,36);
  
  },

  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  //game.state.add('menu', MenuScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
