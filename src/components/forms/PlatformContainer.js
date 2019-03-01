import React, {Component} from 'react';
import AccountInput from './AccountInput';
import {Input} from 'react-materialize';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            platformNum: 1,
            availablePlatforms:[],
            platformAccounts: [],
            selectedPlatforms: []
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
            accountInputs.push(
            <div key={i} className="row">
                <div className="col s6">
                    <div className="input-field row s4">
                        <select className="platform-name" name="platformName" defaultValue="none"
                        onChange={this.handlePlatformChange}>
                        <option value="none" disabled>Select One</option>
                        {
                        this.state.availablePlatforms.map((e, index) => 
                            this.state.selectedPlatforms.indexOf(e.name)>=0?
                            <option disabled id={i + '_platform'} key={e._id} value={e.name}>{e.name}</option>:
                            <option id={i + '_platform'} key={e._id} value={e.name}>{e.name}</option>
                        )}
                        </select>
                    </div>
                </div>
                <div className="col s6">
                    <Input
                        key={i + '_account'}
                        id={i + '_account'}
                        label="Account Name"
                        type="text"
                    />
                </div>
            </div>
            )
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

    handlePlatformChange = (e) => {
        console.log(e.target.value);
        var newArray = this.state.selectedPlatforms.slice();    
        newArray.push(e.target.value);
        this.setState({
            selectedPlatforms: newArray
        });
    }

    handleAccountChange = (data) => {
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