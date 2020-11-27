class AnimCarga extends Phaser.Scene {
    constructor(){
        super("animCarga");
    }
    

     create ()
    {

      var despX = 0,
      despY = 20;

    this.mainMenu = this.add.image(400 + despX, 300 + despY, "mainMenu");

    //Ubicar logo
    this.logo = this.add.image(400, 195, "logo");
    this.logo.setScale(0.58);

    //Animación desvanecimiento menú principal
    var tween = this.tweens.add({
        targets     : this.mainMenu,
        
        scale       : {
          getStart: () => 1,
          getEnd: () => 0.8
        },

        alpha: {
          getStart: () => 1,
          getEnd: () => 0
        },
        ease        : 'Power3',
        duration    : 250
    });
    
    //logo
    tween = this.tweens.add({
        targets     : this.logo,
        scale       : {
          getStart: () => 0.58,
          getEnd: () => 0.58*0.8
        },
        alpha: {
          getStart: () => 1,
          getEnd: () => 0
        },
        ease        : 'Power3',
        duration    : 250
    });

    this.time.addEvent({
        delay: 250,
        loop: false,
        callback: () => {
            this.scene.start("inicio");
        }  
    })
    
}
}

