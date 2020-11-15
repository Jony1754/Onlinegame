// ELEMENTOS RENDERIZABLES (FLECHAS)
var up,down,left,right;

var keys; // MANEJADOR DE EVENTOS DEL TECLADO EN PHASER

//TEXTOS
var score = 0;
var scoreText;
var userName;
var userNameText;

var xoffset = 0; // DISTANCIA ENTRE CADA ELEMENTO RENDERIZADO

var squares; // STATIC GROUP, PERMITE MANTENER INSTANCIAS DE ELEMENTOS
var square; // INSTANCIA DEL CUADRADO, SOLO SE USA UNA

var renderedElements = new Array(); // ELEMENTOS QUE HAN SIDO DIBUJADOS
var over = false;
var overItem; // ELEMENTO ACTUALMENTE SUPERPUESTO CON EL CUADRADO

var juego = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function(){
    Phaser.Scene.call(this,{"key":"juego"});
  },
  preload: function(){
    this.load.spritesheet("arr-up", "src/assets/up-arrow.png", {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.spritesheet("arr-down", "src/assets/down-arrow.png", {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.spritesheet("arr-right", "src/assets/right-arrow.png", {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.spritesheet("arr-left", "src/assets/left-arrow.png", {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.image("background", "src/assets/background.jpg");
    this.load.image("square", "src/assets/square.png");  
  },
  create: function(){
    squares = this.physics.add.staticGroup();
    square = squares.create(683, 384, "square").setScale(1.5).refreshBody();
    console.log(square.getBounds());
    generateSecuence(secuence, 10);
    console.log(secuence);
    // console.log(getElementInSecuence());
    keys = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, "score: 0", {
      font: "48px Consolas",
      fill: "#FFF",
    });    
  },
  update: function(){
    if (secuence.length > 0) {
      const item = getElementInSecuence();
      let rendered;
      switch (item) {
        case "up":
          up = this.physics.add.sprite(2000 + xoffset, 384, "arr-up");
          xoffset += 384;
          rendered = { value: up, key: "up" };
  
          break;
        case "down":
          down = this.physics.add.sprite(2000 + xoffset, 384, "arr-down");
          xoffset += 384;
          rendered = { value: down, key: "down" };
  
          break;
        case "left":
          left = this.physics.add.sprite(2000 + xoffset, 384, "arr-left");
          xoffset += 384;
          rendered = { value: left, key: "left" };
          break;
        case "right":
          right = this.physics.add.sprite(2000 + xoffset, 384, "arr-right");
          xoffset += 384;
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
        console.log("OVERLAPED");
        over = true; // ALGUN ELEMENTO SE SOBREPONE
        overItem = element; // ELEMENTO SUPERPUESTO
      }
    }
  
    if (over) {
      // console.log("OVER", overItem.key);
      if (keys.left.isDown && overItem.key == "left") {
        // MIENTRAS SUPERPUESTO, VERIFICA SI LA TECLA ES IGUAL
        score++;
        scoreText.setText("Score: " + score);
      } else if (keys.right.isDown && overItem.key == "right") {
        score++;
        scoreText.setText("Score: " + score);
      } else if (keys.down.isDown && overItem.key == "down") {
        score++;
        scoreText.setText("Score: " + score);
      } else if (keys.up.isDown && overItem.key == "up") {
        score++;
        scoreText.setText("Score: " + score);
      }
    }    
  }
  
})



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
