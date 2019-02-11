import React, {Component} from 'react';
import AccountInput from './AccountInput';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            platformNum: 1,
            platformAccounts: []
        }
    }


    render() {
        console.log(this.state);
        let accountInputs = [];
        for(let i = 0; i < this.state.platformNum; i++) {
            accountInputs.push(<AccountInput key={i} handleAccountChange={this.handleAccountChange} />)
        }
        return(
            <div>
                <div>
                    {accountInputs}
                </div>
                <div>
                    <span className="btn btn-warning" onClick={this.addPlatform}>Add Platform</span>
                </div>
            </div>
        )
    }

    handleAccountChange = (data) => {
        console.log(data);
        let current = this.state.platformAccounts;
        let newPlatformAccounts = current.filter(e => e.platform !== data.platform);
        newPlatformAccounts.push(data);
        this.setState({
            platformAccounts: newPlatformAccounts
        });
    }

    addPlatform = (e) => {
        if(this.state.platformNum <= 4) {
            this.setState({
                platformNum: this.state.platformNum + 1
            });
        }
    }

}

export default Profile;