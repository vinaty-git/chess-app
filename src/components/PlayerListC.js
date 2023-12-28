import React, { useState, useEffect } from 'react';
import PlayerItem from './PlayerItem';
import playersJson from '../assets/players.json';
import tournamentsJson from '../assets/tournaments.json';

export default function PlayerList() {

    const [prevRatings, setPrevRatings] = useState([]); // After Load of the table set previuos ratings to Array
    
    var tournamentsArray = [];
    Object.keys(tournamentsJson).forEach(function(key) {
      tournamentsArray.push(tournamentsJson[key]);
    });

    var playersArray = [];
    var numberOfGames = 0;
    Object.keys(playersJson).forEach(function(key) {
      var tempPlayer = playersJson[key];
      numberOfGames = calcGames('games',tempPlayer.name);
      if (tempPlayer.ratings[tempPlayer.ratings.length - 1].rd < 140 && numberOfGames > 9){
        playersArray.push(playersJson[key]);
      }
    });

    playersArray.sort((a, b) => a.ratings[a.ratings.length - 1].value - b.ratings[b.ratings.length - 1].value).reverse();

    // Calculate number of the player games
    function calcGames(output,playerName) {
      var counterGames = 0;
      var counterTournaments = 0;

      for (let i = 0; i < tournamentsArray.length; i++) {
        var tournament = tournamentsArray[i].games;

        var newIteration = true;
        for (let i_t = 0; i_t < tournament?.length; i_t++) {
          var player1 = tournament[i_t].player1;
          var player2 = tournament[i_t].player2;
          if ((player1 || player2) == playerName) {
            counterGames += 1;
            if (newIteration) {
              counterTournaments += 1;
              newIteration = false;
            }
          }
        }
      }
      if (output === 'games') {
        return(counterGames);
      } else if (output === 'tournaments') {
        return(counterTournaments);
      }
    }

    // Find previous ratings
    var pR = [];
    var tempRatings = [];
    var playerPrevRating;

    // Takes all prevoius ratings and push it to array
    function CallPrevPosition() {
      for(let i_p = 0; i_p < playersArray.length;i_p++ ) {
        pR = playersArray[i_p]?.ratings; // All ratings of player i 
        playerPrevRating = {'name':playersArray[i_p].name, 'previous':pR[pR.length-2].value};
        tempRatings.push(playerPrevRating);
      }
      tempRatings.sort((a, b) => a.previous - b.previous).reverse();
    }
    CallPrevPosition();

    useEffect(()=>{
      setPrevRatings(tempRatings);
    },[]);

    // Find previous player position
    function findPrevPosition(inputName) {
      var prevPosition = prevRatings.findIndex(p => p.name == inputName) + 1;
      return(prevPosition);
    }

    return (

      <div className="players">

        <div className="players__headings">

          <span className="players__position-h">
            #
          </span>

          <span className="players__name-h">
            Name
          </span>

          <span className="players__rating-h">
            Rating
          </span>

          <span className="players__change-h">
            Change
          </span>

          <span className="players__games-h">
            Games
          </span>

          <span className="players__tournaments-h">
            Tournaments
          </span>

        </div>

        <ul className="players__list">

          {playersArray.map((item,index)=>{

            var currentRating = Math.floor(item.ratings[item.ratings.length - 1].value);
            var prevRating = Math.floor(item.ratings[item.ratings.length - 2].value);
            var numGames = calcGames('games',item.name);
            var numTournaments = calcGames('tournaments',item.name);

            
            return(

              <PlayerItem
                key={index}
                position={index+1}
                prevposition={findPrevPosition(item.name)}
                playerName={item.name}
                currentRating={currentRating}
                prevRating={prevRating}
                numGames={numGames}
                numTournaments={numTournaments}
              />);

          })}

        </ul>
        
      </div>

    );
}