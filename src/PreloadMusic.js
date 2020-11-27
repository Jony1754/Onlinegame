class PreloadMusic extends Phaser.Scene {
    constructor(){
        super("preloadMusic");
    }
    
    preload (){
        this.load.audio('menuMusic', ['assets/audio/music/menuMusic.wav']); 
        this.load.audio('gameMusic', ['assets/audio/music/gameMusic.wav']);
    }


    

}

