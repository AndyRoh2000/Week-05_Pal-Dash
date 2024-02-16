class Menu extends Phaser.Scene {
    // Constructor to set scene key and initialize variables.
    constructor() {
        super("menuScene"); // Setting a unique key for this scene.
        this.isMusicPlaying = false; // Flag to track music playback state.
    }

    // Preload method to load assets before the scene is created.
    preload() {
        // Load visual and audio assets for the menu.
        this.load.image('rocket', './assets/rocket.png')
        this.load.audio('backgroundMusic', './assets/loopmusic.mp3')
        this.load.audio('start', './assets/sfx-shot.wav')
    }

    // Create method to set up the scene once assets are loaded.
    create() {
        // Configuration for the text styles used in the menu.
        const textStyle = {
            fontFamily: 'Courier',
            fontSize: '30px',
            backgroundColor: '#0CA081',
            color: '#e8d969',
            align: 'center',
            padding: { top: 5, bottom: 5 },
            fixedWidth: 0
        }

        const creditStyle = {
            fontFamily: 'Courier',
            fontSize: '16px',
            backgroundColor: '#0CA081',
            color: '#e8d969',
            align: 'center',
            padding: { top: 5, bottom: 5 },
            fixedWidth: 0
        }

        // Create a sound instance for the start action.
        const startSound = this.sound.add('start', { volume: 1 })

        // Display the rocket image at a specific position and scale it.
        const rocketImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height * 0.75, 'rocket')
            .setOrigin(0.5, 1)
            .setScale(2)

        // Displaying the game title and instructions using the text style.
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'Pal Dash', textStyle).setOrigin(0.5)
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 250, 'Press Space to Start', textStyle).setOrigin(0.5)
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 80, 'Credits: Image assets made by Gyungmin Roh \n (inspired by pokemon but made by myself, \nsprites are similar images for potential copyright issues) \n https://cf-media.sndcdn.com for the looping music\nhttps://www.myinstants.com/en/instant/pokeball-catch/ for the sfx', creditStyle).setOrigin(0.5)

        // Listening for the spacebar key press to start the game.
        this.input.keyboard.on('keydown-SPACE', () => {
            startSound.play(); 
            this.scene.start('RuleScene'); 
        });

        // Play background music if it's not already playing.
        if (!this.isMusicPlaying) {
            const backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 0.25 });
            backgroundMusic.play();
            this.isMusicPlaying = true;
        }
    }

    update() {
        
    }
}
