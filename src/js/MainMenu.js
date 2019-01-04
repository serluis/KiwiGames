'use strict'
//var sound = require('./sound.js');
var config = require('./config.js');

var MainMenu = {

    preload: function () {
        //this.game.add.audio('musicaFondo').loopFull(1);
        this.ZombieRock = this.game.add.audio('musicaMenu');

    },

    create: function () {
        this.game.stage.backgroundColor = '#182d3b';

        if (!this.ZombieRock.isPlaying) {
            this.ZombieRock.play();
        }

        this.background = this.game.add.image(0, 0, 'menu');

        this.playButton = this.game.add.button(318, 315, 'playbutton', this.playSelection, this/*, 2, 1, 0*/);
        this.classButton = this.game.add.button(150, 375, 'classbutton', this.classSelection, this);
        this.exitButton = this.game.add.button(325, 440, 'exitbutton', this.exitSelection, this);

        /*button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);*/

    },
    playSelection: function () {
        this.ZombieRock.stop();
        this.game.state.start('SubMenu');            
       /* if (config.chosenClass != 0)
            this.game.state.start('play');
        else {
            this.game.state.start('SubMenu');            
        }*/
    },
    classSelection: function () {
        //this.background.visible =! this.background.visible;
        this.ZombieRock.stop();
        this.game.state.start('SubMenu');
    },
    exitSelection: function () {
        this.ZombieRock.stop();
        this.game.state.start('GameOver');

    },
    /*stoped: function() {
        ZombieRock.onStop.add('soundStopped', this);
    },
    soundStopped: function() {
        ZombieRock.play();
    },*/

};
/*function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}*/

module.exports = MainMenu;