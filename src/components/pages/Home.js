import React, {Component} from 'react';
import axios from 'axios';
import GameList from '../game-components/GameList';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: []
        }
    }

    render() {
        console.log(this.props);
        return(
            <div className="container">
                <GameList />
            </div>
        )
    }

}

export default Home;