import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene.js";
import TitleScreen from "./scenes/TitleScreen.js";
import * as configFile from "./config.js"

window.onload = function () {
    const config = configFile.config;

    let titleScreen = new TitleScreen();
    let menuScene = new MenuScene();

    const game = new Phaser.Game(config);

    game.scene.add('menuscene', MenuScene);
    game.scene.add('titlescreen', TitleScreen);

    game.scene.start('menuscene');
}




