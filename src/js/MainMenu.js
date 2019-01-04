'use strict'
var config = require('./config.js');

var MainMenu = {

    preload: function () {
        this.ZombieRock = this.game.add.audio('musicaMenu');
        config.menuMusic = this.ZombieRock;
    },

    create: function () {
        this.game.stage.backgroundColor = '#182d3b';
        this.game.camera.flash(0xff0000, 300);

        if (!config.menuMusic.isPlaying) {
            this.ZombieRock.volume = config.musicVolume;
            this.ZombieRock.play();
            this.ZombieRock.loopFull();
            config.menuMusic = this.ZombieRock;
        }

        this.background = this.game.add.image(0, 0, 'menu');

        this.playButton = this.game.add.button(318, 315, 'playbutton', this.playSelection, this, 1, 0, 1);
        this.optionButton = this.game.add.button(260, 375, 'optionbutton', this.optionSelection, this, 1, 0, 1);
        this.controlButton = this.game.add.button(260, 440, 'controlbutton', this.controlSelection, this, 1, 0, 1);
        config.menuMusic = this.ZombieRock;

    },
    playSelection: function () {
        this.game.state.start('SubMenu');
    },
    optionSelection: function () {
        this.game.state.start('options');
    },
    controlSelection: function () {
        this.game.state.start('controls');

    },

};

module.exports = MainMenu;