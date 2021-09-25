import Phaser from "phaser"
import menuBG from '../../public/assets/menuBG.wav'
import * as configFile from "../config.js"

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menuscene' });
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.audio('menuBGMusic', menuBG);
    }

    create() {
        var add = this.add;
        var input = this.input;
        var playButton;
        const _this = this;

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
            active: function () {
                // let weclome = add.text(configFile.config.width / 2, configFile.config.width / 4, 'Welcome', { fontFamily: 'VT323', fontSize: 150, color: '#ffdac1' });
                // weclome.setOrigin(0.5, 0.5);

            }


        });
        let weclome = add.text(configFile.config.width / 2, configFile.config.width / 4, 'Welcome', { fontFamily: 'VT323', fontSize: 150, color: '#ffdac1' });
        weclome.setOrigin(0.5, 0.5);
        console.log(playButton);
        playButton = add.text(configFile.config.width / 2, configFile.config.height / 2, "Play", { fontFamily: 'VT323', fontSize: 150, color: '#ffb7b2' });
        playButton.setOrigin(0.5, 0.5);
        playButton.setInteractive({ useHandCursor: true });
        playButton.on('pointerover', function () {
            playButton.setTint(0XFF9AA2);
        })
        playButton.on('pointerout', function () {
            playButton.setTint(0XFFB7B2);
        })
        playButton.on('pointerdown', this.clickPlay);

    }
    clickPlay() {
        this.scene.scene.switch("titlescreen");

    }
}