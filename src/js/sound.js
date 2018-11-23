'use strict'

var sound = {

preload: function() {

    //this.game.add.audio('musicaFondo').loopFull(1);
    var musicaMenu = this.game.add.audio('musicaMenu');
    var musicaAccion = this.game.add.audio('HeavyAction');
    var musicaFondo = this.game.add.audio('Pentagram');
    return musicaMenu,musicaFondo,musicaAccion;
},

create: function() {
    

},

    
};
module.exports = sound;