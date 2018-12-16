'use strict';

//Creates all the games's group
function Groups(game) {
    this.game = game;
    this.enemies = game.add.group();
}

Groups.prototype.createEnemies = function (entities, player) {
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemies.addMultiple(entities);
    this.enemies.callAll('kill');
    this.enemies.setAll('checkWorldBounds', true);
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    this.player = player;
}

Groups.prototype.updateGroups = function (player) {
    this.enemies.forEach(this.game.physics.arcade.moveToObject,
        this.game.physics.arcade, false, this.player, this.enemies.speed);
    //this.enemies.forEach(this.game.physics.arcade.rotation = this.game.physics.arcade.angleToPointer(player);
}

module.exports = Groups;