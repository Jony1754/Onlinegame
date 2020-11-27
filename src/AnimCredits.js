class AnimCredits extends Phaser.Scene {
    constructor(){
        super("animCredits");
    }


    create(){
        const menu = this;

        var despX=0, despY=20; 

        var clickSoundExit = this.sound.add('clickSoundExit', {volume: 0.5});
        clickSoundExit.play();

        this.creditsScreen = this.add.image(400,300,"creditsScreen");
        this.closeAnim = this.add.image(400,300,"closeAnim");

        this.mainMenu = this.add.image(400+despX,300+despY,"mainMenu");
        this.mainMenu.alpha = 0;

        this.logo = this.add.image(400,195,"logo");
        this.logo.setScale(0.58);
        this.logo.alpha = 0;

        //VOLVER AL MENÚ PRINCIPAL
        
        //Animación botón cerrar
        var tween = this.tweens.add({
            targets     : this.closeAnim,
            delay: 0,
            alpha: {
              getStart: () => 0,
              getEnd: () => 1
            },
            ease        : 'Power3',
            duration    : 0,
        });
   
        //Animación desvanecimiento menú principal
        tween = this.tweens.add({
            targets     : this.mainMenu,
            
            scale       : {
              getStart: () => 1.2,
              getEnd: () => 1
            },

            alpha: {
              getStart: () => 0,
              getEnd: () => 1
            },
            ease        : 'Power3',
            duration    : 250
        });
        
        //logo
        tween = this.tweens.add({
            targets     : this.logo,
            scale       : {
              getStart: () => 0.58*1.2,
              getEnd: () => 0.58
            },
            alpha: {
              getStart: () => 0,
              getEnd: () => 1
            },
            ease        : 'Power3',
            duration    : 250
        });

        //Animación credits desapareciéndose
        tween = this.tweens.add({
            targets     : [this.creditsScreen,this.closeAnim],
            scale       : {
              getStart: () => 1,
              getEnd: () => 0.8
            },
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            ease        : 'Power3',
            duration    : 300,
        });

        this.time.addEvent({
            delay: 300,
            loop: false,
            callback: () => {
                this.scene.start("mainMenu");
            }  
        })

    }







}