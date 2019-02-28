import React, {Component} from 'react';
import AccountInput from './AccountInput';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            platformNum: 1,
            availablePlatforms:[],
            platformAccounts: []
        }
    }

    componentDidMount() {
        axios.get('/api/platforms')
        .then(response => {
            this.setState({
                availablePlatforms: response.data
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    render() {
        let accountInputs = [];
        for(let i = 0; i < this.state.platformNum; i++) {
            accountInputs.push(<AccountInput 
                platformOptions={this.state.availablePlatforms} 
                key={i}
                id={i}
                handleAccountChange={this.handleAccountChange} 
                removeAccountInput={this.removeAccountInput}
                />)
        }
        return(
            <div>
                <div>
                    {accountInputs}
                </div>
                <div>
                    {this.state.platformNum >= this.state.availablePlatforms.length ? 
                    null :
                    <span className="btn btn-warning" onClick={this.addPlatform}>Add Platform</span>}
                </div>
            </div>
        )
    }

    handleAccountChange = (data) => {
        //console.log(data);
        let current = this.state.platformAccounts;
        let newPlatformAccounts = current.filter(e => e.platform !== data.platform);
        newPlatformAccounts.push(data);
        this.setState({
            platformAccounts: newPlatformAccounts
        }, () => {
            console.log('Saving at page level');
            this.props.handleAccountChanges(this.state.platformAccounts);
        });
    }

    addPlatform = (e) => {
        if(this.state.platformNum < this.state.availablePlatforms.length) {
            this.setState({
                platformNum: this.state.platformNum + 1
            });
        }
    }

    removeAccountInput = (id)  => {
        console.log(id);
        this.setState({
            platformNum: this.state.platformNum  - 1
        });
    }

}

export default Profile;