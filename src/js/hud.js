'use strict';

const config = require('./config.js');

function HUD(game) {
    this.game = game;
    this.fade = game.add.tween();

    this.waveComp = game.add.sprite(config.roundMsgX, config.roundMsgY, 'wavecomp');
    this.waveComp.anchor.setTo(0.5, 0.5);
    this.waveComp.alpha = 0;
    this.waveComp.fixedToCamera = true;

    this.waveInc = game.add.sprite(config.roundMsgX, config.roundMsgY, 'waveinc');
    this.waveInc.anchor.setTo(0.5, 0.5);
    this.waveInc.alpha = 0;
    this.waveInc.fixedToCamera = true;

    this.wave = game.add.sprite(config.waveX, config.waveY, 'waveui');
    this.wave.anchor.setTo(0, 0.5);
    this.wave.scale.setTo(0.5, 0.5);
    this.wave.fixedToCamera = true;

    this.playerUI = game.add.sprite(config.waveX, config.playerY, 'playerui');
    this.playerUI.anchor.setTo(0, 1);
    this.playerUI.scale.setTo(0.5, 0.5);
    this.playerUI.fixedToCamera = true;

    this.enemyText = this.game.add.text(config.enemyTextX, config.enemyTextY, "",
        {
            font: "35px Arial",
            fill: "#ffffff",
            align: "center"
        });
    this.enemyText.anchor.setTo(0, 0.5);
    this.enemyText.fixedToCamera = true;

    this.waveText = this.game.add.text(config.waveTextX, config.waveTextY, "90/90",
        {
            font: "20px Arial",
            fill: "#ffffff",
            align: "center"
        });
    this.waveText.anchor.setTo(0, 0.5);
    this.waveText.fixedToCamera = true;

    this.healthText = this.game.add.text(config.playerTextX, config.healthTextY, "100",
        {
            font: "24px Arial",
            fill: "#ffffff",
            align: "center"
        });
    this.healthText.anchor.setTo(0, 0.5);
    this.healthText.fixedToCamera = true;

    this.shieldText = this.game.add.text(config.playerTextX, config.shieldTextY, "000",
        {
            font: "24px Arial",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldText.anchor.setTo(0, 0.5);
    this.shieldText.fixedToCamera = true;
}

HUD.constructor = HUD;

HUD.prototype.update = function () {
    this.game.world.bringToTop(this.waveComp);
    this.game.world.bringToTop(this.waveInc);
    this.game.world.bringToTop(this.wave);
    this.game.world.bringToTop(this.playerUI);

    this.game.world.bringToTop(this.waveText);
    this.game.world.bringToTop(this.enemyText);
    this.game.world.bringToTop(this.shieldText);
    this.game.world.bringToTop(this.healthText);
}

HUD.prototype.waveComplete = function () {
    fadeInOutCallback(this.waveComp, 1, 2000, this.game, fadeOut);
    //	cuando el tween acabe llama a la funcion
}

HUD.prototype.waveIncoming = function () {
    fadeInOutCallback(this.waveInc, 1, 2000, this.game, fadeOut);
}

function fadeInOutCallback(sprite, alpha, time, game, callback) {
    // crea un tween que hace fade in o fade out del sprite indicado
    // y al acabar ejecuta la funcion indicada
    game.add.tween(sprite).to({ alpha: alpha }, time,
        Phaser.Easing.Linear.None, true).onComplete.add(
            function () { game.time.events.add(1000, callback, this, sprite, game); }, this);
}

function fadeInOut(sprite, alpha, time, game) {
    // crea un tween que hace fade in o fade out del sprite indicado
    game.add.tween(sprite).to({ alpha: alpha }, time,
        Phaser.Easing.Linear.None, true);
}

function fadeOut(sprite, game) {
    fadeInOut(sprite, 0, 2000, game);
}

module.exports = HUD;