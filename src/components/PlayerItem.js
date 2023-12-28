import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export default function PlayerItem(props) {

    const {position,prevposition,playerName,currentRating,prevRating,numGames,numTournaments} = props;

    var ratingChange = currentRating - prevRating;
    var signChange = Math.sign(ratingChange);
    var positionChange = prevposition-position;
    var signPositionChange = Math.sign(positionChange);

    return (
        <li className="players__item">

            <span className="players__position">

                <span className="position__current">
                    {position}
                </span>

                <span className="position__previous">
                    {positionChange === 0 ?
                    '-' :
                    signPositionChange === +1 ?
                    '+'
                    :
                    ''
                    }
                    {positionChange === 0 ?
                    '' :
                    positionChange
                    }
                </span>

            </span>

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