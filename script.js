const { default: SlippiGame } = require('@slippi/slippi-js');

const player="cacta";
var wins=0;
var gamesTotal=0;


var folder="slippiFiles";

var fs=require('fs');
var path=require('path');
var game;

const charList=['Captain Falcon', 'Donkey Kong', 'Fox', 'Mr. Game & Watch', 'Kirby', 'Bowser',
    'Link', 'Luigi', 'Mario', 'Marth', 'Mewtwo', 'Ness', 'Peach', 'Pikachu',
    'Ice Climbers', 'Jigglypuff', 'Samus', 'Yoshi', 'Zelda', 'Sheik', 'Falco',
    'Young Link', 'Dr. Mario', 'Roy', 'Pichu', 'Ganondorf'];


const stageList = [null, null, 'Fountain of Dreams', 'Pokémon Stadium', "Princess Peach's Castle", 'Kongo Jungle',
    'Brinstar', 'Corneria', "Yoshi's Story", 'Onett', 'Mute City', 'Rainbow Cruise', 'Jungle Japes',
    'Great Bay', 'Hyrule Temple', 'Brinstar Depths', "Yoshi's Island", 'Green Greens', 'Fourside',
    'Mushroom Kingdom I', 'Mushroom Kingdom II', null, 'Venom', 'Poké Floats', 'Big Blue', 'Icicle Mountain',
    'Icetop', 'Flat Zone', 'Dream Land N64', "Yoshi's Island N64", 'Kongo Jungle N64', 'Battlefield', 'Final Destination']


var playerCharWinrate=new Array(26);
var stageWinrate=new Array(stageList.length);


for(i=0;i<26;i++){
    playerCharWinrate[i]={wins:0, games: 0};
}
for(i=0;i<stageList.length;i++){
    stageWinrate[i]={wins:0, games: 0};
}



//Things to implement
//Map winrrates
//Vs Player winrates
//Vs Character winrates


fs.readdir(folder, (err, files) => {
    files.forEach(
        function (file){


            var playerIndex;
            game = new SlippiGame("slippiFiles/"+file);

            console.log("Reading Game At: " + game.getMetadata().startAt);
            if(game.getMetadata().players[0].names.netplay==player){
                playerIndex=0;
            }
            else{
                playerIndex=1;
            }

            //console.log(game.getStats().overall[playerIndex].killCount);
            if( game.getStats().overall[playerIndex].killCount==4){
                wins++;
                playerCharWinrate[game.getSettings().players[playerIndex].characterId].wins++;
                stageWinrate[game.getSettings().stageId].wins++;
            }
            //Need something here to catch games that didn't complete

            gamesTotal++;
            playerCharWinrate[game.getSettings().players[playerIndex].characterId].games++;
            stageWinrate[game.getSettings().stageId].games++;





            //console.log(charList[game.getSettings().players[playerIndex].characterId]);



        }
    );

    console.log((wins/gamesTotal)*100 +"% Winrate for " + player);

    for(i=0;i<26;i++){
        if( playerCharWinrate[i].games!=0){
            console.log((playerCharWinrate[i].wins/playerCharWinrate[i].games)*100 +"% winrate for " + charList[i]);
        }
    }

    for(i=0;i<stageList.length;i++){
        if( stageWinrate[i].games!=0){
            console.log((stageWinrate[i].wins/stageWinrate[i].games)*100 +"% winrate on " + stageList[i]);
        }
    }

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
