import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export default function PlayerItem(props) {

    const {position,playerName,currentRating,prevRating,numGames,numTournaments} = props;

    var ratingChange = currentRating - prevRating;
    var signChange = Math.sign(ratingChange);

    return (
        <li className="players__item">

            <span className="players__position">{position}</span>

            <span className="players__name">{playerName}</span>
            
            <span className="players__rating">{currentRating}</span>

            <span className="players__change">
                {signChange === 1 ?
                <TrendingUpIcon className="icon icon--green"/> :
                signChange === -1 ?
                <TrendingDownIcon className="icon icon--red"/>
                :
                <TrendingFlatIcon className="icon icon--neutral"/>
                }
                <span>{ratingChange}</span>
            </span>

            <span className="players__games">
                {numGames}
            </span>

            <span className="players__tournaments">
                {numTournaments}
            </span>
            
        </li>
    );
}