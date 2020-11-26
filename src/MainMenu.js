class MainMenu extends Phaser.Scene {
  constructor() {
    super("mainMenu");
  }
  create() {
    const menu = this;
    var despX = 0,
      despY = 20;

    this.mainMenu = this.add.image(400 + despX, 300 + despY, "mainMenu");

    //Ubicar logo
    this.logo = this.add.image(400, 195, "logo");
    this.logo.setScale(0.58);

    //BOTÓN JUGAR (seleccionado)
    var jugarR = this.add.sprite(305, 250 + despY, "jugarR").setInteractive();
    jugarR.setOrigin(0, 0);
    jugarR.setAlpha(0);

    jugarR.input.alwaysEnabled = true;

    jugarR.on("pointerover", function (event) {
      this.setAlpha(1);
    });

    jugarR.on("pointerout", function (event) {
      this.setAlpha(0);
    });

    jugarR.on("pointerdown", function (pointer) {
      this.setAlpha(0.8);
    });

    jugarR.on("pointerup", function (pointer) {
      this.setAlpha(1);
      menu.scene.start("inicio");
    });

    var creditosR = this.add
      .sprite(308, 318 + despY, "creditosR")
      .setInteractive();
    creditosR.setOrigin(0, 0);
    creditosR.setAlpha(0);

    creditosR.input.alwaysEnabled = true;

    creditosR.on("pointerover", function (event) {
      this.setAlpha(1);
    });

    creditosR.on("pointerout", function (event) {
      this.setAlpha(0);
      this.clearTint();
    });

    creditosR.on("pointerdown", function (pointer) {
      this.setAlpha(0.8);
    });

    creditosR.on("pointerup", function (pointer) {
      this.setAlpha(1);
      menu.scene.start("credits");
    });
  }
}
