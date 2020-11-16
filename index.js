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
io.on("connection", (socket) => {
  console.log("Alguien se ha conectado", socket.id);
});
