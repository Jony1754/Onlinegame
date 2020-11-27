let texto;
let readyPlayer2;
let letsPlay = false;
var player2 = {};
var player1;
/**
 * Clase main que hereda de Phaser Scene, para poder manejar los eventos como una escena de Phaser. Se le asigna 
 * como llave el nombre inicio.
 */
var inicio = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "inicio" });
  },
  init: function () {},
  /**
   * Se colocan textos en la pantalla.
   */
  preload: function () {
    texto = this.add.text(180, 280, "Inicio", {
      font: "48px Consolas",
      fill: "#FFF",
    });

  
  },
  /**
   * Se revisan que eventos está recibiendo el socket.
   */
  create: function () {

    this.tweens.add({
      targets     : texto,
      ease        : 'Power4',
      alpha       : {
          getStart: () => 0.8,
          getEnd: () => 1
      },
      y           :{
        getStart: () => 285,
        getEnd: () => 255
      },
      loop: -1,
      yoyo: -1,
      duration    : 1000,
    });



    var self = this;
    this.socket = io();
    console.log(" AAAAAAAI AM THIS SOCKET: ", this.socket);
    this.socket.on("currentPlayers", function (players) {
      console.log("CURRENT PLAYERS EVENT: ", players);

      Object.keys(players).forEach(function (id) {
        console.log("Player id: ", players[id].playerId);

        if (players[id].playerId == self.socket.id) {
          addPlayer(self, players[id]);
        } else {
          addOtherPlayers(self, players[id]);
        }
      });
    });
    this.socket.on("newPlayer", function (playerInfo) {
      console.log("newPlayer event listened on client side");
      addOtherPlayers(self, playerInfo);
    });
    this.socket.on("disconnected", function (playerId) {
      if (player1.playerId == playerId) {
        console.log("player1 disconnected");
      } else {
        console.log("player2 disconnected");
      }
    });
  },
  /**
   * Espera hasta que exista un segundo jugador, para así iniciar el juego y llevarlo a la siguiente escena.
   */
  update: function () {
    texto.setText("Esperando jugador...");
    if (letsPlay) {
      texto.setText("¡Listo! Cargando...");
      this.time.addEvent({
        delay: 3000,
        loop: false,
        callback: () => {
          // Cuando se llama a la otra escena, se le pasa una referencia del socket a ESTA instancia del juego
          this.scene.start("juego", { socket: this.socket, enemy: player2 });
        },
      });
      // this.scene.start("juego");
    }
  },
});
/**
 * Configura al jugador 1.
 * @param {Object} self 
 * @param {string} playerInfo 
 */
function addPlayer(self, playerInfo) {
  self.playerId = playerInfo.playerId;
  self.score = playerInfo.score;
  player1 = self;
  console.log("ADD PLAYER CALLED: ", player1.playerId);
}
/**
 * Configura al jugador 2.
 * @param {Object} self 
 * @param {string} playerInfo 
 */
function addOtherPlayers(self, playerInfo) {
  this.player2.playerId = playerInfo.playerId;
  this.player2.score = playerInfo.score;
  console.log("ADD OTHER PLAYERS CALLED: ", player2.playerId);
  letsPlay = true;
}
