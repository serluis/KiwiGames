'use strict'
//var sound = require('./sound.js');

var GameOver = {
	preload: function(){

  	},
  	create: function() {

    var againbutton;
    
    this.game.stage.backgroundColor = '#000000';
    this.background = this.game.add.image(0, 0, 'gameover');
    againbutton = this.game.add.button(325, 450, 'againbutton', this.actionOnClick, this/*, 2, 1, 0*/);
    
    /*button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);*/

	},
	actionOnClick: function() {
		
		this.game.state.start('MainMenu');
	},
};


module.exports = GameOver;