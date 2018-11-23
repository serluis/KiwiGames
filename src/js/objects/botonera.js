'use strict'

var botonera = {
    preload: function () {

    },

    create: function () {
        var playbutton;
        var classbutton;
        var background;
        this.game.stage.backgroundColor = '#182d3b';

        this.background = this.game.add.image(0, 0, 'menu');

        playbutton = this.game.add.button(318, 319, 'playbutton', this.actionOnClick, this/*, 2, 1, 0*/);
        classbutton = this.game.add.button(150, 375, 'classbutton', this.actionOnClick2, this);

        /*button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);*/

    },

    actionOnClick: function () {
        this.game.state.start('play');
    },

    actionOnClick2: function () {
        this.background.visible = !this.background.visible;
    },

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

module.exports = botonera;