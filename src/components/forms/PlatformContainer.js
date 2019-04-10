import React, {Component} from 'react';
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
        if(!this.props.user) return;
        console.log('getting users accounts');
        this.getUserAccounts(accounts => {
            console.log(accounts);
            this.setState({
                platformAccounts: accounts,
                platformNum: accounts.length
            });
        });
    }

    render() {
        let accountInputs = [];
        console.log(this.state.platformAccounts, this.state.platformNum);
        for(let i = 0; i < this.state.platformNum; i++) {
            accountInputs.push(
            <div key={i} className="row">
                <div className="col s6">
                        <select 
                            className="platform-name" 
                            name="platformName" 
                            // defaultValue={this.state.platformAccounts[i] ? this.state.platformAccounts[i].platform._id : "none"}
                            id={i + '_platform'}
                            onChange={this.handlePlatformChange}
                        >
                            <option value="none" disabled hidden selected={!this.state.platformAccounts[i]}>Select One</option>
                            {
                            this.state.availablePlatforms.map((e, index) => 
                                this.state.selectedPlatforms.indexOf(e._id)>=0 ?
                                    <option disabled id={i + '_platform'} key={e._id} value={e._id} selected={this.state.platformAccounts[i] && index === i}>{e.name}</option> :
                                    <option id={i + '_platform'} key={e._id} value={e._id} selected={this.state.platformAccounts[i] && index === i}>{e.name}</option>
                            )}
                        </select>
                </div>
                <div className="col s6">
                    <Input
                        s={12}
                        key={i + '_account'}
                        id={i + '_account'}
                        label="Account Name"
                        type="text"
                        className="user-account"
                        onChange={this.handleAccountChange}
                        value={this.state.platformAccounts[i] ? this.state.platformAccounts[i].account : '' }
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
        let id = e.target.id.substring(0,1);
        var newArray = this.state.selectedPlatforms.slice();    
        newArray.push(e.target.value);
        this.setState({
            selectedPlatforms: newArray
        });
       // this.props.onChange(e.target.value);
    }

    handleAccountChange = (e) => {
        var id = e.target.id;
        var data = {};
        data.account = e.target.value;
        var platformid= id.substring(0,1);
        data.platform = this.state.selectedPlatforms[platformid];
        let current = this.state.platformAccounts;
        let newPlatformAccounts = current.filter(e => e.platform !== data.platform);
        newPlatformAccounts.push(data);
        this.setState({
            platformAccounts: newPlatformAccounts
        }, () => {
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
        this.setState({
            platformNum: this.state.platformNum  - 1
        });
    }

    getUserAccounts = () => {
        axios.get('/api/user/platforms')
        .then(response => {
            let selected = response.data.map(e => e.platform._id);
            this.setState({
                platformAccounts: response.data,
                selectedPlatforms: selected,
                platformNum: response.data.length,
            });
        })
        .catch(error => {
            console.error(error);
        })
    }

}

export default Profile;