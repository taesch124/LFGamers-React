import React, {Component} from 'react';
import GamePanel from './../game-components/GamePanel';
import CircleLoader from './../loaders/CircleLoader';
import axios from 'axios';

class GameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            games: []
        }
    }

    componentDidMount() {
        axios.get('/api/games')
        .then(response => {
            if(response.data.error) {
                console.error(response.data.message);
            } else {
                this.setState({
                    games: response.data
                });
            }
            
        })
        .catch(error => {
            console.error(error);
            
        });
    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col s6 offset-s3">
                        <form onSubmit={this.handleFormSubmit} id="game-search">
                        <div className="input-field">
                            <input id="search" name="search" type="search" value={this.state.search} onChange={this.onChange} required/>
                            <label className="label-icon left" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        {this.state.games.length === 0 ?
                         <CircleLoader /> :
                         this.state.games.map(e => 
                         <GamePanel 
                            onGameClick={this.onGameClick}
                            onGameFavorite={this.onGameFavorite}
                            key={e._id} 
                            id={e._id} 
                            game={e} 
                        />
                         )}
                    </div>
                </div>
            </div>
                
        )
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onGameClick = (id) => {
        this.props.history.push(`/games/${id}`);
    }

    onGameFavorite = (id) => {
        axios.post('/api/user/game-favorites/add/' + id)
        .then(response =>{
            this.props.getUserFavorites();
        })
        .catch(error => {
            console.error(error);
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.setState({games: []});
        axios.get(`/api/games/search-title/${this.state.search}`)
        .then(response => {
            if(response.data.error) {
                console.error(response.data);
            } else {
                this.setState({
                    games: response.data,
                    search: ""
                });
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

}

export default GameList;