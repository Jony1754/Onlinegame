// ELEMENTOS RENDERIZABLES (FLECHAS)
var up, down, left, right;

var keys; // MANEJADOR DE EVENTOS DEL TECLADO EN PHASER
//TEXTOS
var score = 0;
var oldScore = 0; //Almacena la puntuacion anterior para verificar si algo ha cambiado y disparar el evento en el server
var scoreText;
var scoreTextEnemy; // MANEJA EL OUTPUT DE LA PUNTUACION DEL ENEMIGO

var xoffset = 0; // DISTANCIA ENTRE CADA ELEMENTO RENDERIZADO

var squares; // STATIC GROUP, PERMITE MANTENER INSTANCIAS DE ELEMENTOS
var square; // INSTANCIA DEL CUADRADO, SOLO SE USA UNA

var renderedElements = new Array(); // ELEMENTOS QUE HAN SIDO DIBUJADOS
var over = false;
var overItem; // ELEMENTO ACTUALMENTE SUPERPUESTO CON EL CUADRADO

var juego = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "juego" });
  },

  init: function (data) {
    // LOS DATOS RECIBIDOS UNA VEZ SE LLAMA LA ESCENA DESDE MAIN.JS
    this.socket = data.socket; // Se almacena una REFERENCIA a la variable que maneja el socket en cada instancia del juego
  },
  preload: function () {
    this.load.spritesheet("arr-up", "assets/images/up.png", {
      frameWidth: 160,
      frameHeight: 160,
    });
    this.load.spritesheet("arr-down", "assets/images/down.png", {
      frameWidth: 160,
      frameHeight: 160,
    });
    this.load.spritesheet("arr-right", "assets/images/right.png", {
      frameWidth: 160,
      frameHeight: 160,
    });
    this.load.spritesheet("arr-left", "assets/images/left.png", {
      frameWidth: 160,
      frameHeight: 160,
    });
    this.load.image("background", "assets/background.jpg");
    this.load.image("square", "assets/images/square.png");
  },
  create: function () {
    squares = this.physics.add.staticGroup();
    square = squares.create(199 + 60, 231 + 60, "square");
    generateSecuence(secuence, 10);
    keys = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, "Your score: 0", {
      font: "48px Consolas",
      fill: "#FFF",
    });
    scoreTextEnemy = this.add.text(16, 64, "Your ENEMY score: 0", {
      font: "48px Consolas",
      fill: "red",
    });

    console.log(`Socket en instancia: ${this.socket.id} `); // COMPRUEBA QUE CADA SOCKET ES DISTINTO

    this.socket.on("playerScore", function (data) {
      // Se dispara este evento cuando el otro jugador ha puntuado y el jugador envia sus datos de puntuacion por lo que aqui se debe
      // configurar su marcador
      // console.log("data logged on the listening event playerScore", data);
      scoreTextEnemy.setText("Your ENEMY score: " + data.player.score);
    });
  },
  update: function () {
    if (secuence.length > 0) {
      const item = getElementInSecuence();
      let rendered;
      switch (item) {
        case "up":
          up = this.physics.add.sprite(2000 + xoffset, 231 + 60, "arr-up");
          xoffset += 231 + 60;
          rendered = { value: up, key: "up" };

          break;
        case "down":
          down = this.physics.add.sprite(2000 + xoffset, 231 + 60, "arr-down");
          xoffset += 231 + 60;
          rendered = { value: down, key: "down" };

          break;
        case "left":
          left = this.physics.add.sprite(2000 + xoffset, 231 + 60, "arr-left");
          xoffset += 231 + 60;
          rendered = { value: left, key: "left" };
          break;
        case "right":
          right = this.physics.add.sprite(
            2000 + xoffset,
            231 + 60,
            "arr-right"
          );
          xoffset += 231 + 60;
          rendered = { value: right, key: "right" };
          break;
      }

      renderedElements.push(rendered); // AGREGA EL ELEMENTO A LA LISTA DE LA SECUENCIA RENDERIZADA EN PANTALLA
      console.log(renderedElements);
    }

    for (let index = 0; index < renderedElements.length; index++) {
      // VERIFICA SI CADA UNO DE LOS ELEMENTOS SE SOBREPONE CON LA CAJA
      const element = renderedElements[index];
      if (this.physics.overlap(element.value, square)) {
        // FUNCION INTERNA DE PHASER PARA VERIFICAR OVERLAP
        over = true; // ALGUN ELEMENTO SE SOBREPONE
        overItem = element; // ELEMENTO SUPERPUESTO
      }
    }

    if (over) {
      oldScore = score; // Al

      if (keys.left.isDown && overItem.key == "left") {
        // MIENTRAS SUPERPUESTO, VERIFICA SI LA TECLA ES IGUAL
        score++;
        scoreText.setText("Your score: " + score);
      } else if (keys.right.isDown && overItem.key == "right") {
        score++;
        scoreText.setText("Your score: " + score);
      } else if (keys.down.isDown && overItem.key == "down") {
        score++;
        scoreText.setText("Your score: " + score);
      } else if (keys.up.isDown && overItem.key == "up") {
        score++;
        scoreText.setText("Your score: " + score);
      }
      //La puntuacion cambio, hay que avisar al servidor
      if (oldScore !== score) {
        // console.log({ prevScore: oldScore, actualScore: score });
        this.socket.emit("playerScored", score);
      }
    }
  },
});

var arrows = ["up", "down", "left", "right"]; // VALORES PARA COMPARAR
var secuence = new Array(); // SECUENCIA A REPETIR

function getElementInSecuence() {
  return secuence.shift();
}

function generateSecuence(arr, count) {
  let item;

  for (let i = 0; i < count; i++) {
    item = getRandomInt(0, 3);

    arr.push(arrows[item]);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
