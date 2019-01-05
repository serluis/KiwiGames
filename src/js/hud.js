'use strict';

const config = require('./config.js');

function HUD(game, music) {
    this.game = game;
    this.music = music;
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

    this.healUI = game.add.sprite(config.healX, config.healY, 'heal');
    this.healUI.anchor.setTo(0.5, 0.5);
    this.healUI.scale.setTo(0.5, 0.5);
    this.healUI.fixedToCamera = true;

    this.money = game.add.sprite(config.waveX, config.dollarY, 'dollar');
    this.money.anchor.setTo(0, 0.5);
    this.money.scale.setTo(0.10, 0.10);
    this.money.fixedToCamera = true;

    this.enemyText = this.game.add.text(config.enemyTextX, config.enemyTextY, "",
        {
            font: "14px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.enemyText.anchor.setTo(0, 0.5);
    this.enemyText.fixedToCamera = true;

    this.waveText = this.game.add.text(config.waveTextX, config.waveTextY, "",
        {
            font: "10px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.waveText.anchor.setTo(0, 0.5);
    this.waveText.fixedToCamera = true;

    this.moneyText = this.game.add.text(config.dollarTextX, config.dollarTextY, "90/90",
        {
            font: "18px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.moneyText.anchor.setTo(0, 0.5);
    this.moneyText.fixedToCamera = true;

    this.healthText = this.game.add.text(config.playerTextX, config.healthTextY, "100",
        {
            font: "14px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.healthText.anchor.setTo(0, 0.5);
    this.healthText.fixedToCamera = true;

    this.shieldText = this.game.add.text(config.playerTextX, config.shieldTextY, "000",
        {
            font: "14px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldText.anchor.setTo(0, 0.5);
    this.shieldText.fixedToCamera = true;

    // PAUSE MENU
    game.input.onDown.add(this.unpause, this);

    this.panel = this.game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'panel');
    this.resume = this.game.add.sprite(
        game.camera.width / 2, 90, 'resumebutton');
    this.restart = this.game.add.sprite(
        game.camera.width / 2, 290, 'restartbutton');
    this.exit = this.game.add.sprite(
        game.camera.width / 2, 490, 'exitpause');

    this.panel.anchor.setTo(0.5, 0.5);
    this.panel.fixedToCamera = true;

    this.resume.anchor.setTo(0.5, 0.5);
    this.resume.scale.setTo(0.75, 0.75);
    this.resume.fixedToCamera = true;

    this.restart.anchor.setTo(0.5, 0.5);
    this.restart.scale.setTo(0.75, 0.75);
    this.restart.fixedToCamera = true;

    this.exit.anchor.setTo(0.5, 0.5);
    this.exit.scale.setTo(0.75, 0.75);
    this.exit.fixedToCamera = true;

    // we initialize de pausemenu deactivated
    this.panel.kill();
    this.resume.kill();
    this.restart.kill();
    this.exit.kill();

}

HUD.prototype.pause = function () {
    this.game.paused = !this.game.paused;
    this.panel.exists = this.resume.exists = this.restart.exists = this.exit.exists = this.game.paused;
}

HUD.prototype.unpause = function () {
    if (this.game.paused) {
        if (this.resume.getBounds().contains(this.game.input.x, this.game.input.y)) {
            this.game.paused = false;
            this.panel.exists = this.resume.exists = this.restart.exists = this.exit.exists = this.game.paused;
        }
        else if (this.restart.getBounds().contains(this.game.input.x, this.game.input.y)) {
            this.game.paused = false;
            this.music.stop();
            this.panel.exists = this.resume.exists = this.restart.exists = this.exit.exists = this.game.paused;
            this.game.state.restart();
        }
        else if (this.exit.getBounds().contains(this.game.input.x, this.game.input.y)) {
            this.game.paused = false;
            this.music.stop();
            this.panel.exists = this.resume.exists = this.restart.exists = this.exit.exists = this.game.paused;
            this.game.state.start('MainMenu');
        }
    }
}

HUD.constructor = HUD;

HUD.prototype.update = function () {
    this.healUI.exists = config.healOnCD;

    this.game.world.bringToTop(this.waveComp);
    this.game.world.bringToTop(this.waveInc);
    this.game.world.bringToTop(this.wave);
    this.game.world.bringToTop(this.playerUI);
    this.game.world.bringToTop(this.healUI);
    this.game.world.bringToTop(this.money);

    this.game.world.bringToTop(this.waveText);
    this.game.world.bringToTop(this.enemyText);
    this.game.world.bringToTop(this.shieldText);
    this.game.world.bringToTop(this.healthText);
    this.game.world.bringToTop(this.moneyText);

}

HUD.prototype.pauseUpdate = function () {
    this.game.world.bringToTop(this.panel);
    this.game.world.bringToTop(this.resume);
    this.game.world.bringToTop(this.restart);
    this.game.world.bringToTop(this.exit);
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