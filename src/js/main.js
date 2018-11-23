'use strict';

var Menu = require('./states/MainMenu.js');
var botonera = require('./objects/botonera.js');
var PlayScene = require('./states/play_scene.js');
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
    this.time.advancedTiming = true;

    // TODO: load here the assets for the game




    //images
    this.game.load.image('prueba', '../assets/images/prueba.jpg');
    this.game.load.image('menu', './assets/images/menu.png');
    this.game.load.image('submenu', '../assets/images/submenu.png');
    this.game.load.image('gameover', '../assets/images/gameover.png');
    this.game.load.image('bullet', 'assets/images/red_bullet.png');
    this.game.load.image('logo', 'assets/images/phaser.png');
    //botones
    this.game.load.image('playbutton', './assets/images/playbutton.png');
    this.game.load.image('classbutton', '../assets/images/classbutton.png');
    this.game.load.image('soldadobutton', '../assets/images/soldadobutton.png');
    this.game.load.image('medicobutton', '../assets/images/medicobutton.png');
    this.game.load.image('exitbutton', '../assets/images/exitbutton.png');
    this.game.load.image('berserkerbutton', '../assets/images/berserkerbutton.png');
    this.game.load.image('againbutton', '../assets/images/againbutton.png');
    //muñecos
    this.game.load.image('zombi', '../assets/images/zombi.png');
    this.game.load.image('zombiBoy', '../assets/images/zombiBoy.png');
    this.game.load.spritesheet('player', 'assets/images/6ZombieSpriteSheet.png', 40, 36);
    this.game.load.spritesheet('enemy', 'assets/images/2ZombieSpriteSheet.png', 40, 36);
    //music
    this.game.load.audio('musicaFondo', '../assets/sounds/Pentagram.mp3');
    this.game.load.audio('musicaAccion', '../assets/sounds/HeavyAction.mp3');
    this.game.load.audio('musicaMenu', '../assets/sounds/ZombieRock.mp3');
    this.game.load.audio('Zhola', '../assets/sounds/zombihola.wav');
    this.game.load.audio('Zdolor', '../assets/sounds/zombidolor.mp3');
    this.game.load.audio('shotgun1', '../assets/sounds/shotgun.wav');
    this.game.load.audio('shotgun2', '../assets/sounds/shotgun+Reload.wav');
    this.game.load.audio('Pdolor', '../assets/sounds/pain.wav');

  },

  create: function () {
    //this.game.state.start('play');
    this.game.state.start('botonera');
  }
};
/*var Menu = {
  preload: function(){
    this.game.load.image('menu','./assets/images/menu.png');
    this.game.load.audio('musicaFondo','../assets/sounds/ZombieRock.mp3');
    //this.game.load.image('playbutton','../assets/images/playbutton.png');
  },
  
  create: function() {
   var fondo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
   this.game.add.audio('musicaFondo').loopFull(1);
   //fondo.anchor.setTo(0.5, 0.5);
   //var playbutton = new Button(game, 400, 300,'playbutton', actionOnClick, this,0,0,0,0);
   game.add.button(400, 300, 'playbutton', actionOnClick, this, 2, 1, 0);
   
  },

};
function actionOnClick () {

    console.log('button clicked');
    game.state.start('play');
  };
*/
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  //game.state.add('menu', MenuScene);
  game.state.add('play', PlayScene);
  game.state.add('menu', Menu);
  game.state.add('botonera', botonera);

  game.state.start('boot');
};
