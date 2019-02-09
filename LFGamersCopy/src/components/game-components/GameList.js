import React, {Component} from 'react';
import GamePanel from './../game-components/GamePanel';
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
        console.log('game list mounted');
        axios.get('/games')
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
                    <div className="col s12 m8">
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
                    <div className="col s12 m8">
                        {this.state.games.length === 0 ?
                         <h3>No games found</h3> :
                         this.state.games.map(e => <GamePanel key={e.id} game={e} />)}
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

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.search);
        axios.get(`/games/search-title/${this.state.search}`)
        .then(response => {
            console.log(response);
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