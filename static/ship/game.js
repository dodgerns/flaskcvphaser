export class Game extends Phaser.Scene{
    constructor(){
        super({key: 'game'});
    }
    preload(){
        this.load.image('ship', 'static/ship/images/ship.png');
    }
    create(){
        this.ship = this.physics.add.image(400, 250, 'ship');
        this.ship.body.allowGravity = false;
    }
    update(){
    }
    addCommunication(communication){
        this.communication = communication;
    }
    startInteraction(){
        this.timedEvent = this.time.addEvent({
            delay: 400,
            callback: this.moveShip, // La función que deseas ejecutar
            callbackScope: this,
            loop: true // Para que se repita indefinidamente
        });
    }
    async moveShip(){
        const position = await this.communication.sendImage();
        console.log(position);
        this.ship.setPosition(position.x, position.y);
    }
    
}