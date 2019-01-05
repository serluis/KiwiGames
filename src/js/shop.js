'use strict';

const config = require('./config.js');


function Shop(game, player, playscene) {
    this.game = game;
    this.player = player;
    this.scene = playscene;
    if (config.chosenClass != 3)
        this.fireRate = player.weapon.fireRate;
    else
        this.fireRate = player.timePerShoot;
    this.initFireRate = this.fireRate;
    this.dmgUpSelec = 1; // number of times we selected the dmg up option    
    this.costProg = 4; // the scale factor of the price
    this.dmgUpCost = 100; // initial cost
    this.shieldSelec = 1;
    this.shieldUpCost = 150;
    this.rateSelec = 1;
    this.rateUpCost = 80;

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
    this.rateButton = this.game.add.button(config.shopButtonX, config.rateButtonY, 'rateup', this.rateUpClick, this);
    this.rateButton.scale.setTo(0.12, 0.12);
    this.rateButton.anchor.setTo(0, 0.5);
    this.rateButton.fixedToCamera = true;

    this.dmgText = this.game.add.text(config.shopTextX, config.dmgShopY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.dmgText.anchor.setTo(0, 0.5);
    this.dmgText.fixedToCamera = true;

    this.shieldText = this.game.add.text(config.shopTextX, config.shieldShopY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldText.anchor.setTo(0, 0.5);
    this.shieldText.fixedToCamera = true;

    this.rateText = this.game.add.text(config.shopTextX, config.rateShopY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.rateText.anchor.setTo(0, 0.5);
    this.rateText.fixedToCamera = true;

    this.dmgCostText = this.game.add.text(config.costTextX, config.dmgCostY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.dmgCostText.anchor.setTo(0, 0.5);
    this.dmgCostText.fixedToCamera = true;

    this.shieldCostText = this.game.add.text(config.costTextX, config.shieldCostY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.shieldCostText.anchor.setTo(0, 0.5);
    this.shieldCostText.fixedToCamera = true;

    this.rateCostText = this.game.add.text(config.costTextX, config.rateCostY, "",
        {
            font: "30px 8-bit",
            fill: "#ffffff",
            align: "center"
        });
    this.rateCostText.anchor.setTo(0, 0.5);
    this.rateCostText.fixedToCamera = true;
    this.kill();
}

Shop.prototype.kill = function () {
    this.panel.kill();
    this.dmgButton.kill();
    this.shieldButton.kill();
    this.rateButton.kill();
    this.dmgCostText.kill();
    this.shieldCostText.kill();
    this.shieldText.kill();
    this.dmgText.kill();
    this.rateText.kill();
    this.rateCostText.kill();
}

Shop.prototype.revive = function () {
    this.panel.exists =
        this.dmgButton.exists =
        this.shieldButton.exists =
        this.rateButton.exists =
        this.dmgCostText.exists =
        this.shieldCostText.exists =
        this.shieldText.exists =
        this.dmgText.exists =
        this.rateText.exists =
        this.rateCostText.exists = true;
}

Shop.prototype.update = function () {

    this.dmgText.setText("Current damage: " + this.player.damage);
    this.shieldText.setText("Current shield: " + this.player.shield);
    this.rateText.setText("Current fire rate: " + (this.fireRate));
    this.dmgCostText.setText(this.dmgUpCost);
    this.shieldCostText.setText(this.shieldUpCost);
    this.rateCostText.setText(this.rateUpCost);

    this.game.world.bringToTop(this.panel);
    this.game.world.bringToTop(this.dmgButton);
    this.game.world.bringToTop(this.shieldButton);
    this.game.world.bringToTop(this.rateButton);
    this.game.world.bringToTop(this.dmgCostText);
    this.game.world.bringToTop(this.shieldCostText);
    this.game.world.bringToTop(this.shieldText);
    this.game.world.bringToTop(this.dmgText);
    this.game.world.bringToTop(this.rateText);
    this.game.world.bringToTop(this.rateCostText);

    if (this.panel.exists)
        this.player.controls.shoot.active = false;
    else
        this.player.controls.shoot.active = true;

}

Shop.prototype.dmgUpClick = function () {
    if (this.scene.money >= this.dmgUpCost) {
        this.scene.money -= this.dmgUpCost;

        var log = Math.log(this.dmgUpSelec) / Math.log(this.costProg);
        this.dmgUpCost += Math.floor(this.dmgUpCost * log);
        this.player.damage += Math.floor(this.player.damage * log / 3);
        this.dmgUpSelec++;
    }
}

Shop.prototype.shieldUpClick = function () {
    if (this.scene.money >= this.shieldUpCost) {
        this.scene.money -= this.shieldUpCost;

        var log = Math.log(this.shieldSelec) / Math.log(this.costProg);
        this.shieldUpCost += Math.floor(this.shieldUpCost * log);
        this.player.shield = Math.floor(80 * log / 2);
        this.shieldSelec++;
    }
}

Shop.prototype.rateUpClick = function () {
    if (this.scene.money >= this.rateUpCost) {
        this.scene.money -= this.rateUpCost;

        var log = Math.log(this.rateSelec) / Math.log(this.costProg);
        this.rateUpCost += Math.floor(this.rateUpCost * log);
        if (config.chosenClass != 3) {
            this.player.weapon.fireRate -= config.fireRateScaling;
            this.fireRate -= config.fireRateScaling; // para el ui update
        }
        else {
            this.player.timePerShoot -= config.shotGunScaling;
            this.fireRate -= config.shotGunScaling; // para el ui update

        }
        this.rateSelec++;
        if (this.fireRate <= 0)
            this.fireRate = 0
    }
}

Shop.constructor = Shop;
module.exports = Shop;
