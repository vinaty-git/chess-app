import React, {useState} from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessBoard,faChessKnight,faChartPie } from '@fortawesome/free-solid-svg-icons'
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';

export default function PlayerItem(props) {

    const {
        position,
        prevposition,
        currentRating,
        prevRating,
        playerObject
    } = props;

    const [openInfo,setOpenInfo] = useState(false);

    var ratingChange = currentRating - prevRating;
    var signChange = Math.sign(ratingChange);
    var positionChange = prevposition-position;
    var signPositionChange = Math.sign(positionChange);
    var percentVictories = playerObject.player_name === 'Шакира'
        ? 13.37
        : (((playerObject.wins_black + playerObject.wins_white) / playerObject.all_games)*100).toFixed(2);
    var whiteLost = playerObject.all_whites-(playerObject.draw_white+playerObject.wins_white);
    var blackLost = playerObject.all_blacks-(playerObject.draw_black+playerObject.wins_black);
    var title = chooseTitle();
    
    function chooseTitle() {
        var male_titles = ['CM', 'FM', 'IM', 'GM'];
        var female_titles = ['WCM', 'WFM', 'CM', 'WIM', 'FM', 'WGM', 'IM', 'GM'];

        var isFemale = ['Полина', 'Айта', 'Юля', 'Маша'].includes(playerObject.player_name);
        var titles = isFemale ? female_titles : male_titles;

        if (playerObject.player_name === 'Шакира') {
            return 'WIM';
        }

        var ratingFloor = 800;
        var ratingCeiling = 2100;

        var median = (currentRating - ratingFloor) / (ratingCeiling - ratingFloor);

        function randn_bm() {
            var u = 0, v = 0;
            while (u === 0) u = Math.random();
            while (v === 0) v = Math.random();
            var num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            num = num / 10.0 + median;
            if (num > 1 || num < 0) return randn_bm();
            return num;
        }

        var rand = randn_bm();

        var titleIndex = 0;
        var titleMatch = Math.abs(rand - 1 / titles.length);
        for (let i = 1; i < titles.length; i++) {
            var match = Math.abs(rand - (i + 1) / titles.length);
            if (match < titleMatch) {
                titleMatch = match;
                titleIndex = i;
            }
        }

        return titles[titleIndex];
    }

    function openBottomInfo() {
        setOpenInfo(prevCheck => !prevCheck);
    }
    return (
        <li className="players__item">
            <div className="players__top">
                <span className="players__position">

                    <span className="position__current">
                        {position}
                    </span>

                    <span className="position__previous">
                        <a style={
                            positionChange === 0
                                ? {}
                                : signPositionChange === +1
                                    ? { color: 'rgb(0,71,71)' }
                                    : { color: 'rgb(71,0,0)' }
                        }>
                            {
                                positionChange === 0
                                    ? ''
                                    : signPositionChange === +1
                                        ? '+'
                                        : ''
                            }
                            {
                                positionChange === 0
                                    ? ''
                                    : positionChange
                            }
                        </a>
                    </span>

                </span>

                <div className="players__name">
                    {
                        title === 'None'
                            ? <a></a>
                            : <span className="players__title">{title}</span>
                    }
                    &nbsp;&nbsp;<span className="players__handle">{playerObject.player_name}</span>
                </div>
                
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
                    <span className="games__games">{playerObject.all_games}<span> /</span></span>
                    <span className="games__tournaments">{playerObject.all_tournaments}</span>
                </span>

                <span className={'players__wins' + (percentVictories > 49.99 ? ' players__wins--green' : ' players__wins--red')}>
                    {percentVictories}%
                </span>

                <span className="players__opener">
                    <IconButton onClick={openBottomInfo} aria-label="open player info">
                        <ExpandCircleDownIcon className={openInfo ? 'icon-rotated' : ''}/>
                    </IconButton>
                </span>

            </div>
            
            <Collapse className="players__bottom" in={openInfo} timeout="auto" unmountOnExit>
                <div className="bottom__container">
                    <div className="bottom__left">
                        <span>
                            <FontAwesomeIcon icon={faChessBoard} />
                            &nbsp;{playerObject.all_games}&nbsp;games played
                        </span>

                        <span className="bottom__color-rate">
                            <span>
                            <FontAwesomeIcon icon={faChessKnight} style={{color: "#d1c471",}} />
                            
                            &nbsp;{playerObject.all_whites}&nbsp;played for White
                            </span>
                            
                            <span>
                            <FontAwesomeIcon icon={faChartPie} style={{color: "#d1c471",}} />
                            &nbsp;&nbsp;W:&nbsp;{playerObject.wins_white}&nbsp;
                            &nbsp;|&nbsp;D:&nbsp;{playerObject.draw_white}&nbsp;
                            &nbsp;|&nbsp;L:&nbsp;{whiteLost}
                            </span>
                        </span>

                        <span className="bottom__color-rate">
                            <span>
                            <FontAwesomeIcon icon={faChessKnight} style={{color: "black",}} />
                            
                            &nbsp;{playerObject.all_blacks}&nbsp;played for Black
                            </span>
                            <span>
                                
                            <FontAwesomeIcon icon={faChartPie} style={{color: "black",}} />
                            &nbsp;&nbsp;W:&nbsp;{playerObject.wins_black}&nbsp;
                            &nbsp;|&nbsp;D:&nbsp;{playerObject.draw_black}&nbsp;
                            &nbsp;|&nbsp;L:&nbsp;{blackLost}
                            </span>

                        </span>
                    </div>
                    <div className="bottom__left">

                    </div>
                </div>
            </Collapse>
        </li>
    );
}