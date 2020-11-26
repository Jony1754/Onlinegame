var express = require("express");
var path = require("path");
var app = express();

/**
 * Se crea una instancia de express y se la asignamos a la variable app. En app recibimos el puerto en donde se ubicará
 * el servidor, ya sea el puerto 3000 o el que reciba de Herokuapp.
 */
app.set("port", process.env.PORT || 3000);

//static files: archivos que se envian una sola vez al navegador
console.log(path.join(__dirname, "src"));
app.use(express.static(path.join(__dirname, "src")));
/**
 * Se inicializa el servidor.
 */
var server = app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
/**
 * Se crea una instacia de socket.io.
 */
var SocketIO = require("socket.io");
let io = SocketIO(server);
var players = {};
/**
 * Desde aquí se escuchan los eventos del socket, desde que hay un nuevo jugador, hasta las desconexiones que se puedan 
 * presentar durante la ejecución 
 */
io.on("connection", (socket) => {
  console.log("Alguien se ha conectado", socket.id);
  players[socket.id] = {
    playerId: socket.id,
    score: 0,
  };

  socket.emit("currentPlayers", players);
  // Actualiza los eventos al resto de jugadores, de que alguien ha llegado.
  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("disconnect", function () {
    console.log("user disconnected");
    // Remueve a los otros jugadores del socket
    delete players[socket.id];
    // Emite el mensaje de que alguien se ha desconectado.
    io.emit("disconnected", socket.id);
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

  console.log("Players connected (SERVER EVENT)", players);
});
