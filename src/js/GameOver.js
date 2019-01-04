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