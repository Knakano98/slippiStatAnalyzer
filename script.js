const { default: SlippiGame } = require('@slippi/slippi-js');

const player="cacta";
var wins=0;
var gamesTotal=0;


var folder="slippiFiles";

var fs=require('fs');
var path=require('path');
var game;


fs.readdir(folder, (err, files) => {
    files.forEach(
        function (file){
            var playerIndex;
            game = new SlippiGame("slippiFiles/"+file);
            if(game.getMetadata().players[0].names.netplay==player){
                playerIndex=0;
            }
            else{
                playerIndex=1;
            }

            console.log(game.getStats().overall[playerIndex].killCount);
            if( game.getStats().overall[playerIndex].killCount==4){
                wins++;
            }

            gamesTotal++;

            //console.log(game.getMetadata().players[playerIndex].names.netplay);
        }
    );

    console.log((wins/gamesTotal)*100 +"% Winrate for " + player);

})






//TODO
//Want this to be a webapp
//Want to be able to upload slippi files, and process info and display them graphically


//1. How to reorganize data for easier consumption
//2. Read from several slippi files
//3. Overall win percentage, win percentage against characters, win percentage against , stage winrate
    //Read player index and find character/name for each player
    //Find who has killcount:4 at end of game


//Use Cases:
//1. Winrate against various characters
//2. Winrate against players
//3. Stats according to matchup: (ex: Most used kill move against char, killed most by move according to char, etc)

//Structure:
//JS Backedn
