import Phaser, { GameObjects, Scene } from "phaser";
import bobasSpriteSheet from '../../public/assets/bobas.png'

let gameOption = {
    columns: 4,
    rows: 20,
    bobaSpeed: 200
}


export default class TitleScreen extends Phaser.Scene {

    preload() {

        //import the boba photo
        this.load.spritesheet('bobas', bobasSpriteSheet, {
            frameWidth: 128,
            frameHeight: 128
        });



    }
    create() {

        //add boba group to physics group
        this.bobasGroup = this.physics.add.group();

        //determine tile size, different layout different size
        this.bobaSize = 512 / gameOption.columns; //need to change

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
                let boba = this.bobasGroup.create(j * this.bobaSize, i * this.bobaSize + 1024 / 4 * 3, "bobas", values[j]);

                //a function to adjust the sprite to set it's achor to the top left 0,0
                this.adjustBoba(boba);
            }
        }


        //now time to select for player
        //get random selected number first
        let values = Phaser.Utils.Array.NumberArray(0, 3);

        //then avoid using the same middle colour so we remove it from the array above
        values.splice(this.middleColour, 1);
        console.log(this.middleColour);

        // x value is based on the middle boba pos, 
        //y is same arrange as of our group but we need to be one boba size higher than the group.for the boba choice, we will get from array minus the middle colour
        this.player = this.bobasGroup.create(this.bobaSize * Math.floor(gameOption.columns / 2), 1024 / 4 * 3 - this.bobaSize, "bobas", Phaser.Utils.Array.GetRandom(values));

        //need to adjust player's origin as well
        this.adjustBoba(this.player);

        //move entire boba group up 
        //this.bobasGroup.setVelocityY(-gameOption.bobaSpeed); //need negative cause going up
        //player movement
        this.canMove = true;

        //is Matched?
        this.isMatched = false;

        //player Movement
        this.input.on("pointerdown", this.moveBoba, this);
        this.input.on("pointerdown", this.moveBobasGroup, this);
    }

    adjustBoba(sprite) {
        sprite.setOrigin(0);

        sprite.displayWidth = this.bobaSize;
        sprite.heightWidth = this.bobaSize;
    }

    moveBobasGroup() {
        this.bobasGroup.incY(-this.bobaSize);
    }

    //method to move player
    moveBoba(pointer) {
        if (this.canMove) {
            //get where I am clicking

            //getting the column based on the boba size
            //e.g if 300 / 30 = 10 <-- column 10
            let column = Math.floor(pointer.x / this.bobaSize);
            this.player.setX(column * this.bobaSize);
            //determine the distance between the mouse click and 
        }
    }
}
