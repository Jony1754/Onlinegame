const { Console } = require("console");
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
let io = SocketIO(server);
var players = {};
var rooms = new Array();
io.on("connection", (socket) => {
  console.log("Alguien se ha conectado", socket.id);
  players[socket.id] = {
    playerId: socket.id,
    score: 0,
  };

  console.log("ROOMS: ", rooms);
  console.log("Players length", Object.keys(players).length);

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

  //Se escucha el evento que posiblemente active uno de los jugadores
  socket.on("playerScored", function (score) {
    players[socket.id].score = score;

    // Se avisa al otro jugador QUIEN ha hecho la puntuacion
    // El objeto entre {} se lee dentro de la otra funcion como "data"
    socket.broadcast.emit("playerScore", {
      player: players[socket.id],
      otherPlayers: players,
    });
  });

  if (Object.keys(players).length == 2) {
    rooms.push(players);
    players = {};
  }
  // console.log("Players connected", players);
});
