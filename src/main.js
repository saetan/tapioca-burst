import Phaser from "phaser";
import TitleScreen from "./scenes/TitleScreen";

window.onload = function () {
    const config = {
        width: 512,
        height: 1024,
        type: Phaser.AUTO,
        autoCenter: true,
        physics: {
            default: 'arcade',
            arcade: {
                debug: true,
            },
        },
    }

    const game = new Phaser.Game(config);
    game.scene.add('titlescreen', TitleScreen);
    game.scene.start('titlescreen');
}



