'use strict';


var mapa = {
  
  preload: function () {

  },
  create: function () {
    
    this.mapa = this.game.add.tilemap('Mapa');
    this.mapa.addTilesetImage('tilesetsangriento', 'tiledSangre');
    this.mapa.addTilesetImage('stone_house_interior', 'tiledStoneInterior');
    //create layer
    this.suelo = this.mapa.createLayer('suelo');
    this.colisiones = this.mapa.createLayer('colisiones');
    this.puerta1 = this.mapa.createLayer('puerta1');
    this.puerta2 = this.mapa.createLayer('puerta2');
    this.puerta3 = this.mapa.createLayer('puerta3');
    this.decoracion = this.mapa.createLayer('decoracion');
    //escalado
    this.suelo.resizeWorld();
    this.colisiones.resizeWorld();
    this.puerta1.resizeWorld();
    this.puerta2.resizeWorld();
    this.puerta3.resizeWorld();
    this.decoracion.resizeWorld();
    
    //collision con paredes layer
    this.mapa.setCollisionBetween(1, 100000, true, 'colisiones'); 
    this.mapa.setCollisionBetween(1, 100000, true, 'puerta1');
    this.mapa.setCollisionBetween(1, 100000, true, 'puerta2');
    this.mapa.setCollisionBetween(1, 100000, true, 'puerta3');
    
  },

  update: function () {
     //mapa
     this.game.physics.arcade.enable(player);//da fisicas al jugador para que choque
     this.game.physics.arcade.collide(this.colisiones,player);//habilita las colisiones entre paredes y player
     this.game.physics.arcade.collide(this.puerta1,player);
     this.game.physics.arcade.collide(this.puerta2,player);
     this.game.physics.arcade.collide(this.puerta3,player);
    
     this.game.physics.arcade.collide(this.colisiones,enemies);//habilita las colisiones entre paredes y enemigos
     this.game.physics.arcade.collide(this.puerta1,enemies);
     this.game.physics.arcade.collide(this.puerta2,enemies);
     this.game.physics.arcade.collide(this.puerta3,enemies);
  },

};

module.exports = mapa;

