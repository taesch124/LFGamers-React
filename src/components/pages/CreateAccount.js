import React, {Component} from 'react';
import axios from 'axios';
import EmailInput from '../forms/EmailInput';
import PlatformContainer from '../forms/PlatformContainer';

class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '', 
            password: '',
            email: '',
            emailValidation: '',
            platforms: [],
        };
    }

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
                        <PlatformContainer onChange={this.addPlatforms} platforms={this.state.platforms} handleAccountChanges={this.handleAccountChanges} />
                    </div>

                    <div className="row">
                        <div className="col m8 s10 offset-s1">
                            <span className="helper-text" ref={input => this.errorMessage = input}></span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col m4 s12 offset-m4">
                            <div className="flex-row">
                                <button className="btn btn-primary waves-effect blue" onClick={this.createAccount}>Create Account</button>
                            </div>
                        </div>
                        <div className="col s12 m2">
                            <a href="/auth/Login">Login</a>
                        </div>
                        
                    </div>
                </form>
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

    createAccount = (e) => {
        e.preventDefault();
        console.log(this.state.username, this.state.password);
        if(!this.validateInput()) return;
    
        console.log('Creating acount');
        axios.post('/api/auth/create-account',  {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            accounts: this.state.platforms,
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

        if(!this.state.username) {
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