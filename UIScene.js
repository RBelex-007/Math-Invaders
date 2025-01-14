// src/scenes/UIScene.js
import { generateMathProblem } from 'mathProb.js';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    init(data) {
        this.invader = data.invader;
    }

    create() {
        // Pause the game scene
        this.scene.pause('GameScene');

        // Generate math problem
        const mathProblem = generateMathProblem();
        this.currentAnswer = mathProblem.answer;

        // Display math problem overlay
        this.overlay = this.add.rectangle(400, 300, 600, 400, 0x000000, 0.8);
        this.questionText = this.add.text(400, 250, mathProblem.question, { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        this.answerInput = this.add.dom(400, 350, 'input', {
            type: 'text',
            name: 'answer',
            placeholder: 'Enter your answer',
            style: 'width: 200px; height: 40px; font-size: 24px; text-align: center;',
        });

        this.submitButton = this.add.text(400, 420, 'Submit', { fontSize: '24px', fill: '#00ff00' }).setOrigin(0.5).setInteractive();

        this.submitButton.on('pointerdown', () => {
            const answer = this.answerInput.getChildByName('answer').value;
            this.checkAnswer(answer);
        });
    }

    checkAnswer(answer) {
        if (parseInt(answer) === this.currentAnswer) {
            this.scene.get('GameScene').score += 20;
            this.scene.get('GameScene').scoreText.setText('Score: ' + this.scene.get('GameScene').score);
            this.scene.get('GameScene').sound.play('powerup');
            this.spawnPowerUp(this.invader.x, this.invader.y);
            // Implement power-up logic here
        } else {
            this.scene.get('GameScene').lives -= 1;
            this.scene.get('GameScene').livesText.setText('Lives: ' + this.scene.get('GameScene').lives);
            this.scene.get('GameScene').sound.play('explosion');
            if (this.scene.get('GameScene').lives <= 0) {
                this.scene.get('GameScene').gameOver();
            }
        }

        this.closeOverlay();
    }

    closeOverlay() {
        this.overlay.destroy();
        this.questionText.destroy();
        this.answerInput.destroy();
        this.submitButton.destroy();

        // Resume the game scene
        this.scene.resume('GameScene');
    }
}
