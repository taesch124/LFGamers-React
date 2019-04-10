import React, {Component} from 'react';
import PlatformContainer from './../forms/PlatformContainer';
import Button from 'react-materialize/lib/Button';

import axios from 'axios';

class Profile extends Component {

    constructor() {
        super();

        this.state = {
            platforms: []
        };
    }

    render() {
        console.log(this.props);
        return(
            <div className="container">
                <h3>Profile Page</h3>
                <p>Username: {this.props.user.username}</p>

                <div className="row">
                    <div className="col s12">
                        <PlatformContainer user={this.props.user} onChange={this.addPlatforms} platforms={this.state.platforms} handleAccountChanges={this.handleAccountChanges} />
                        <br></br>
                        <Button onClick={this.updateAccounts}>Update Accounts</Button>
                    </div>
                    
                </div>
            </div>
        )
    }

    addPlatforms = (p) => {
        console.log(this.state.platforms);
        var newArray = this.state.platforms.slice();    
        newArray.push(p);
        this.setState({
            platforms: newArray
        });
    }

    handleAccountChanges = (platforms) => {
        this.setState({
            platforms: platforms
        });
    }

    updateAccounts = () => {
        axios.post('/api/user/platforms/',
        this.state.platforms)
        .then(response => {
            console.log('accounts updated');
        })
        .catch(error => {
            console.error(error);
        })
    }

}

export default Profile;