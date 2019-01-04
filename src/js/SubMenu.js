'use strict'
var config = require('./config.js');

var SubMenu = {
	preload: function () {

	},
	create: function () {
		this.game.stage.backgroundColor = '#ffffff';

		this.background = this.game.add.image(0, 0, 'submenu');

		this.soldierButton = this.game.add.button(290, 190, 'soldadobutton', this.soldierSelection, this);
		this.medicButton = this.game.add.button(315, 275, 'medicobutton', this.medicSelection, this);
		this.berserkerButton = this.game.add.button(270, 380, 'berserkerbutton', this.berserkerSelection, this);
		
		this.game.camera.flash(0xff0000, 1000);
	},
	soldierSelection: function () {
		config.chosenClass = 1;
		this.game.state.start('play');
	},
	medicSelection: function () {
		config.chosenClass = 2;
		this.game.state.start('play');
	},
	berserkerSelection: function () {
		config.chosenClass = 3;
		this.game.state.start('play');
	},

};


module.exports = SubMenu;

