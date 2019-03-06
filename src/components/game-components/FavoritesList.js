import React, {Component} from 'react';
import FavoritePanel from './FavoritePanel';
import axios from 'axios';

import './styles/FavoritesList.css'

class FavoritesList extends Component {

    componentDidMount() {
        this.props.getUserFavorites();
    }

    render() {
        return(
            <div className="card favorites-card">
                <h4>Favorites</h4>
                {this.props.favorites === 0 ?
                         <h4>Currently no favorites</h4> :
                         this.props.favorites.map(e => 
                        <div key={e.id}>
                            <FavoritePanel
                                id={e.id} 
                                game={e}
                                onGameClick={this.onGameClick}
                                removeGameFavorite={this.removeGameFavorite}
                            />
                            <div className="divider"></div>
                        </div>
                         )}
            </div>
        )
    }

    onGameClick = (id) => {
        this.props.history.push(`/games/${id}`);
    }

    removeGameFavorite = (id) => {
        axios.post('/api/user/game-favorites/remove/' + id)
        .then(response =>{
            this.props.getUserFavorites();
        })
        .catch(error => {
            console.error(error);
        });
    }

}

export default FavoritesList;