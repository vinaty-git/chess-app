import React from 'react';
import PlayerItem from './PlayerItem';
import playersJson from '../assets/players.json';
import tournamentsJson from '../assets/tournaments.json';

export default function PlayerList() {

    var playersArray = [];
    Object.keys(playersJson).forEach(function(key) {
      playersArray.push(playersJson[key]);
      console.log(tournamentsArray);
    });
    playersArray.sort((a, b) => a.ratings[a.ratings.length - 1].value - b.ratings[b.ratings.length - 1].value).reverse();

    var tournamentsArray = [];
    Object.keys(tournamentsJson).forEach(function(key) {
      tournamentsArray.push(tournamentsJson[key]);
    });
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