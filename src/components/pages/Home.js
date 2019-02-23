import React, {Component} from 'react';
import axios from 'axios';
import GameList from '../game-components/GameList';
import FavoritesList from '../game-components/FavoritesList';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [],
            favorites: []
        }
    }

    render() {
        return(
            <div className="container container-fluid">
                <div className="row">
                    <div className="col s12 m8">
                        <GameList getUserFavorites={this.getUserFavorites} {...this.props} />
                    </div>

                    <div className="col s12 m4">
                        <FavoritesList getUserFavorites={this.getUserFavorites} favorites={this.state.favorites} {...this.props} />
                    </div>
                </div>
    
            </div>
        )
    }

    getUserFavorites = () => {
        axios.get('/user/game-favorites')
        .then(response => {
            this.setState({
                favorites: response.data
            });
        })
        .catch(error => {
            console.error(error);
        })
    }

}

export default Home;