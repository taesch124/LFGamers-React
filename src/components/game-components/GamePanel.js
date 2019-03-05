import React from 'react';
import './styles/GamePanel.css';

function GamePanel(props) {
    let game = props.game;
    return (
        <div id={game.id} className="card horizontal" onClick={e => props.onGameClick(game._id)}>
            <div className="card-image">
                <img className="game-poster" alt={game.name} src={game.cover ? `https:${game.cover.url}` : 'https://via.placeholder.com/180'} />
            </div>
            <div className="card-content">
                <span className="right" onClick={(e) => {e.stopPropagation(); props.onGameFavorite(game._id);}}>Favorite</span>
                <h4>{game.name}</h4>
                <p className="left-align">Rating: {game.rating ? game.rating.toFixed(1) : "N/A"}</p>
                <p className="left-align">Popularity: {game.popularity ? game.popularity.toFixed(0) : "N/A"}</p>
                <p className="left-align">Genres: {game.genres ? game.genres.map((e,i) => i === game.genres.length - 1 ? e : `${e}, `) : 'N/A'}</p>
                <p className="left-align">Platforms: {game.platforms ? game.platforms.map((e,i) => i === game.platforms.length - 1 ? e : `${e}, `) : 'N/A'}</p>
            </div>
        </div>
    );
}

export default GamePanel;