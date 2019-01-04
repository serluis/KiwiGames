'use strict';

const config = require('./config.js');


function Shop(game, player, playscene) {
    this.game = game;
    this.player = player;
    this.scene = playscene;

    this.dmgUpSelec = 1; // number of times we selected the dmg up option    
    this.dmgUpProg = 4; // the scale factor of the price
    this.dmgUpCost = 100; // initial cost
    this.shieldSelec = 1;
    this.shieldUpCost = 150;

    this.panel = this.game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'panel');
    this.panel.anchor.setTo(0.5, 0.5);
    this.panel.fixedToCamera = true;
    this.dmgButton = this.game.add.button(config.shopButtonX, config.dmgButtonY, 'dmgup', this.dmgUpClick, this);
    this.dmgButton.scale.setTo(0.1, 0.1);
    this.dmgButton.anchor.setTo(0, 0.5);
    this.dmgButton.fixedToCamera = true;
    this.shieldButton = this.game.add.button(config.shopButtonX, config.shieldButtonY, 'shieldup', this.shieldUpClick, this);
    this.shieldButton.scale.setTo(0.12, 0.12);
    this.shieldButton.anchor.setTo(0, 0.5);
    this.shieldButton.fixedToCamera = true;

    this.dmgText = this.game.add.text(config.shopTextX, config.dmgShopY, "",
        {
            font: "30px Arial",
            fill: "#ffffff",
            align: "center"
        });
    this.dmgText.anchor.setTo(0, 0.5);
    this.dmgText.fixedToCamera = true;

    this.shieldText = this.game.add.text(config.shopTextX, config.shieldShopY, "",
        {
            font: "30px Arial",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldText.anchor.setTo(0, 0.5);
    this.shieldText.fixedToCamera = true;

    this.dmgCostText = this.game.add.text(config.costTextX, config.dmgCostY, "",
        {
            font: "30px Arial",
            fill: "#ffffff",
            align: "center"
        });
    this.dmgCostText.anchor.setTo(0, 0.5);
    this.dmgCostText.fixedToCamera = true;

    this.shieldCostText = this.game.add.text(config.costTextX, config.shieldCostY, "",
        {
            font: "30px Arial",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldCostText.anchor.setTo(0, 0.5);
    this.shieldCostText.fixedToCamera = true;
}

Shop.prototype.update = function () {

    this.dmgText.setText("Current damage: " + this.player.damage);
    this.shieldText.setText("Current shield: " + this.player.shield);
    this.dmgCostText.setText(this.dmgUpCost);
    this.shieldCostText.setText(this.shieldUpCost);

    this.game.world.bringToTop(this.panel);
    this.game.world.bringToTop(this.dmgButton);
    this.game.world.bringToTop(this.shieldButton);
    this.game.world.bringToTop(this.dmgCostText);
    this.game.world.bringToTop(this.shieldCostText);
    this.game.world.bringToTop(this.shieldText);
    this.game.world.bringToTop(this.dmgText);

}

Shop.prototype.dmgUpClick = function () {
    if (this.scene.money >= this.dmgUpCost) {
        this.scene.money -= this.dmgUpCost;

        var log = Math.log(this.dmgUpSelec) / Math.log(this.dmgUpProg);
        this.dmgUpCost += Math.floor(this.dmgUpCost * log);
        this.player.damage += Math.floor(this.player.damage * log / 2);
        this.dmgUpSelec++;
    }
}

Shop.prototype.shieldUpClick = function () {
    if (this.scene.money >= this.shieldUpCost) {
        this.scene.money -= this.shieldUpCost;

        var log = Math.log(this.shieldSelec) / Math.log(this.dmgUpProg);
        this.shieldUpCost += Math.floor(this.shieldUpCost * log);
        this.player.shield = Math.floor(80 * log / 2);
        this.shieldSelec++;
    }
}

Shop.constructor = Shop;
module.exports = Shop;
