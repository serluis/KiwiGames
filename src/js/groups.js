'use strict';

//Creates all the games's group
function Groups(game) {
    this.game = game;
    this.enemies = game.add.group();
    this.bosses = game.add.group();
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

Groups.prototype.createBosses = function (entities) {
    this.bosses.enableBody = true;
    this.bosses.physicsBodyType = Phaser.Physics.ARCADE;
    this.bosses.addMultiple(entities);
    this.bosses.callAll('kill');
    this.bosses.setAll('checkWorldBounds', true);
    this.bosses.setAll('anchor.x', 0.5);
    this.bosses.setAll('anchor.y', 0.5);
}

Groups.prototype.updateGroups = function () {
    this.enemies.forEach(this.game.physics.arcade.moveToObject,
        this.game.physics.arcade, false, this.player, 75);
    this.bosses.forEach(this.game.physics.arcade.moveToObject,
        this.game.physics.arcade, false, this.player, this.bosses.speed);
}

Groups.prototype.render=function(){
    this.enemies.forEach(this.game.debug.body, this.game.debug);
    this.bosses.forEach(this.game.debug.body, this.game.debug);

}

module.exports = Groups;