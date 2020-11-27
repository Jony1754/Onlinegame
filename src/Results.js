var myScore = 0;
var enemyScore = 0;

class resultados extends Phaser.Scene {
  constructor(){
      super("resultados");
  }
  
  

  init(data){ 
    myScore = data.myScore;
    enemyScore = data.enemyScore;
  }


   create ()
  {

    this.resultsScreen = this.add.image(0,0,"resultsScreen");
    this.resultsScreen.setOrigin(0,0);

    if(myScore>enemyScore){
      this.ganaste = this.add.image(400,200,"ganaste");
    }else if(myScore<enemyScore){
      this.perdiste = this.add.image(400,200,"perdiste");
    }else{
      this.empate = this.add.image(400,200,"empate");
    }


    this.add.text(247, 250, "Tu puntuación:", {
      font: "40px Consolas",
      fill: "#FFF",
      align: 'center'
    });

    var myScoreText = this.add.text(385, 290, myScore, {
      font: "45px Consolas",
      fill: "#FFF",
      align: 'center'
    });


    this.add.text(227, 350, "La de tu enemigo:", {
      font: "40px Consolas",
      fill: "#FFF",
      align: "center"
    });


    var enemyScoreText = this.add.text(385, 390, enemyScore, {
      font: "45px Consolas",
      fill: "#FFF",
      align: "center"
    });

    //BOTÓN JUGAR (seleccionado)
    var botonMenuPrincipal = this.add.sprite(255, 443, "botonMenuPrincipal").setInteractive();
    botonMenuPrincipal.setOrigin(0, 0);
    botonMenuPrincipal.setAlpha(0);

    botonMenuPrincipal.input.alwaysEnabled = true;

    botonMenuPrincipal.on("pointerover", function (event) {
      this.setAlpha(0.8);
    });

    botonMenuPrincipal.on("pointerout", function (event) {
      this.setAlpha(0);
    });

    botonMenuPrincipal.on("pointerdown", function (pointer) {
      this.setAlpha(0.5);
    });

    botonMenuPrincipal.on("pointerup", function (pointer) {
      this.setAlpha(0.8);
      location.reload();
    });

  
}
}

