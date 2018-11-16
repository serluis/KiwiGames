var Entity = require('./entity');
var Enemy = function (game,x,y, key){
  Entity.call(this,game,x,y, key);
  this._cabreo = 0;
}
Enemy.prototype= Object.create(Entity.prototype);
Enemy.prototype.constructor=Enemy;

Enemy.prototype.update = function() {
  Entity.prototype.update.apply(this);
  this.y++;
}

Object.defineProperty(Enemy.prototype,'cabreo',{
	get: function() {
		return this._cabreo/100;
	},
	set: function(value) {
		this._cabreo = value*100;
	}
})

module.exports = Enemy;