var config = {
  type: Phaser.AUTO,
  height: window.innerHeight,
  width: window.innerWidth,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: -50 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var arrows = ["up", "down", "left", "right"]; // VALORES PARA COMPARAR
var secuence = new Array(); // SECUENCIA A REPETIR

// ELEMENTOS RENDERIZABLES (FLECHAS)
var up;
var down;
var right;
var left;

var game = new Phaser.Game(config);
var keys; // MANEJADOR DE EVENTOS DEL TECLADO EN PHASER
var score = 0;
var xoffset = 0; // DISTANCIA ENTRE CADA ELEMENTO RENDERIZADO

var squares; // STATIC GROUP, PERMITE MANTENER INSTANCIAS DE ELEMENTOS
var square; // INSTANCIA DEL CUADRADO, SOLO SE USA UNA

var renderedElements = new Array(); // ELEMENTOS QUE HAN SIDO DIBUJADOS
var over = false;
var overItem; // ELEMENTO ACTUALMENTE SUPERPUESTO CON EL CUADRADO

function preload() {
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

  // this.load.spritesheet("square", "src/assets/square.png", {
  //   frameHeight: 256,
  //   frameWidth: 256,
  // });
}

function create() {
  squares = this.physics.add.staticGroup();
  square = squares.create(950, 500, "square").setScale(1.5).refreshBody();
  console.log(square.getBounds());
  generateSecuence(secuence, 10);
  console.log(secuence);
  // console.log(getElementInSecuence());
  keys = this.input.keyboard.createCursorKeys();
}

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
function update() {
  if (secuence.length > 0) {
    const item = getElementInSecuence();
    let rendered;
    switch (item) {
      case "up":
        up = this.physics.add.sprite(2000 + xoffset, 500, "arr-up");
        xoffset += 500;
        rendered = { value: up, key: "up" };

        break;
      case "down":
        down = this.physics.add.sprite(2000 + xoffset, 500, "arr-down");
        xoffset += 500;
        rendered = { value: down, key: "down" };

        break;
      case "left":
        left = this.physics.add.sprite(2000 + xoffset, 500, "arr-left");
        xoffset += 500;
        rendered = { value: left, key: "left" };
        break;
      case "right":
        right = this.physics.add.sprite(2000 + xoffset, 500, "arr-right");
        xoffset += 500;
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
      console.log("Scored! +", score);
    } else if (keys.right.isDown && overItem.key == "right") {
      console.log("Scored! +", score);
    } else if (keys.down.isDown && overItem.key == "down") {
      console.log("Scored! +", score);
    } else if (keys.up.isDown && overItem.key == "up") {
      console.log("Scored! +", score);
    }
  }
}
