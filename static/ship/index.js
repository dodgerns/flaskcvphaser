import { Game} from './game.js';
import { Camera} from './camera.js'
import { Communication} from './communication.js';
import { Api } from './api.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Game],
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
const camera = new Camera();
camera.startCamera();
const api = new Api();
const communication = new Communication(camera.getImage(), api);

game.events.once('ready', function () {
    const gameScene = game.scene.getScene('game');
    
    gameScene.addCommunication(communication);
    gameScene.startInteraction();
});