/**
 * Declaración de variables
 */
// ELEMENTOS RENDERIZABLES (FLECHAS)
var up, down, left, right;

var keys; // MANEJADOR DE EVENTOS DEL TECLADO EN PHASER
//TEXTOS
var score = 0;
var enemyScore = 0;
var oldScore = 0; //Almacena la puntuacion anterior para verificar si algo ha cambiado y disparar el evento en el server
var scoreText;
var scoreTextEnemy; // MANEJA EL OUTPUT DE LA PUNTUACION DEL ENEMIGO
var lastArrow;
var xoffset = 0; // DISTANCIA ENTRE CADA ELEMENTO RENDERIZADO
var v=0;
var squares; // STATIC GROUP, PERMITE MANTENER INSTANCIAS DE ELEMENTOS
var square; // INSTANCIA DEL CUADRADO, SOLO SE USA UNA
let fle=0;
var renderedElements = new Array(); // ELEMENTOS QUE HAN SIDO DIBUJADOS
var over = true;
var overItem; // ELEMENTO ACTUALMENTE SUPERPUESTO CON EL CUADRADO
var gameEnd = false;
/**
 * Clase juego que hereda de Phaser Scene, para poder manejar los eventos como una escena de Phaser.
 */
var juego = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "juego" });
  },
  /**
   * Se reciben los datos una vez se llama la escena juego desde main.js y se almacena 
   * una referencia a la variable que maneja el socket en cada instancia del juego.
   * @param {socket} data 
   */
  init: function (data) {
    // LOS DATOS RECIBIDOS UNA VEZ SE LLAMA LA ESCENA DESDE MAIN.JS
    this.socket = data.socket; // Se almacena una REFERENCIA a la variable que maneja el socket en cada instancia del juego
    this.enemy = data.enemy;
  },
  /**
   * Se cargan las imagenes a utilizar en el juego
   */
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
  /**
   * Se ubican los puntajes y el cuadrado que controla que exista una colisión con las flechas que se despliegan en el juego.
   */
  create: function () {
    this.game.sound.stopAll();
    this.scene.launch("gameMusic");
    squares = this.physics.add.staticGroup();
    square = squares.create(400, 231 + 60, "square");
    generateSecuence(secuence, 75);
    keys = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, "Tú: 0", {
      font: "44px Consolas",
      fill: "#fc035e",
      stroke: "#fc035e",
      strokeThickness: 1,
    });
    scoreTextEnemy = this.add.text(16, 64, "Tu enemigo: 0", {
      font: "44px Consolas",
      fill: "#FFF",
      
    });
    howYouDoing = this.add.text(305, 170, "", {
      font: "36px Consolas",
      fill: "#FFF",
      
    });
    console.log(`Socket en instancia: ${this.socket.id} `); // COMPRUEBA QUE CADA SOCKET ES DISTINTO

    this.socket.on("playerScore", function (data) {
      /**
       * Se escribe la puntuación del otro usuario
       */
      scoreTextEnemy.setText("Tu enemigo: " + data.player.score);
      enemyScore = data.player.score;
    });

    this.socket.on("disconnected", function (playerId) {
      console.log("player2 disconnected");
      gameEnd = true;
    });
  },
  /**
   * Se realizan los eventos que permiten que el usuario juegue.
   */
  update: function () {
    if (gameEnd) {
      // this.scene.start("mainMenu");
      location.reload();
    }
    /**
     * Se realizara este evento hasta que todos los elementos de la secuencia sean mostrados en la pantalla.
     */
    if (secuence.length > 0) {
      const item = getElementInSecuence();
      let rendered;
      /**
       * Recibe las flechas de la secuencia y dibuja que tipo de flecha es de acuerdo a su número.
       * @param {Object} element 
       */
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
    /**
     * Se verifica si cada uno de los elementos se sobrepone en la caja y controla de que se hayan mostrado todos los 
     * elementos del arreglo de la secuencia.
     */
    for (let index = 0; index < renderedElements.length; index++) {
      // VERIFICA SI CADA UNO DE LOS ELEMENTOS SE SOBREPONE CON LA CAJA
      const element = renderedElements[index];
      if (this.physics.overlap(element.value, square)) {
        // FUNCION INTERNA DE PHASER PARA VERIFICAR OVERLAP
        over = true; // ALGUN ELEMENTO SE SOBREPONE
        overItem = element; // ELEMENTO SUPERPUESTO
        if(index==renderedElements.length-1){
          over = false;
        }
      }
    }
    /**
     * Se verifica que no se hayan acabado las flechas del arreglo y se controla el sistema de puntuación.
     * @param {boolean} over
     */    
    if (over) {
      oldScore = score; // Al
      if (keys.left.isDown) {
        // MIENTRAS SUPERPUESTO, VERIFICA SI LA TECLA ES IGUAL
        if(overItem.key == "left"){
          score++;
          howYouDoing.setText("¡Excelente!");
          scoreText.setText("Tú: " + score);
          this.scene.launch("animAcierto");
        }else{
          score--;
          howYouDoing.setText("Así no eh");
          scoreText.setText("Tú: " + score);
        }
      } else if (keys.right.isDown) {
        if(overItem.key == "right"){
          score++;
          howYouDoing.setText("¡Excelente!");
          scoreText.setText("Tú: " + score);
          this.scene.launch("animAcierto");
        }else{
          score--;
          howYouDoing.setText("Así no eh");
          scoreText.setText("Tú: " + score);

        }
      } else if (keys.down.isDown) {
        if(overItem.key == "down"){
          score++;
          howYouDoing.setText("¡Excelente!");
          scoreText.setText("Tú: " + score);
          this.scene.launch("animAcierto");
        }else{
          score--;
          howYouDoing.setText("Así no eh");
          scoreText.setText("Tú: " + score);
        }
      } else if (keys.up.isDown) {
        if(overItem.key == "up"){
          score++;
          howYouDoing.setText("¡Excelente!");
          scoreText.setText("Tú: " + score);
          this.scene.launch("animAcierto");
        }else{
          score--;
          howYouDoing.setText("Así no eh");
          scoreText.setText("Tú: " + score);
        }
      }
      /**
       * Se emite la nueva puntuación al socket.
       */
      if (oldScore !== score) {
        // console.log({ prevScore: oldScore, actualScore: score });
        this.socket.emit("playerScored", score);
      }
    }else{
      howYouDoing.setText("Se acabó");
      this.time.addEvent({
        delay: 3000,
        loop: false,
        callback: () => {
          this.scene.start("resultados", { myScore: score, enemyScore: enemyScore });
        }  
    })
    }
  },
});

var arrows = ["up", "down", "left", "right"]; // VALORES PARA COMPARAR
var secuence = new Array(); // SECUENCIA A REPETIR
/**
 * Se toma un elemento de la secuencia.
 */

function getElementInSecuence() {
  return secuence.shift();
}
/**
 * Se genera la secuencia de flechas de manera aleatoria, de acuerdo con la cantidad de flecha que queremos.
 * @param {Object} arr 
 * @param {int} count 
 */
function generateSecuence(arr, count) {
  let item;

  for (let i = 0; i < count; i++) {
    item = getRandomInt(0, 3);

    arr.push(arrows[item]);
  }
}
/**
 * Se genera un entero aleatoriamente.
 * @param {int} min 
 * @param {int} max 
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
