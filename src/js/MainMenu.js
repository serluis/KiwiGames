'use strict';
var Menu = {
	preload: function(){
    this.game.load.image('menu','./assets/images/menu.png');
    this.game.load.audio('musicaFondo','../assets/sounds/ZombieRock.mp3');
  },
  create: function () {
   var fondo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'menu');
   this.game.add.audio('musicaFondo').loopFull(1);
  fondo.anchor.setTo(0.5, 0.5);
   },


};
module.exports = Menu;