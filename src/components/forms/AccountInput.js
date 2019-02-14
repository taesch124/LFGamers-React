import React from 'react';
import {Input} from 'react-materialize';
import M from "materialize-css";

class AccountInput extends React.Component  {
    constructor(props) {
        super(props);

        this.platformSelect = React.createRef();
        this.state = {
            platformName: '',
            accoutName: '',
            validationMessage: '',
        }
    }
    
    componentDidMount() {
        let select = document.querySelectorAll('select');
        M.FormSelect.init(select, {});
    }

    render() {

        return (
            <div className="row">
                <Input s={4}
                    name="platformName"
                    type="select"
                    onChange={this.handlePlatformChange}
                    defaultValue="none"
                    ref={this.platformSelect} 
                >
                    <option disabled value="none">Select One</option>
                    {/* {this.props.platformOptions.map((e, i) => <option key={e._id} value={e.name}>{e.name}</option>)} */}
                    
                    <option value="xboxOne">Xbox One</option>
                    <option value="PS4">Playstation 4</option>
                    <option value="steam">Steam</option>
                    <option value="origin">Origin</option>
                </Input>
                <Input
                    className="account-input"
                    name="accountName"
                    s={7}
                    type="text"
                    placeholder="Gamertag"
                    onChange={this.handleAccountChange}
                />
                <i className="material-icons col s1" onClick={e => this.props.removeAccountInput(this.props.id)}>delete</i>
                <span className="helper-text">{this.state.validationMessage}</span>
            </div>
        );
    }

    handlePlatformChange = (e) => {
        this.setState({
            platformName: e.target.value,
            validationMessage: '',
        });
    }

    handleAccountChange = (e) => {
        this.setState({
            accoutName: e.target.value
        }, () => {
            if(!this.state.platformName) {
                this.setState({validationMessage: 'Please select a platform.'});
            } else {
                this.setState({validationMessage: ''});
                this.props.handleAccountChange({
                    platform: this.state.platformName,
                    account: this.state.accoutName
                });
            }
        });
        
    }
}

export default AccountInput;

