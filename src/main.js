// Name: Gyungmin Roh
// Date: 08 FEB 2024
// Title: Pal Dash
// Project time: 30 hours


/*---------------------------------------
//CREATIVE TILT//


Pokemon was my favourite game growing up, starting the 2nd gen. 
I always loved it and now I am glad I can recreate one of the mini games 
that pokemon has. I made the pikachu sprite from scratch (littel reference from the internet)
and I made a sprite sheet for the runner, trying not to make the exact pikachu but similar enough.

I am proud of the royalty free music files and all the sfxs I could put together from the old game, and the design of the character along the sprite

I think the movement of the masterball, the small and fast, harder to dodge object is quite interesting.
I personally had a hard time implementing the jump function to fall back naturally without any hiccups.

Also animation was definitely not my expertise, I have about ZERO artisitc touch so I made proud that I could look throught the class materials and figure out how to implement differne animations with different keys.

------------------------------------------*/

"use strict"


let config = {
    type: Phaser.AUTO,
    height: 480,
    width: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play, GameOver, Rule ]
}

let cursors
let game = new Phaser.Game(config);

let { height, width } = game.config


// SET US constructions
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3



// Project Requirements:
// [X] Use multiple Scene classes (dictated by your game's style) (1)
// [X] Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
// [X] Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
// [X] Have some form of player input/control appropriate to your game design (1)
// [X] Include one or more animated characters that use a texture atlas* (1)
// [X] Simulate scrolling with a tileSprite (or equivalent means) (1)
// [X] Implement proper collision detection (via Arcade Physics or a custom routine) (1)
// [X] Have looping background music* (1)
// [ ] Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
// [X] Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
// [X] Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
// [X] Be theoretically endless (1)
// [X] Be playable for at least 15 seconds for a new player of low to moderate skill (1)
// [X] Run without significant crashes or errors (1)
// [ ] Include in-game credits for all roles, assets, music, etc. (1)