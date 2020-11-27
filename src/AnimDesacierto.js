class AnimDesacierto extends Phaser.Scene {
    constructor(){
        super("animDesacierto");
    }

     create ()
    {
        this.square = this.add.image(199+60, 231+60, "square");
        var desaciertoSound = this.sound.add('desaciertoSound', {volume: 0.3});
        desaciertoSound.play();

        
        this.tweens.add({
            targets     : this.square,
            ease        : 'Linear',
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

