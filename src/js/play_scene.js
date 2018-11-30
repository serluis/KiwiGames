'use strict';
//var sound = require('./sound.js');
const Entity = require('./entity');
const Enemy = require ('./enemy');
const Player = require('./player.js');

/* THIS SHOULD GO IN OTHER FILES*/
const enemySpeed = 75;

/*------------------------------*/


var PlayScene = {
  preload: function () {
  },
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.game.stage.backgroundColor = '#313131';

    this.player = new Player(this.game, 300, 300, 'player',this.game.clase); // we create our player
    this.game.camera.follow(this.player); // camera attached to player

    /*ENEMIES STUFF: Para un futuro crear un file con todos los game groups*/
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 4; i++) {
      this.enemies.add(new Enemy(this.game, this.game.world.randomX, this.game.world.randomY, 'zombi'));
      //enemy.name = 'enem' + i;
      this.enemies.children[i].name = 'enem' + i;
      console.log("An enemy created at POS: " + this.enemies.children[i].x + "," + this.enemies.children[i].y);
    }
    this.enemies.setAll('checkWorldBounds', true);
    this.enemies.setAll('anchor.x', 0.5);
    this.enemies.setAll('anchor.y', 0.5);
    /*-------Se acaban las cosas de enemies--------*/

    this.game.add.audio('musicaFondo').loopFull(1);
  },

  update: function () {
    //this.game.physics.arcade.overlap(this.player, bullets.children, this.collisionHandler, null, this);
    this.game.physics.arcade.overlap(this.player.weapon.bullets.children, 
      this.enemies.children, this.bulletCollisionHandler, null, this); // miramos los hijos de cada grupo porque si no caca
    
    this.game.physics.arcade.overlap(this.player, this.enemies.children, 
      this.playerCollisionHandler, null, this);


    this.enemies.forEach(this.game.physics.arcade.moveToObject,
      this.game.physics.arcade, false, this.player, enemySpeed);

  },

  bulletCollisionHandler: function (bullet, enemy) {
    bullet.kill();
    enemy.kill();
    //bajar vida del malote
    //console.log("Collision?");
    //console.log("Bullet:" + bullet.x + "," + bullet.y)
  },

  playerCollisionHandler: function(player, enemy){
    console.log("Collision?");
  },

  render: function () {
    this.game.debug.cameraInfo(this.game.camera, 32, 100);
    this.game.debug.spriteInfo(this.player, 32, 400);
    this.game.debug.body(this.player);
    this.game.debug.body(this.enemies);
    this.enemies.forEach(this.game.debug.body, this.game.debug);
    this.player.render();
  },

  backToMenu: function () {
    this.game.state.start('MainMenu');
  },

};

module.exports = PlayScene;
