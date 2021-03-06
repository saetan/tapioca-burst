import Phaser from "phaser"
import menuBG from '../../public/assets/menuBG.wav'
import * as configFile from "../config.js"

var loading;
var isLoading = true;

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menuscene' });
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.audio('menuBGMusic', menuBG);
        if (isLoading) {
            loading = this.add.text(configFile.config.width / 2, 50, "Loading", { fontSize: 100 }).setOrigin(0.5, 0.5);
        }
    }

    create() {
        var add = this.add;
        var input = this.input;
        var playButton;
        var leadershipButton;
        var insturctionButton;
        var menuBGMusic = this.sound.add('menuBGMusic', {
            volume: 0.2,
            rate: 1,
            loop: true,
        });

        menuBGMusic.play();
        WebFont.load({
            google: {
                families: ['VT323']
            },
            active: () => {
                let weclome = add.text(configFile.config.width / 2, configFile.config.width / 4, 'Welcome', { fontFamily: 'VT323', fontSize: 150, color: '#FF9AA2', stroke: "#000000", strokeThickness: 1 });
                weclome.setOrigin(0.5, 0.5);
                playButton = add.text(configFile.config.width / 2, configFile.config.height / 3, "Play", { fontFamily: 'VT323', fontSize: 150, color: '#ffb7b2', stroke: "#000000", strokeThickness: 1 });
                playButton.setOrigin(0.5, 0.5);
                playButton.setInteractive({ useHandCursor: true });
                playButton.on('pointerover', function () {
                    playButton.setTint(0XFF9AA2);
                })
                playButton.on('pointerout', function () {
                    playButton.setTint(0XFFB7B2);
                })
                playButton.on('pointerdown', this.clickPlay);
                isLoading = false;

                //Instruction Button
                insturctionButton = add.text(configFile.config.width / 2, configFile.config.height / 2 + 50, "instruction", { fontFamily: 'VT323', fontSize: 100, color: '#ffb7b2', stroke: "#000000", strokeThickness: 1 });
                insturctionButton.setOrigin(0.5, 0.5);
                insturctionButton.setInteractive({ useHandCursor: true });
                insturctionButton.on('pointerover', function () {
                    insturctionButton.setTint(0XFF9AA2);
                })

                insturctionButton.on('pointerout', function () {
                    insturctionButton.setTint(0XFFB7B2);
                });

                insturctionButton.on('pointerdown', () => {
                    this.scene.switch("instructionscene");
                });

                //Leadership button
                leadershipButton = add.text(configFile.config.width / 2, configFile.config.height / 4 * 3, "Leaderboard", { fontFamily: 'VT323', fontSize: 100, color: '#ffb7b2', stroke: "#000000", strokeThickness: 1 });
                leadershipButton.setOrigin(0.5, 0.5);
                leadershipButton.setInteractive({ useHandCursor: true });
                leadershipButton.on('pointerover', function () {
                    leadershipButton.setTint(0XFF9AA2);
                })
                leadershipButton.on('pointerout', function () {
                    leadershipButton.setTint(0XFFB7B2);
                })
                leadershipButton.on('pointerdown', () => {
                    this.scene.switch("leaderboardscene");
                });
            }

        });





    }
    clickPlay() {
        this.scene.scene.switch("titlescreen");

    }

    update() {
        if (!isLoading) {
            loading.destroy();
        }
    }
}