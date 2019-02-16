import React, {Component} from 'react';
import axios from 'axios';
import EmailInput from '../forms/EmailInput';
import PlatformContainer from '../forms/PlatformContainer';

class CreateAccount extends Component {
           state = {
            username: '', 
            password: '',
            email: '',
            emailValidation: '',
            platforms: [],
        };
    

    render() {
        return(
            <div className="container">
                <form id="login-form" onSubmit={this.createAccount}>
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
                        <EmailInput onChange={this.handleEmailChange} emailValidation={this.state.emailValidation}  />
                    </div>

                    <div className="row">
                        <PlatformContainer platforms={this.state.platforms} handleAccountChanges={this.handleAccountChanges} />
                    </div>

                    <div className="row">
                        <div className="col s10 offset-s1">
                            <span className="helper-text" ref={input => this.errorMessage = input}></span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col m2 s12 offset-m4">
                            <div className="flex-row">
                                <button className="btn btn-primary waves-effect blue" onClick={this.createAccount}>CreateAccount</button>
                            </div>
                        </div>
                        
                        <div className="col s12 m2">
                            <a href="/auth/login">Login</a>
                            <span className="btn" onClick={e => console.log(this.state)}>Check state</span>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    createAccount = (e) => {
        e.preventDefault();
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

    handleEmailChange = (e) => {
        let email = e.target.value;
        let regex = new RegExp('.*@.*');
        if(email && !regex.test(email)) {
            this.setState({
                emailValidation: 'Email must include @ symbol.'
            });
            console.log(this.state)
        } else {
            this.setState({
                email: email,
                emailValidation: ''
            });
        }
    }

    handleAccountChanges = (platforms) => {
        console.log(platforms);
        this.setState({
            platforms: platforms
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validateInput = () => {
        let validated = true;

        if(this.state.username) {
            this.usernameValidation.textContent = 'Username is required.';
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