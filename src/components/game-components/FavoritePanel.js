import React from 'react';
import {Icon} from 'react-materialize';
import './styles/FavoritePanel.css';

function FavoritePanel(props) {
    let game = props.game;
    return (
        <div onClick={e => props.onGameClick(game._id)}>
            <h5>{game.name}</h5>
            <span onClick={(e) => {e.stopPropagation(); props.removeGameFavorite(game._id);}}><Icon >delete</Icon></span>
        </div>
    );
}

export default FavoritePanel;