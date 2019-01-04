'use strict'
var config = require('./config.js');

var SubMenu = {
	preload: function () {

	},
	create: function () {
		this.game.stage.backgroundColor = '#ffffff';

		this.background = this.game.add.image(0, 0, 'submenu');

		this.soldierButton = this.game.add.button(290, 190, 'soldierbutton', this.soldierSelection, this, 1, 0, 1);
		this.medicButton = this.game.add.button(315, 275, 'medicbutton', this.medicSelection, this, 1, 0, 1);
		this.berserkerButton = this.game.add.button(270, 380, 'berserkerbutton', this.berserkerSelection, this, 1, 0, 1);
		this.backButton = this.game.add.button(590, 530, 'backbutton', this.backSelection, this, 1, 0, 1);

		this.game.camera.flash(0xff0000, 1000);
	},
	soldierSelection: function () {
		config.menuMusic.stop();
		config.chosenClass = 1;
		this.game.state.start('play');
	},
	medicSelection: function () {
		config.menuMusic.stop();
		config.chosenClass = 2;
		this.game.state.start('play');
	},
	berserkerSelection: function () {
		config.menuMusic.stop();
		config.chosenClass = 3;
		this.game.state.start('play');
	},
	backSelection: function () {
		config.menuMusic.stop();
		this.game.state.start('MainMenu');
	},

};


module.exports = SubMenu;

