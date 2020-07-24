# SEI-PROJECT-1
General Assembly project 1

CURRENT PROJECT - PAC-MAN VARIANT - 6 days.
----------------------------------

Brief - Create a Pac-man game with the following minimum requirements: 
## Requirements

* The player should be able to clear at least one board
* The player's score should be displayed at the end of the game

# Current Progress towards goal:

* Player can currently clear one board, complete.
* Player's score is displayed in sidebar, complete.
* MVP complete
* Bonus goal of local storage high score added
* Bonus goal of limited spawn time star added (extra points)
* Sound effects for enemy death, get item, get powerup, get bonus, player death and game win added. 
* BGM added with a 'no music' option


# About this version and changes to original concept:

* THEME CHANGE: This is a Pokemon themed Pac-Man style game where Pikachu avoids enemy pokemon while attempting to consume every apple and score bonus points by eliminating enemies after grabbing pokeballs. Consuming every apple is the winning condition. Bonus points can be attained by grabbing limited spawn time stars from the middle of the maze.

* ENEMY CHANGE: Rather than enemies turning into disembodied eyes and running to the center for respawn, upon defeat they despawn and an egg appears in the middle of the screen, hatching after five seconds with the regenerated pokemon. This uses setTimeout.

* ASSETS SOURCE: The game has music and sound effects from Pokemon Sword and Shield, as well as several free sound library effects and free game tiles. Animated gifs of various pokemon from around the web were used to populate the game.

# Known bugs / issues

* The player can sometimes pass through enemies when powered up, without eliminating them. This happens infrequently and only when the movement keys are held down. Have implemented collision logic on npc and player side to minimise as much as possible.

# Possible future additions

* better maze graphics for less of a tiled effect
* a 'mute all audio' option
* a 'pause game' button
* more maze configurations and other difficulty levels