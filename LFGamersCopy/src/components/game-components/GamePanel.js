import React from 'react';
import './styles/GamePanel.css';

function GamePanel(props) {
    let game = props.game;
    return (
        <div className="card horizontal">
            <div className="card-image">
                <img className="game-poster" alt={game.name} src={game.cover ? `https:${game.cover.url}` : 'https://via.placeholder.com/180'} />
            </div>
            <div className="card-content">
                <h4>{game.name}</h4>
                <h5>Rating: {game.rating ? game.rating.toFixed(1) : "N/A"}</h5>
                <h5>Popularity: {game.popularity ? game.popularity.toFixed(0) : "N/A"}</h5>
                <p>Genres: {game.genres.map((e,i) => i === game.genres.length - 1 ? e.name : `${e.name}, `)}</p>
                <p>Platforms: {game.platforms.map((e,i) => i === game.platforms.length - 1 ? e.name : `${e.name}, `)}</p>
                <p className="game-summary">{game.summary}</p>
            </div>
        </div>
    );
}

export default GamePanel;