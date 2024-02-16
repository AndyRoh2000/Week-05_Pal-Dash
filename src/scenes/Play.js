class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    
    init() {
        this.PLAYER_VELOCITY = 500
    }

    preload() {

        this.load.image('pal', './assets/rocket.png')
        this.load.image('starfield', './assets/Sunset.png')
        this.load.image('ball', './assets/spaceship.png')
        this.load.image('masterball', './assets/fastship.png' )
        this.load.spritesheet('runner','./assets/charactersprite_test.png', {
            frameWidth: 132,
            frameHeight: 144
        })

        this.load.audio('swosh','./assets/swosh.mp3')
        this.load.audio('pikasound','./assets/pikasound.mp3')
        this.load.audio('pokeball','./assets/pokeball.mp3')
        this.load.audio('done','./assets/sfx-explosion.wav')
        this.load.audio('normalball','./assets/hitball.mp3')
    
    }
    create() {

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        const scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
             backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 12,
                bottom: 12,
            },
            fixedWidth: 100
        }
        this.p1Score = 0;
        // display score
        
        this.scoreLeft = this.add.text(
            this.scale.width - borderUISize - borderPadding - scoreConfig.fixedWidth,
            borderUISize + borderPadding -45 , 
            this.p1Score,
            scoreConfig
        );
        this.scoreLeft.setDepth(1);

        const scoreLabelConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 12,
                bottom: 12,
            },
            fixedWidth: 100
        }
        this.scoreLabel = this.add.text(
            this.scale.width - borderPadding - borderUISize - scoreLabelConfig.fixedWidth - 70 ,
            borderPadding + borderUISize - 45  ,
            'Score:',
            scoreLabelConfig
        );
        this.scoreLabel.setDepth(1);

        this.scoreTimer = this.time.addEvent({
            delay: 1000, 
            callback: this.updateScore,
            callbackScope: this,
            loop: true
        });

    
        this.MBTimer = this.time.addEvent({
            delay: 5000 ,
            callback: this.spawnMB,
            callbackScope: this,
            loop: true
        });


        // Create a group to hold multiple balls
        this.balls = this.physics.add.group({
            key: 'ball',
            setXY: {
                x: game.config.width + 20, 
                y: Phaser.Math.Between(game.config.height/2, game.config.height - 50) 
            }
        });

        // Set up movement for each ball
        this.balls.children.iterate((ball) => {
            ball.setScale(1.5); 
            this.physics.world.enable(ball); 

            ball.body.setVelocityX(-600);
        });

        // Set up player sprite with physics
        this.player = this.physics.add.sprite(100, game.config.height, 'runner', 1).setScale(0.8);
        // this.player.setFlipX(false);
        this.physics.world.enable(this.player);

        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(90 ,70)

        cursors = this.input.keyboard.createCursorKeys();

        this.player.onGround = true;
        this.player.setGravityY(1000);
        this.player.setCollideWorldBounds(true);

        // Set up collisions
        this.checkCollision(this.player, this.balls)
            

        this.speedUpTimer = this.time.addEvent({
            delay: 10000 ,
            callback: this.speedUpEverything,
            callbackScope: this,
            loop: true
        });
    
        if (!this.anims.exists('idle-down')) {
            this.anims.create({
                key: 'idle-down',
                frameRate: 4,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('runner', {
                    start: 0,
                    end: 3
                })
            });
        }

        if (!this.anims.exists('jump')) {
            this.anims.create({
                key: 'jump',
                frameRate: 12,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('runner', {
                    start: 0,
                    end: 3
                })
            });
        }
    }


    update() {

        // Continuously scroll the background to the left
        this.starfield.tilePositionX += 3; 

        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        // Jumping logic
        if (cursors.up.isDown && this.player.onGround) {
            this.player.onGround = false; 
        
            // Create a jump tween
            this.tweens.add({
                targets: this.player,
                y: '-=' + this.game.config.height / 2,
                duration: 500, 
                ease: 'Power1',
                yoyo: true, 
                onComplete: () => {
                    this.player.onGround = true; // Allow jumping again once the tween is complete
                }
            });
        }

        // Check if player is touching the ground to reset the onGround flag
        if (this.player.body.touching.down) {
            this.player.onGround = true;
        }

 

        // Flip the sprite based on the direction
        this.player.setFlipX(true);

        playerVector.normalize()

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
    
        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true)
    
        // Check if any ball is off the left side of the screen
        this.balls.children.iterate((ball) => {
            if (ball.x < 0) {
                // Respawn the ball on the right side with a new random vertical position
                ball.x = game.config.width + 20; 
                ball.y = Phaser.Math.Between(game.config.height / 2, game.config.height - 50);
            }
        });
}

    // Function to spawn Master Ball
    spawnMB() {
        const safeVerticalPosition = Phaser.Math.Between(100, this.scale.height - 100);

        // Create Master Ball sprite
        const masterball = this.physics.add.sprite(this.scale.width + 50, safeVerticalPosition, 'masterball').setScale(2.5);

        this.physics.world.enable(masterball);


        masterball.body.setVelocityX(-800);

        masterball.body.setSize(masterball.width * 0.25, masterball.height * 0.5).setOffset(masterball.width * 0.2, masterball.height * 0.2);


        masterball.setOrigin(0, 0.5);
        masterball.setDepth(2);

        const pokeballSound = this.sound.add('pokeball');

        this.tweens.add({
            targets: masterball,
            x: '-=600', 
            y: '-=150', 
            ease: 'Linear',
            duration: 500,
            onComplete: () => {
                pokeballSound.play()
            }
        }); 

        this.physics.add.collider(masterball, this.player, this.gameOver, null, this );

        this.physics.add.collider(masterball, this.ceiling, this.destroymasterball, null, this);
    }

    // Function to destroy Master Ball when it goes off the left side of the screen
    destroymasterball(masterball) {
        masterball.destroy();
    }

    gameOver() {
        // Custom game over logic
        const pikapika = this.sound.add('pikasound');
        pikapika.play();
        this.scene.start('GameOver');
    }

    speedUpEverything() {
        // Increase the velocity of the player
        this.PLAYER_VELOCITY *= 1.3; 
    
        // Increase the velocity of balls
        this.balls.children.iterate((ball) => {
            ball.body.velocity.x *= 1.3;  
        });
    }

    updateScore() {
        this.p1Score += 100;
        this.scoreLeft.text = this.p1Score;
    }

    checkCollision(player, balls) {
        this.physics.add.collider(player, balls, (player, balls) => {
            const normalball = this.sound.add('normalball');
            normalball.play()

            this.gameOver()
        }, null, this)
    }

}