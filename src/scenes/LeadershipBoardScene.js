import Phaser from "phaser";
import eventsCenter from "../EventsCenter";
import * as configFile from "../config.js"

export default class LeaderBoardScene extends Phaser.Scene {
    constructor() {
        super("leaderboardscene");
    }

    getHighScore(keyID) {
        return JSON.parse(localStorage.getItem(keyID));
    }

    create() {
        let scores = this.getHighScore(1);
        let add = this.add;
        let header = add.text(configFile.config.width / 2, configFile.config.height / 10, "Leaderboard", { fontFamily: 'VT323', fontSize: 100, color: '#ffb7b2' }).setOrigin(0.5, 0.5);

        let tempCounter = 1;
        let newHeight = 100;
        for (let score of scores) {
            let tempText = this.add.text(configFile.config.width / 2, (configFile.config.height / 10) + newHeight, `${score.name}   ${score.score}`, { fontFamily: 'VT323', fontSize: 50, color: '#ffb7b2' }).setOrigin(0.5, 0.5);
            newHeight += 50;

        }
    }



}