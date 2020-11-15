let texto;
var inicio = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
        Phaser.Scene.call(this,{"key":"inicio"});
    },
    init: function(){},
    preload: function(){
         texto = this.add.text(16, 16, "Inicio", {
            font: "48px Consolas",
            fill: "#FFF",
          });
    },
    create: function(){
        this.time.addEvent({
            delay:3000,
            loop:false,
            callback:()=>{
                this.scene.start("juego")
            }
        })
    },
    update:function(){
        texto.setText("Esperando jugador...");
    }
})
