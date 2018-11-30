'use strict'

var SubMenu = {
	preload: function () {

	},
	create: function () {
		var soldadobutton;
		var medicobutton;
		var background;
		var berserkerbutton;
		this.game.stage.backgroundColor = '#ffffff';

		this.background = this.game.add.image(0, 0, 'submenu');

		soldadobutton = this.game.add.button(290, 190, 'soldadobutton', this.actionOnClick, this/*, 2, 1, 0*/);
		medicobutton = this.game.add.button(315, 275, 'medicobutton', this.actionOnClick2, this);
		berserkerbutton = this.game.add.button(270, 380, 'berserkerbutton', this.actionOnClick3, this);
		/*button.onInputOver.add(over, this);
		button.onInputOut.add(out, this);
		button.onInputUp.add(up, this);*/

	},
	actionOnClick: function () {
		this.game.clase = 1;
		this.game.state.start('MainMenu');
	},
	actionOnClick2: function () {
		this.game.clase = 2;
		this.game.state.start('MainMenu');
	},
	actionOnClick3: function () {
		this.game.clase = 3;
		this.game.state.start('MainMenu');
	},

};


module.exports = SubMenu;

