import React, {Component} from 'react';
import axios from 'axios';

class CreateAccount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Enter username" id="username" type="text" onChange={this.handleUsernameChange}/>
                        <label htmlFor="username" className="active">Username</label>
                        <span className="helper-text" ref={input => this.usernameValidation = input}></span>
                    </div> 
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Enter password" id="password" type="password" onChange={this.handlePasswordChange}/>
                        <label htmlFor="password" className="active">Password</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s10 offset-s1">
                        <span className="helper-text" ref={input => this.errorMessage = input}></span>
                    </div>
                </div>

                <div className="row">
                    <div className="col s4 offset-s4">
                        <div className="flex-row">
                            <button className="btn btn-primary waves-effect blue" onClick={this.createAccount}>CreateAccount</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    createAccount = () => {
        console.log('Creating acount');
    }
}

export default CreateAccount;