# tapioca-burst
Bubble lover's game

Url to Game Page
https://saetan.github.io/tapioca-burst/

## Development Overview

A game project using Phaser 3.
Try to survive as long as possible while accumlate more scores.


## Resource and Library

Library used:
Phaser 3 HTML Game Framework
https://photonstorm.github.io/phaser3-docs/index.html

Web application bundle: Parcel
https://parceljs.org/

gh-page package
https://www.npmjs.com/package/gh-pages


Resources Used in This Project:
https://photonstorm.github.io/phaser3-docs/index.html
https://newdocs.phaser.io/docs/3.55.2
https://medium.com/@junhongwang/getting-started-with-phaser-3-b015b26e97b6
https://ourcade.co/roadmaps/learning-phaser/

## Development overview
Game is mainly developed using phaser 3 framework.
It handles the logic, visual and gameplay.

At the end of each code implemntation, I have used parcel as my web bundler, this bundler will bundle everything up into a dist folder which consist of all the necessary resources to run the program on the web.

Then afterwards I have used a small package called gh-page, it will deploy my dist folder into a gh-page branch in my repository and github page can use that branch to deploy my game.

For this game, as I am using a framework that I have never used before, I refer to exisiting examples and tutorials, try and understand the code and their approach, and take the parts that I need and make it into mine.

## Main JS
The main js will be the first js file to be loaded, it will initiate and load the scene that will be used for the game, I have created a config.js file to store the configuration that will be used to when we init phaser 3 game. Initially I stored this configuration object in the main.js but afterwards I find it cleaner to place the configuration object into a seprate file. And the first scene that this scene will trigger will be the main menu screen

## Main Menu
This will have a background music and two text for player to interact, a play and leaderboard "button", technically they are both text that has setInteractive() to true for them. And when clicked, it will be trigger the scene switch function.

## Game Level
This is the main game level, the game level will consist of playing of background music function. Then we will create the size of the bobaCups based on the gameWidth and number of columns there is. So this will make sure each of the bobaCups are equally size. Using this way of measurement will ensure that the level and bobacup can be dynamically created.

A physic group is used to create the rows of boba that the player has to clear. This physic group can be thought of like an array but memebers in this array will be given dynamic body to it.

We will then create rows of bobas, and place them based on the given x coordinate, it is important to take note to adjust the origin of each individual boba, to set the origin to (0,0), think of this as an anchor point and the texture will be place based on that. Which mean if this is a square, it will be the top left hand corner. We will then spawn the player in the middle of the map, nearer to the first row of boba.

then set the velocity for the phyiscs group of it's Y axis to be negative, so it will move upwards. As all of them are in the same physics group, they will have the same behaviour.

So when the player and rows of boba cups are spawn, the game will listen for the mouseclick, when it is click, it will calculate the distance between the player cup and the pixel, so when this distance is still > 0, we will trigger the phaser's animation function Tweens. So for this tweens I can indicate the target that will be applied on and the destination, so it will move towards that location as long as the distance is still > 0. For this tween function, it has a onComplete function, so as the player has moved to the new boba location, we will check what boba cup is below us.

For the check if it is the same colour as us, we will drop it down, and during this time the whole row will be shifted down out of the map and reshuffled again. As for the player, it will gain a score and trigger isMatched to True and inCombo to true,

so when the next matching function, we will go into is combo when is it true and player will gain more scores. as of now the combo time is set to 500ms.

Upon landing, player will be changed to a new colour, and a check will have to ensure that the colour is not the same as the one that the player has just landed upon recently.

As for the diffculty, the game wil increase speed when the player achieve more than 500 points, and it will increase for every 100 point increase afterwards.

The game will end when the player hit the roof of the level.

As for the scoring system, it will be based of the local storage, at the end of the game, user will be prompt to enter 3 letter name and then upon enter it, the game will restart. And user can continue to play the game.

As for the leadership board, when the first time a user is playing, it will generate a dummy board as there will be no score for it to display. After playing for the first time it will show, when the user enter the leadership board. Scores are being retrieved from the localStorage.


# Project Post-Morterm

## The Ups

Using a framework allowed me to see how the creator implement and construct their code.

I really like the idea of passing in an object for the config, and the flexibility of passing in either an object or passing in the value straight away.

I also really like the idea of having a framework there for you, you can focus on the design and implementation of the game or project.




## The Downs

To be honest there is a slight regret after working on the project, because of the amount of research and study needed when approaching a new framework.

A lot of tutorials and examples are used to construct this project. It was done through looking at examples and tutorial code and understanding it and picking what I need off it.

I personally feel that I was quite restricted by the framework, but at the same time my mindset as well. Most part of the project I was stuck searching for solution through Phaser way, I should have been flexible and incoporate vanilla javascript as well.

## The Improvement to be done and Things to Reflect on

Implementation of features are quite on the go and not very well planned. Could have taken a step back and look at the project and code base as a whole and come out with a better design in terms of logic flow and interaction between classes and functions.

Dive deep into the framework first and understand the core feature of it. As of this project, I started off with my project and try out the project as I go.

Will remember to keep things simple and break big problems into a smaller, and simple individual issues and tackle from there. In this project, I am all over the place, chasing two rabbits at the same time and end up getting none.

# Updates ChangeLogs
## 7th Update
- redrawn my boba assets
- Changed background Colour
- Added background Colour
- Added a placeholder name if the leaderboard name is null
- Changed the window background colour through html
- Added stroke to the menu words


## 6th Update
- Updated readme
- Described project
- Updated retrospective as well

## 5th Update
-First time leadership board will generate dummy leadership board
-Enforce only can key in 3 letter name for leadership board


## 4th Update
-Remove a weird bug where i can still move while falling down
-Changed scoring system, using a timer to calculate combo, more skill based game.

## 3rd Update
-Added Leadershipboard
-Added setLocalStorage Logic
-Added getLocalStorage Logic
-Added Generate Leadershipboard list

## 2nd Update
- Added Menu Screen
- Added Switch Scene Function
- Added Play Button

## 1st Update
- Updated Readme with Updates
- Added sound for background, combo and normal clear
- Display combo text when combo occur
- Fixed a score bug, reset it zero when game scene restart.
- Game scene is now based on device width and height.
