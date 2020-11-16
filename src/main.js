let texto;
let readyPlayer2;
var player2;
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
    this.socket.on("currentPlayers", function (players) {
      console.log("CURRENT PLAYERS EVENT: ", players);

      Object.keys(players).forEach(function (id) {
        console.log("Player id: ", players[id].playerId);
        console.log("Self.socket.id", self.socket.id);

        if (players[id].playerId == self.socket.id) {
          addPlayer(self, players[id]);
        } else {
          addOtherPlayers(self, players[id]);
        }
      });
    });
    this.socket.on("newPlayer", function (playerInfo) {
      addOtherPlayers(self, playerInfo);
    });
    this.socket.on("disconnect", function (playerId) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId == otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });
  },
  update: function () {
    texto.setText("Esperando jugador...");
    if (player2) {
      // console.log(player2);

      readyPlayer2.setText("Player2 READY, game is loading...");
      this.time.addEvent({
        delay: 3000,
        loop: false,
        callback: () => {
          // Cuando se llama a la otra escena, se le pasa una referencia del socket a ESTA instancia del juego
          this.scene.start("juego", { socket: this.socket });
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
}

function addOtherPlayers(self, playerInfo) {
  self.playerId = playerInfo.playerId;
  self.score = playerInfo.score;
  player2 = self;
}
