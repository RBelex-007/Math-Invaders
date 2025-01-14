// src/main.js
import Phaser from 'phaser';
import BootScene from 'BootScene.js';
import GameScene from 'GameScene.js';
import UIScene from 'UIScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'game-container',
    scene: [BootScene, GameScene, UIScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);
