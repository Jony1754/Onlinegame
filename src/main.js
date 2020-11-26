let texto;
let readyPlayer2;
let letsPlay = false;
var player2 = {};
var player1;
var inicio = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "inicio" });
  },
  init: function () {},
  preload: function () {
    texto = this.add.text(16, 16, "Inicio", {
      font: "48px Consolas",
      fill: "#FFF",
    });

    readyPlayer2 = this.add.text(16, 64, "Waiting...", {
      font: "48px Consolas",
      fill: "#FFF",
    });
  },
  create: function () {
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
  update: function () {
    texto.setText("Esperando jugador...");
    if (letsPlay) {
      readyPlayer2.setText("Player2 READY, game is loading...");
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

function addPlayer(self, playerInfo) {
  self.playerId = playerInfo.playerId;
  self.score = playerInfo.score;
  player1 = self;
  console.log("ADD PLAYER CALLED: ", player1.playerId);
}

function addOtherPlayers(self, playerInfo) {
  this.player2.playerId = playerInfo.playerId;
  this.player2.score = playerInfo.score;
  console.log("ADD OTHER PLAYERS CALLED: ", player2.playerId);
  letsPlay = true;
}
