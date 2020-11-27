class GameMusic extends Phaser.Scene {
    constructor(){
        super("gameMusic");
    }
    
     create ()
    {

        var gameMusic = this.sound.add('gameMusic', {volume: 0.55});
        gameMusic.setLoop(true);
        gameMusic.play();
    
}
}

