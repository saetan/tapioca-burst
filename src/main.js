import Phaser from "phaser";
import TitleScreen from "./scenes/TitleScreen";
import * as configFile from "./config.js"

window.onload = function () {
    const config = configFile.config;
    // const config = {
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //     type: Phaser.AUTO,
    //     autoCenter: true,
    //     physics: {
    //         default: 'arcade',
    //         arcade: {
    //             debug: true,
    //         },
    //     },
    // }

    const game = new Phaser.Game(config);
    game.scene.add('titlescreen', TitleScreen);
    game.scene.start('titlescreen');
}




