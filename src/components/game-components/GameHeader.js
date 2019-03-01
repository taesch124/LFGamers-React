import React from 'react';
import './styles/GameHeader.css';

function GameHeader(props) {
    let game = props.game;
    return (
        <div className="card-panel blue-grey lighten-5 center-row">
            <div className="row row-fluid center-row">
                <div className="col s12 m4">
                    {game.cover ? 
                    <img 
                        className="game-header-poster"
                        src={game.cover.url} 
                        alt={`poster for ${game.name}`} 
                    /> : 
                    null}
                </div>
                <div className=" col s12 m8">
                    <h2>{game.name}</h2>
                    <p>Rated: {game.rating}</p>
                    <p>Genres: {game.genres ? game.genres.map((e,i) => i === game.genres.length - 1 ? e : `${e}, `) : 'N/A'}</p>
                    <p>Platforms: {game.platforms ? game.platforms.map((e,i) => i === game.platforms.length - 1 ? e : `${e}, `) : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}

export default GameHeader;