export const config = {
    width: 512,
    height: window.innerHeight,
    type: Phaser.AUTO,
    //autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    backgroundColor: "#957DAD",
}