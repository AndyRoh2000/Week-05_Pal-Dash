class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }

    preload() {
        this.load.image('sadpika', './assets/sadpika.png');
    }

    create() {
        this.setupRestartKey();

        this.cameras.main.setBackgroundColor('#000000')
        const gameOverTextConfig = this.getTextConfig('50px');
        this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'Captured by the hunters!', gameOverTextConfig)
            .setOrigin(0.5)
            .setDepth(1)
        const playAgainTextConfig = this.getTextConfig('32px');
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Press SpaceBar to Play again!', playAgainTextConfig)
            .setOrigin(0.5)
            .setDepth(1);
        this.add.image(this.scale.width / 2, this.scale.height / 2 + 120, 'sadpika')
            .setOrigin(0.5)
            .setDepth(1)
            .setScale(2.5);
        
    }


    getTextConfig(fontSize) {
        return {
            fontFamily: 'Courier',
            fontSize,
            color: '#e8d969',
            align: 'center',
            wordWrap: { width: this.game.config.width, useAdvancedWrap: true },
            padding: {
                top: 10,
                bottom: 10,
            },
        };
    }

    setupRestartKey() {
        const startSound = this.sound.add('start', { volume: 1 });
        this.input.keyboard.on('keydown-SPACE', () => {
            startSound.play();
            this.scene.start('menuScene');
        });
    }
}
