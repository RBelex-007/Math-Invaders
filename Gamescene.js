// src/scenes/GameScene.js
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Add background
        this.add.tileSprite(400, 300, 800, 600, 'background');

        // Add player
        this.player = this.physics.add.sprite(400, 550, 'player').setCollideWorldBounds(true);

        // Create bullets group
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10,
        });

        // Create invaders group
        this.invaders = this.physics.add.group({
            key: 'invader',
            repeat: 10,
            setXY: { x: 50, y: 50, stepX: 70 },
        });

        // Set invader properties
        this.invaders.children.iterate((child) => {
            child.setBounce(1);
            child.setCollideWorldBounds(true);
            child.setVelocity(Phaser.Math.Between(-100, 100), 20);
        });

        // Set up input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Initialize score and lives
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameOverFlag = false;

        // Display score and lives
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#ffffff' });
        this.livesText = this.add.text(700, 16, 'Lives: 3', { fontSize: '20px', fill: '#ffffff' });
        this.levelText = this.add.text(16, 40, 'Level: 1', { fontSize: '20px', fill: '#ffffff' });


        // Collision between bullets and invaders
        this.physics.add.overlap(this.bullets, this.invaders, this.hitInvader, null, this);
        
        this.level = 1;
        this.levelText = this.add.text(16, 40, 'Level: 1', { fontSize: '20px', fill: '#ffffff' });
    
        // In GameScene.js create()
        this.powerUps = this.physics.add.group();

        // Handle collision between player and power-ups
        this.physics.add.overlap(this.player, this.powerUps, this.collectPowerUp, null, this);

        this.explosionParticles = this.add.particles('explosion');

        this.explosionEmitter = this.explosionParticles.createEmitter({
            speed: { min: -100, max: 100 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        lifespan: 500,
        });

    }

    // Method to spawn power-up
    spawnPowerUp(x, y){
        const powerUp = this.powerUps.create(x, y, 'powerup');
        powerUp.setVelocityY(100);
    }

    collectPowerUp(player, powerUp) {
        powerUp.destroy();
        this.sound.play('powerup');
    
        // Apply power-up effect
        this.activatePowerUp('shield'); // Example
    }
    
    activatePowerUp(type) {
        switch (type) {
            case 'shield':
                // Implement shield logic
                break;
            case 'rapidFire':
                // Implement rapid fire logic
                break;
            case 'multiShot':
                // Implement multi-shot logic
                break;
        }
        if (type === 'shield') {
            this.player.setTint(0x00ff00);
            this.player.invincible = true;
    
            this.time.delayedCall(5000, () => {
                this.player.clearTint();
                this.player.invincible = false;
            }, [], this);
        }
    }    

    update() {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        } else {
            this.player.setVelocityX(0);
        }

        // Shooting
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.shootBullet();
        }

        // Check if invaders reach the bottom
        this.invaders.children.iterate((child) => {
            if (child.y >= 550) {
                this.gameOver();
            }
        });

        if (this.score >= this.level * 100) {
            this.level++;
            this.levelText.setText('Level: ' + this.level);
            this.invaders.children.iterate((child) => {
                child.setVelocityY(child.body.velocity.y + 20);
            });
        }
    }

    shootBullet() {
        const bullet = this.bullets.get(this.player.x, this.player.y - 20);

        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = -300;
            this.sound.play('shoot');
        }
    }

    hitInvader(bullet, invader) {
        bullet.destroy();
        invader.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        this.explosionEmitter.emitParticleAt(invader.x, invader.y);
        this.sound.play('explosion');

        // Trigger math problem
        this.scene.launch('UIScene', { invader: invader });
    }

    gameOver() {
        if (this.player.invincible) return; // Ignore if player is invincible
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.lives -= 1;
        this.livesText.setText('Lives: ' + this.lives);

        if (this.gameOverFlag) return;
        this.gameOverFlag = true;
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.add.text(400, 300, 'GAME OVER', { fontSize: '40px', fill: '#ff0000' }).setOrigin(0.5);
        this.sound.play('explosion');
        // Optionally, add a restart button

        this.input.once('pointerdown', () => {
            this.scene.restart();
        });

        if (this.lives <= 0) {
            this.add.text(400, 300, 'GAME OVER', { fontSize: '40px', fill: '#ff0000' }).setOrigin(0.5);
            this.sound.play('explosion');
            this.scene.pause();
        } else {
            this.scene.restart();
        }
    }
}
