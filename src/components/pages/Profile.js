import React, {Component} from 'react';
import axios from 'axios';
import GameList from '../game-components/GameList';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return(
            <div className="container">
                <h3>Profile Page</h3>
                <p>Username: {this.props.user.username}</p>
            </div>
        )
    }

}

export default Profile;