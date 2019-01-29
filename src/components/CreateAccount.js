import React, {Component} from 'react';
import axios from 'axios';

class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '', 
            password: '',
            email: ''
        };
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Enter username" id="username" name="username" type="text" onChange={this.handleUsernameChange}/>
                        <label htmlFor="username" className="active">Username</label>
                        <span className="helper-text" ref={input => this.usernameValidation = input}></span>
                    </div> 
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Enter password" id="password" name="password" type="password" onChange={this.onChange}/>
                        <label htmlFor="password" className="active">Password</label>
                        <span className="helper-text" ref={input => this.passwordValidation = input}></span>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Enter email (optional)" id="email" name="email" type="email" onChange={this.onChange}/>
                        <label htmlFor="email" className="active">E-mail</label>
                        <span className="helper-text" ref={input => this.emailValidation = input}></span>
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
        console.log(this.state.username, this.state.password);
        if(!this.validateInput()) return;
    
        console.log('Creating acount');
        axios.post('/auth/create-account',  {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            if(response.data.success) {
                this.props.history.push('/auth/login/');
            }
            else {
                this.errorMessage.textContent = response.data.message;
            }
        })
        .catch(error => {
            console.error(error);
            //this.errorMessage.textContent = error.message;
        });
    }

    handleUsernameChange = (e) => {
        let text = e.target.value;
        if(text.length < 6) {
            this.usernameValidation.textContent = 'Username must be 6 characters long.';
        } else {
            this.usernameValidation.textContent = '';
            this.setState({
                username: text
            });
        }
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validateInput = () => {
        let validated = true;

        if(this.state.username.length < 6) {
            this.usernameValidation.textContent = 'Username must be 6 characters long.';
            validated = false;
        }

        if(!this.state.password) {
            this.passwordValidation.textContent = 'Password is required';
            validated = false;
        }

        return validated;
    }
}

export default CreateAccount;