class Credits extends Phaser.Scene {
    constructor(){
        super("credits");
    }

    create(){

        const menu = this;

        var despX=0, despY=20; 

        var clickSoundEnter = this.sound.add('clickSoundEnter');
        clickSoundEnter.play();

        this.mainMenu = this.add.image(400+despX,300+despY,"mainMenu");

        this.logo = this.add.image(400,195,"logo");
        this.logo.setScale(0.58);

        this.creditsScreen = this.add.image(400,300,"creditsScreen");
        this.closeAnim = this.add.image(400,300,"closeAnim");
   //     this.closeBtn = this.add.image(85,127,"closeBtn");
   //     this.closeBtn.alpha = 0;

        //Botón de cerrar
        var closeBtn = this.add.sprite(85, 127, "closeBtn").setInteractive();
        closeBtn.setAlpha(0);

        closeBtn.input.alwaysEnabled = true;
      
        closeBtn.on("pointerover", function(event) {
            this.setTint(0x16F02A);
        });
      
        closeBtn.on("pointerout", function(event) {
          this.clearTint();
        });

        closeBtn.on('pointerdown', function (pointer) {
          this.setAlpha(0.9);
        });
    
        closeBtn.on('pointerup', function (pointer) {
           this.clearTint();
           menu.scene.start("animCredits");
           

        });


        //Animación desvanecimiento menú principal
        this.tweens.add({
            targets     : this.mainMenu,
            
            scale       : {
              getStart: () => 1,
              getEnd: () => 1.2
            },
            
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            ease        : 'Power3',
            duration    : 250
        });

        //logo
        this.tweens.add({
            targets     : this.logo,
            
            scale       : {
              getStart: () => 0.58,
              getEnd: () => 0.58*1.2
            },
            
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            ease        : 'Power3',
            duration    : 250
        });

        //Animación credits apareciéndose
        this.tweens.add({
            targets     : [this.creditsScreen,this.closeAnim],
            scale       : {
              getStart: () => 0.8,
              getEnd: () => 1
            },
            alpha: {
              getStart: () => 0,
              getEnd: () => 1
            },
            ease        : 'Power3',
            duration    : 300,
        });

        //Animación botón cerrar (funcional)
        this.tweens.add({
            targets     : closeBtn,
            delay: 300,
            alpha: {
              getStart: () => 0,
              getEnd: () => 1
            },
            ease        : 'Power3',
            duration    : 0,
        });
        

        //Animación botón cerrar
        this.tweens.add({
            targets     : this.closeAnim,
            delay: 300,
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            ease        : 'Power3',
            duration    : 0,
        });





        

        

    }




}