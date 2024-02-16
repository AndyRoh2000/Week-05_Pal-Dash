class Rule extends Phaser.Scene {
    constructor() {
        super({ key: "RuleScene" }) 
    }

    preload() {
        this.load.image('backgroundSunset', './assets/Sunset.png') 
    }


    create() {
        // Displaying the sunset background image.
        this.background = this.add.tileSprite(0, 0, 800, 600, 'backgroundSunset').setOrigin(0, 0)

        // Rule description text for the player's role and challenge.
        const storyDescription = "You are now Pal monster, \n\nThe hunters are trying to catch you. \n\nStay away from those balls"
        this.add.text(this.sys.game.config.width / 2 + 50, 50, storyDescription, {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#e8d969',
            align: 'left',
            // wordWrap: { width: this.sys.game.config.width - 100, useAdvancedWrap: true },
            wordWrap: { width: game.config.width - 420, useAdvancedWrap: true },
            backgroundColor: '#682f03',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        })

        // Instructions for how to play the game.
        const instructions = "How to Play:\n\nClick up arrow to make the pal jump\n\nRun as hard as you can to dodge them balls"
        this.add.text(50, 50, instructions, {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#e8d969',
            align: 'left',
            wordWrap: { width: this.sys.game.config.width / 2 - 100, useAdvancedWrap: true },
            backgroundColor: '#682f03',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        })

        // Prompt to start the game.
        const startPrompt = "Hit space to start running"
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 50, startPrompt, {
            fontFamily: 'Courier',
            fontSize: '35px',
            color: '#e8d969',
            align: 'center',
            backgroundColor: '#682f03',
            wordWrap: { width: this.sys.game.config.width / 2, useAdvancedWrap: true },
        }).setOrigin(0.5)

        // Load and configure the start game sound effect.
        const startGameSound = this.sound.add('start', { volume: 1 })

        // Listening for spacebar press to start the game.
        this.input.keyboard.on('keydown-SPACE', () => {
            startGameSound.play() 
            this.scene.start('playScene')
        })
    }

    update() {

    }
}
