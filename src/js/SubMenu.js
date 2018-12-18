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
		/*button.onInputOver.add(over, this);
		button.onInputOut.add(out, this);
		button.onInputUp.add(up, this);*/

	},
	soldierSelection: function () {
		//this.game.clase = 1;
		config.chosenClass = 1;
		this.game.state.start('MainMenu');
	},
	medicSelection: function () {
		//this.game.clase = 2;
		config.chosenClass = 2;
		this.game.state.start('MainMenu');
	},
	berserkerSelection: function () {
		//this.game.clase = 3;
		config.chosenClass = 3;
		this.game.state.start('MainMenu');
	},

};


module.exports = SubMenu;

