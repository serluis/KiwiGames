'use strict'


var youwin = {
    
    preload: function () {
        this.winsound = this.game.add.audio('winsound');
      
    },
    
    create: function () {
        
        var againbutton;
       
        var background;
      
        this.game.stage.backgroundColor = '#182d3b';

        this.background = this.game.add.image(0, 0, 'youwin');

       
        againbutton = this.game.add.button(325, 440, 'exitbutton', this.actionOnClick, this, 1, 0, 1);
        this.winsound.play();
    },
    
    actionOnClick: function () {
        this.winsound.stop();
        this.game.state.start('MainMenu');
    },    

};


module.exports = youwin;