class Background extends Phaser.Scene {
    constructor(){
        super("background");
    }
    
    preload (){
       this.load.image("background", "assets/images/background.png");
       this.load.image("logo", "assets/images/logo.png");
       this.load.audio('splashSound', ['assets/audio/splashSound.mp3']);
    }

     create ()
    {

    this.background = this.add.image(0,0,"background");
    this.background.setOrigin(0,0);
    this.scene.launch("SplashScreen");
    
}
}

