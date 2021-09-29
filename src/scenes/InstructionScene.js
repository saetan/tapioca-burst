import Phaser from "phaser";
import * as configFile from "../config.js"

export default class InstructionScene extends Phaser.Scene {
    constructor() {
        super("instructionscene");
    }


    create() {

        let instructions = ` Use left click to move

                            \nbetween the empty columns

                            \n Match with identical cup
                            
                            \n below you to score`

        let add = this.add;
        let header = add.text(configFile.config.width / 2, configFile.config.height / 20, "How To Play", { fontFamily: 'VT323', fontSize: 100, color: '#ffb7b2', stroke: "#000000", strokeThickness: 1 }).setOrigin(0.5, 0.5);

        let howToPlay = add.text(0, configFile.config.height / 5, instructions, { fontFamily: 'VT323', fontSize: 50, color: '#ffb7b2', stroke: "#000000", strokeThickness: 1 }).setOrigin(0, 0);


        let exitButton = this.add.text(configFile.config.width / 5 * 3, configFile.config.height / 10 * 9, 'Exit', { fontFamily: 'VT323', fontSize: 100, color: '#ffdac1', stroke: "#000000", strokeThickness: 1 }).setInteractive({ useHandCursor: true });
        exitButton.setOrigin(0, 0);

        exitButton.on('pointerover', function () {
            exitButton.setTint(0XFF9AA2);
        });
        exitButton.on('pointerout', function () {
            exitButton.setTint(0XFFB7B2);
        });

        exitButton.on('pointerdown', function () {
            this.scene.scene.start("menuscene");
            this.scene.sound.removeAll();
        });

    }



}