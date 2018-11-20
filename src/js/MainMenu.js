'use strict'
var MainMenu = {
//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
preload: function() {

    this.game.add.audio('musicaFondo').loopFull(1);
    
},



create: function() {
    var playbutton;
    var classbutton;
    var background;
    var exitbutton;
    this.game.stage.backgroundColor = '#182d3b';

    this.background = this.game.add.image(0, 0, 'menu');

    playbutton = this.game.add.button(318, 315, 'playbutton', this.actionOnClick, this/*, 2, 1, 0*/);
    classbutton = this.game.add.button(150,375,'classbutton',this.actionOnClick2,this);
    exitbutton=  this.game.add.button(325,440,'exitbutton',this.actionOnClick3,this);
    /*button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);*/

},
actionOnClick: function() {
    this.background.visible =! this.background.visible;
},
actionOnClick2: function(){
    this.background.visible =! this.background.visible;
},
actionOnClick3: function(){
    this.background.visible =! this.background.visible;
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

module.exports = MainMenu;