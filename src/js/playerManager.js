'use strict';

var config = require('./config.js');
const Soldier = require('./soldier.js');
const Berserker = require('./berserker.js');
const Medic = require('./medic.js');

function PlayerManager(game, x, y, imgName) {
    if (config.chosenClass === 1) {
        this.subClass = new Soldier(game, x, y, imgName);
    }
    else if (config.chosenClass === 2) {
        this.subClass = new Medic(game, x, y, imgName);
    }
    else if (config.chosenClass === 3) {
        this.subClass = new Berserker(game, x, y, imgName);
    }
}

module.exports = PlayerManager;
