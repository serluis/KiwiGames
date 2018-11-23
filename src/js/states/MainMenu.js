'use strict'
//var PlayScene = require('./play_scene.js');

var Menu = {
  preload: function () {
    this.game.load.image('menu', './assets/images/menu.png');
    var ZombieRock = this.game.load.audio('musicaFondo', '../assets/sounds/ZombieRock.mp3');
    this.game.load.image('playbutton', '../assets/images/playbutton.png');
  },

  create: function () {
    var fondo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
    this.game.add.audio('musicaFondo'/*ZombieRock*/).loopFull(1);
    fondo.anchor.setTo(0.5, 0.5);
    //var playbutton = new Button(game, 400, 300,'playbutton', actionOnClick,/* this,0,0,0,0);

  },
  /*function actionOnClick () {

    console.log('button clicked');
    game.state.start('play');

}*/



};
module.exports = Menu;