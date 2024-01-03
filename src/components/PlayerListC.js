import React, { useState, useEffect } from 'react';
import PlayerItem from './PlayerItem';
import playersJson from '../assets/players.json';
import tournamentsJson from '../assets/tournaments.json';

export default function PlayerList() {

    const [prevRatings, setPrevRatings] = useState([]); // After Load of the table set previuos ratings to Array
    const [allPlayersState,setAllPlayersState] = useState([]);

    ////\\\\////\\\\////\\\\////\\\\////\\\\/
    ////\\\ PREPARE ARRAY OF PLAYERS //\\\\//
    ////\\\\////\\\\////\\\\////\\\\////\\\\/

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

    // Calculate number of the player games to exclude player with < 10 games
    function calcGames(output,playerNameCalc) {
      var counterGames = 0;
      var tournament;

      for (let i = 0; i < tournamentsArray.length; i++) {
        tournament = tournamentsArray[i].games;

        for (let i_t = 0; i_t < tournament?.length; i_t++) {

          var player1 = tournament[i_t].player1;
          var player2 = tournament[i_t].player2;
          if ((player1 === playerNameCalc) || (player2 === playerNameCalc)) {
            // Overall games
            counterGames += 1;

          }
        }
      }
      if (output === 'games') {
        return (counterGames);
      }
    }

    ////\\\\////\\\\////\\\\////\\\\////\\\\/
    ////\\\\////\\ Core calc  //\\\\///\\\\//
    ////\\\\////\\\\////\\\\////\\\\////\\\\/

    useEffect(()=>{

      var playerName = '';
      var counterGames = 0;
      var counterTotalWhite = 0;
      var counterTotalBlack = 0;
      var counterWhiteWins = 0;
      var counterBlackWins = 0;
      var counterWhiteDraws = 0;
      var counterBlackDraws = 0;
      var counterTournaments = 0;
      var tournament;
      var playerObj = {};
      var tempArrayPlayers = [];

      // Iteration for each player
      for (let i_m = 0; i_m < playersArray.length; i_m++) {

        playerName = playersArray[i_m].name;
        counterGames = 0;
        counterTotalWhite = 0;
        counterTotalBlack = 0;
        counterWhiteWins = 0;
        counterBlackWins = 0;
        counterWhiteDraws = 0;
        counterBlackDraws = 0;
        counterTournaments = 0;
        playerObj = {};

        // Iteration of each tournament for each player
        for (let i = 0; i < tournamentsArray.length; i++) {
          tournament = tournamentsArray[i].games;
  
          var newIteration = true;

          // Iteration of each game
          for (let i_t = 0; i_t < tournament?.length; i_t++) {
  
            var player1 = tournament[i_t].player1;
            var player2 = tournament[i_t].player2;
            if ((player1 === playerName) || (player2 === playerName)) {
              // Overall games
              counterGames += 1;
  
              // Player played White
              if (player1 === playerName) {
                counterTotalWhite += 1;
                //Player wins
                if (tournament[i_t].result === 1) {
                  counterWhiteWins += 1;
                } else if (tournament[i_t].result === 0.5) {
                  counterWhiteDraws += 1;
                }
              }
              // Player played Black
              if (player2 === playerName) {
                counterTotalBlack += 1;
                //Player wins
                if (tournament[i_t].result === 0) {
                  counterBlackWins += 1;
                } else if (tournament[i_t].result === 0.5) {
                  counterBlackDraws += 1;
                }
              }
  
              if (newIteration) {
                counterTournaments += 1;
                newIteration = false;
              }
            }
          }
        }

        playerObj = {
            'player_name': playerName,
            'all_games': counterGames,
            'all_tournaments': counterTournaments,
            'all_whites': counterTotalWhite,
            'all_blacks': counterTotalBlack,
            'wins_white': counterWhiteWins,
            'draw_white': counterWhiteDraws,
            'wins_black': counterBlackWins,
            'draw_black': counterBlackDraws,
        }
        tempArrayPlayers.push(playerObj);
      }
      
      setAllPlayersState(tempArrayPlayers);

    },[]);

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
            <a className="players__position-current-h">#</a>
            <a className="players__position-previous-h"></a>
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
            <span>Games /</span>
            <span>Tourn.</span>
          </span>

          <span className="players__wins-h">
            Wins
          </span>

          <span className="players__opener">
            
          </span>

        </div>

        <ul className="players__list">

          {playersArray.map((item,index)=>{

            var currentRating = Math.floor(item.ratings[item.ratings.length - 1].value);
            var prevRating = Math.floor(item.ratings[item.ratings.length - 2].value);
            var playerObject = {};

            for(let i = 0; i < allPlayersState.length; i++) {
              if (allPlayersState[i].player_name === item.name) {
                playerObject = allPlayersState[i];
              }
              
            }

            return(

              <PlayerItem
                key={index}
                position={index+1}
                prevposition={findPrevPosition(item.name)}
                currentRating={currentRating}
                prevRating={prevRating}
                playerObject={playerObject}
              />);

          })}

        </ul>
        
      </div>

    );
}