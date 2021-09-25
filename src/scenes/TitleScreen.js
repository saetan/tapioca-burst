import Phaser, { GameObjects, Scene } from "phaser";
import bobasSpriteSheet from '../../public/assets/bobas.png'
import popSound from '../../public/assets/Mana_Potion_2.mp3'
import comboSound from '../../public/assets/Coin_2.mp3'
import bgMusic from '../../public/assets/bg.wav'
import * as configFile from "../config.js"


const gameWidth = configFile.config.width;
const gameHeight = configFile.config.height;

let gameOption = {
    columns: 4,
    rows: 50,
    bobaSpeed: 200,
    playerSpeed: 60,
}

let score;
let scoreText;
let bobaSound;
let comboStreakSound;
let gameBGMusic;
let comboTimer;
let isCombo = false;

export default class TitleScreen extends Phaser.Scene {

    int() {

    }
    preload() {

        //import the boba photo
        this.load.spritesheet('bobas', bobasSpriteSheet, {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.audio('popSound', popSound);
        this.load.audio('comboSound', comboSound);
        this.load.audio('bgMusic', bgMusic);



    }
    create() {
        score = 0;
        this.sound.removeAll();
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px' });
        bobaSound = this.sound.add('popSound');
        bobaSound.volume = 0.5;

        gameBGMusic = this.sound.add('bgMusic', {
            volume: 0.2,
            rate: 1,
            loop: true,
        });

        gameBGMusic.play();



        comboStreakSound = this.sound.add('comboSound');
        comboStreakSound.volume = 0.5;
        //add boba group to physics group
        this.bobasGroup = this.physics.add.group();

        //determine tile size, different layout different size
        //initially 512, i change it to variable, more dynamic
        this.bobaSize = gameWidth / gameOption.columns; //need to change

        //number of rows then we have then each row we do an array
        for (let i = 0; i < gameOption.rows; i++) {

            //generate the row, will be using this number to spawn my tiles
            let values = Phaser.Utils.Array.NumberArray(0, 3);

            //then now we shuffle it to "random" the boba arrangement
            Phaser.Utils.Array.Shuffle(values);

            //taking note of the middle boba colour then we will spawn our player
            // make sure not same colour
            if (i == 0) {
                this.middleColour = values[Math.floor(gameOption.columns / 2)];
            }

            //placing of bobas
            for (let j = 0; j < gameOption.columns; j++) {
                let boba = this.bobasGroup.create(j * this.bobaSize, i * this.bobaSize + gameHeight / 4 * 3, "bobas", values[j]);
                //a function to adjust the sprite to set it's achor to the top left 0,0
                this.adjustBoba(boba);
            }

        }


        //now time to select for player
        //get random selected number first
        let values = Phaser.Utils.Array.NumberArray(0, 3);

        //then avoid using the same middle colour so we remove it from the array above
        values.splice(this.middleColour, 1);

        // x value is based on the middle boba pos, 
        //y is same arrange as of our group but we need to be one boba size higher than the group.for the boba choice, we will get from array minus the middle colour
        this.player = this.bobasGroup.create(this.bobaSize * Math.floor(gameOption.columns / 2), gameHeight / 4 * 3 - this.bobaSize, "bobas", Phaser.Utils.Array.GetRandom(values));
        //need to adjust player's origin as well
        this.adjustBoba(this.player);
        //move entire boba group up 
        //this.bobasGroup.setVelocityY(-gameOption.bobaSpeed); //need negative cause going up
        this.increaseBobaGroupSpeed();
        //player movement
        this.canMove = true;

        //is Matched?
        this.isMatched = false;

        //player Movement
        this.input.on("pointerdown", this.moveBoba, this);

    }

    adjustBoba(sprite) {
        sprite.setOrigin(0);

        sprite.displayWidth = this.bobaSize;
        sprite.heightWidth = this.bobaSize;
    }

    increaseBobaGroupSpeed() {
        if (score <= 500) {
            this.bobasGroup.setVelocityY(-gameOption.bobaSpeed);
        } else {
            let newSpeed = gameOption.bobaSpeed + Math.floor(score / 100);
            this.bobasGroup.setVelocityY(-newSpeed);
        }
    }

    muteBGMusic() {
        gameBGMusic.mute = !gameBGMusic.mute;
    }

    //method to move player
    moveBoba(pointer) {
        if (this.canMove) {
            //get where I am clicking
            //getting the column based on the boba size
            //e.g if 300 / 30 = 10 <-- column 10
            let column = Math.floor(pointer.x / this.bobaSize);
            //this.player.setX(column * this.bobaSize);
            //determine the distance between the mouse click and player distance
            //clicked colum * boba size will get the column x value, then minus player x, then we divide by boba size to get column to get x 
            let distance = Math.floor(Math.abs(column * this.bobaSize - this.player.x) / this.bobaSize);

            if (distance > 0) {
                this.canMove = false;
                this.tweens.add({
                    targets: [this.player],
                    x: column * this.bobaSize,
                    duration: distance * gameOption.playerSpeed,
                    callbackScope: this,
                    onComplete: function () {
                        // at the end of the tween, check for tile match
                        this.checkMatch();
                    }
                });

            }
        }
    }

    switchComboOff() {
        this.isCombo = !this.isCombo;
    }

    checkMatch() {
        // mid point of x, and mid point of y of below curr play, thats why mutiple 1.5
        // overlapRect will return an array of bodies that were overlap in the given area
        let bobaBelow = this.physics.overlapRect(this.player.x + this.bobaSize / 2, this.player.y + this.bobaSize * 1.5, 1, 1)
        this.canMove = true;

        //if using the same frame, means same colour
        if (bobaBelow[0].gameObject.frame == this.player.frame) {
            if (!this.isMatched) {
                score += 10;
                bobaSound.play();
            } else {
                score += 20;
                comboStreakSound.play();
                let comboText = this.make.text({
                    x: this.player.x,
                    y: this.player.y,
                    text: "+20",
                    scale: 1.5,
                })

                let comboTimer = this.time.addEvent({
                    delay: 500,                // ms
                    callback: function () {
                        comboText.destroy();
                    },
                    //args: [],
                    callbackScope: this,
                    loop: false,
                });

            }
            this.isMatched = true;
            scoreText.setText("score: " + score);
            //using this testRect to check and visualise the overlapReact
            // let testRect = this.add.rectangle(0, this.player.y + this.bobaSize * 1.5, 512, 1, 0x6666ff);
            let rowBelow = this.physics.overlapRect(0, this.player.y + this.bobaSize * 1.5, 512, 1);

            this.tweens.add({
                targets: [this.player],
                y: rowBelow[0].gameObject.y,
                duration: 100,
                callbackScope: this,
                onUpdate: function (tween, target) {
                    //update y as the tile is moving up
                    this.player.y = Math.min(this.player.y, bobaBelow[0].gameObject.y);
                },
                onComplete: function () {

                    //upon complete shift it down 
                    //get value
                    let values = Phaser.Utils.Array.NumberArray(0, gameOption.columns - 1);
                    //shuffle what's inside and setFrame
                    Phaser.Utils.Array.Shuffle(values);
                    for (let i = 0; i < gameOption.columns; i++) {
                        //assign new frame to this used frame
                        rowBelow[i].gameObject.setFrame(values[i]);
                        //shift it to all the way below
                        rowBelow[i].gameObject.y += this.bobaSize * gameOption.rows;
                    }
                    //check for match upon complete
                    this.checkMatch();



                }
            });
        } else {
            this.canMove = true;
            if (this.isMatched) {
                // no combo
                this.isMatched = false;

                //scan for colour below 
                let bobaBelow = this.physics.overlapRect(this.player.x + this.bobaSize / 2, this.player.y + this.bobaSize * 1.5, 1, 1);

                //get random number
                let values = Phaser.Utils.Array.NumberArray(0, gameOption.columns - 1);

                //removes the item that is currently below me so I won't get same colour as it
                values.splice(bobaBelow[0].gameObject.frame.name, 1);

                //change player frame
                this.player.setFrame(Phaser.Utils.Array.GetRandom(values));

            }
        }
    }

    // checkCombo() {
    //     let isComboTimer;
    //     if (!isCombo) {
    //         isCombo = true;
    //         isComboTimer = this.time.addEvent({
    //             delay: 500,                // ms
    //             callback: function () {
    //                 isCombo = false;
    //                 isComboTimer.loop = false;
    //             },
    //             //args: [],
    //             callbackScope: this,
    //             loop: false,
    //         });
    //     }
    //     if (isCombo && this.isMatched) {
    //         isComboTimer.loop = true;
    //     }
    // }
    getBobaBelow() {
        return this.physics.overlapRect(this.player.x + this.bobaSize / 2, this.player.y + this.bobaSize, 1, 1)
    }

    update() {

        this.increaseBobaGroupSpeed()
        let testingBoba = this.getBobaBelow();
        if (this.player.y <= 0) {
            gameBGMusic.destroy;
            this.scene.start("titlescreen");
        }

        if (this.player.y >= (gameHeight - this.bobaSize)) {
            let currentBelow = this.getBobaBelow();
            if (currentBelow[0]) {
                console.log("there is boba below");
                this.player.y = Math.min(this.player.y, currentBelow[0].gameObject.y);
                console.log(this.player.y);
            } else {
                console.log("no boba here");
                console.log(gameHeight - this.bobaSize);
            }
        }
    }
}

let buttonX = document.getElementById('buttonTest').addEventListener("click", () => {
    muteBGMusic();
});
// two issues at the moment
// drop too fast then out of the world, might need custom 
//but the way i pushing player up need to reconsider