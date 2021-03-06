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
        if (!scores) {
            scores = [
                {
                    name: "Pls",
                    score: 0
                },
                {
                    name: "buy",
                    score: 0
                },
                {
                    name: "me",
                    score: 0
                },

                {
                    name: "bbt",
                    score: 0
                }
            ]
        }
        let add = this.add;
        let header = add.text(configFile.config.width / 2, configFile.config.height / 10, "Leaderboard", { fontFamily: 'VT323', fontSize: 100, color: '#ffb7b2', stroke: "#000000", strokeThickness: 1 }).setOrigin(0.5, 0.5);
        let exitButton = this.add.text(configFile.config.width / 5 * 3, configFile.config.height / 4 * 3, 'Exit', { fontFamily: 'VT323', fontSize: 100, color: '#ffdac1', stroke: "#000000", strokeThickness: 1 }).setInteractive({ useHandCursor: true });
        exitButton.setOrigin(0, 0);

        exitButton.on('pointerdown', function () {
            this.scene.scene.start("menuscene");
            this.scene.sound.removeAll();
        })


        let tempCounter = 1;
        let newHeight = 100;
        for (let score of scores) {
            if (!score.name) {
                score.name = "buy me btt uwu";
            }
            let tempText = this.add.text(configFile.config.width / 2, (configFile.config.height / 10) + newHeight, `${score.name}   ${score.score}`, { fontFamily: 'VT323', fontSize: 50, color: '#ffb7b2' }).setOrigin(0.5, 0.5);
            newHeight += 50;
        }
    }



}