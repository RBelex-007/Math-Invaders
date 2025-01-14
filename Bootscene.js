// src/scenes/BootScene.js
export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load images
        this.load.image('player', 'space_inv_player.png');
        this.load.image('invader', 'space_inv_invader.png');
        this.load.image('bullet', 'space_inv_bullet.png');
        this.load.image('powerup', 'space_inv_pp.png');
        this.load.image('background', 'space_inv_gamebg.png');

        // Load sounds
        this.load.audio('shoot', 'assets/sounds/shoot.wav');
        this.load.audio('explosion', 'assets/sounds/explosion.wav');
        this.load.audio('powerup', 'assets/sounds/powerup.wav');
        this.load.audio('bgMusic', 'assets/sounds/bgMusic.mp3');
    }

    create() {
        this.scene.start('GameScene');
        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
    this.bgMusic.play();
    }
}
