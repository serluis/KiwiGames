'use strict'
var config = require('./config.js');

var Controls = {
    preload: function () {

    },
    create: function () {
        this.game.stage.backgroundColor = '#ffffff';

        this.background = this.game.add.image(0, 0, 'controls');

        this.backButton = this.game.add.button(590, 530, 'backbutton', this.backSelection, this, 1, 0, 1);

        this.game.camera.flash(0xff0000, 1000);
    },
    backSelection: function () {
        config.menuMusic.stop();
        this.game.state.start('MainMenu');
    },

};

module.exports = Controls;