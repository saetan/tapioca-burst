import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene.js";
import TitleScreen from "./scenes/TitleScreen.js";
import LeaderBoardScene from "./scenes/LeadershipBoardScene.js";
import * as configFile from "./config.js"

window.onload = function () {
    const config = configFile.config;

    let titleScreen = new TitleScreen();
    let menuScene = new MenuScene();
    let leadershipscene = new LeaderBoardScene();

    const game = new Phaser.Game(config);

    game.scene.add('menuscene', MenuScene);
    game.scene.add('titlescreen', TitleScreen);
    game.scene.add('leaderboardscene', LeaderBoardScene);


    game.scene.start('menuscene');
}




