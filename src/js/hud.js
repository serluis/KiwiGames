'use strict';

function HUD(game) {
    this.game = game;
    this.waveComp = game.add.sprite(400, 340, 'wavecomp');
    this.waveComp.anchor.setTo(0.5, 0.5);
    this.waveComp.alpha = 0;

}

HUD.prototype.update = function () {
    this.game.world.bringToTop(this.waveComp);

}

function fadeInOut(sprite, alpha,time) {
    HUD.fadeIn = HUD.game.add.tween(sprite).to({ alpha: alpha }, time,
        Phaser.Easing.Linear.None, true);
}

module.exports = HUD;