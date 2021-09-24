export const config = {
    width: 512,
    height: window.innerHeight,
    type: Phaser.AUTO,
    //autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}