var express = require("express");
var path = require("path");
var app = express();

//settings
app.set("port", process.env.PORT || 3000);

//static files: archivos que se envian una sola vez al navegador
console.log(path.join(__dirname, "src"));
app.use(express.static(path.join(__dirname, "src")));
//Iniciar el servidor
var server = app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

//Websockets

var SocketIO = require("socket.io");
var io = SocketIO(server);
var players = {};

io.on("connection", (socket) => {
  console.log("Alguien se ha conectado", socket.id);
  players[socket.id] = {
    playerId: socket.id,
    score: 0,
    color: "",
  };

  socket.emit("currentPlayers", players);
  // update all other players of the new player
  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("disconnect", function () {
    console.log("user disconnected");
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit("disconnect", socket.id);
  });
  socket.on("enemyScore", function (score) {
    players[socket.id].score = score;

    socket.broadcast.emit("playerScored", players[socket.id]);
  });
  console.log("Players connected", players);
});
