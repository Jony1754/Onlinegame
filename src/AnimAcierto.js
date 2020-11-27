class AnimAcierto extends Phaser.Scene {
    constructor(){
        super("animAcierto");
    }

     create ()
    {
        this.square = this.add.image(400, 231+60, "square");
        var aciertoSound = this.sound.add('aciertoSound', {volume: 0.3});
        aciertoSound.play();

        
        this.tweens.add({
            targets     : this.square,
            ease        : 'Power4',
            alpha: {
                getStart: () => 1,
                getEnd: () => 0
              },
            scale       : {
                getStart: () => 1,
                getEnd: () => 2
            },
            duration    : 200,
          });


          this.time.addEvent({
            delay: 200,
            loop: false,
            callback: () => {
                this.scene.start("game");
            }  
        })

        
        
}


}

