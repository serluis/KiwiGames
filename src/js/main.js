'use strict';

//var PlayScene = require('./play_scene.js');
var MainMenu = require('./gameObjects/MainMenu.js');

var BootScene = {
  preload: function () {
    // aqui se ponen los recursos, imagenes y sonido
    this.game.load.image('preloader_bar', '../assets/images/preloader_bar.png');
    
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

    // TODO: load here the assets for the game
    //this.game.load.image('prueba', '../assets/images/prueba.jpg');
    //images
    //this.game.load.image('menuPrincipal','../assets/images/menu.png');
    //music
    //this.game.load.audio('musicaFondo','../assets/sounds/Pentagram.mp3');
  },

  create: function () {
    //this.game.state.start('play');
    this.game.state.start('menu');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  //game.state.add('play', PlayScene);
  game.state.add('menu',MainMenu);

  game.state.start('boot');
};
