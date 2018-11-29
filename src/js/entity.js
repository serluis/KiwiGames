var Entity = function (game,x,y, key){
  Phaser.Sprite.call(this,game,x,y,key);
}

Entity.prototype= Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor=Entity;

Entity.prototype.update = function() {
  this.x++;
}

module.exports = Entity;