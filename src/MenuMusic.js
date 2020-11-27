class MenuMusic extends Phaser.Scene {
    constructor(){
        super("menuMusic");
    }
    
     create ()
    {

        var menuMusic = this.sound.add('menuMusic', {volume: 0.55});
        menuMusic.setLoop(true);
        menuMusic.play();
    
}

}

  