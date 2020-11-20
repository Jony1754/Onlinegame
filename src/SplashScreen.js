class SplashScreen extends Phaser.Scene {
    constructor(){
        super("SplashScreen");
    }

    preload (){
      this.load.image("mainMenu", "assets/images/mainMenu.png");
      this.load.image("jugarR", "assets/images/jugarResaltado.png");
      this.load.image("creditsScreen", "assets/images/creditsScreen.png");
      this.load.image("creditosR", "assets/images/creditosResaltado.png");
      this.load.image("closeBtn", "assets/images/closeBtn.png")
      this.load.image("closeAnim", "assets/images/closeAnim.png");
   }

     create ()
    {

        var despX=0, despY=20;


    this.mainMenu = this.add.image(400+despX,300+despY,"mainMenu");
    this.mainMenu.setAlpha(0);

    this.logo = this.add.image(400,300,"logo");
    this.logo.setScale(10);
   
    //Animación splash screen
    this.tweens.add({
        targets     : this.logo,
        scale       : 1,
        x           : 400,
        y           : 300,
        ease        : 'Power3',
        duration    : 500,
      });

      //Transparencia splash screen
      this.tweens.add({
        targets     : this.logo,
        ease        : 'Linear',
        alpha: {
            getStart: () => 0,
            getEnd: () => 1
          },
        duration    : 100,
      });

      //Animación opciones menú principal
      this.tweens.add({
        delay: 3000,
        targets     : this.mainMenu,
        scale       : {
          getStart: () => 1.1,
          getEnd: () => 1
        },
        alpha: {
          getStart: () => 0,
          getEnd: () => 1
        },
        ease        : 'Power3',
        duration    : 800,
      });

      //Animación logo menú principal
      this.tweens.add({
        delay: 3000,
        targets     : this.logo,
        scale       : 0.58,
        y: 175+despY,
        ease        : 'Power3',
        duration    : 800,
        
      });
      
      this.time.addEvent({
          delay: 3800,
          loop: false,
          callback: () => {
              this.scene.start("mainMenu");
          }  
      })
      
    

}

    


    }




