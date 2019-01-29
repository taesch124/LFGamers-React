import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '', 
            password: ''
        };
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="input-field col s6">
                        <input placeholder="Enter username" id="username" name="username" type="text" onChange={this.onChange}/>
                        <label htmlFor="username" className="active">Username</label>
                        <span className="helper-text" ref={input => this.usernameValidation = input}></span>
                    </div>
                    <div className="input-field col s6">
                        <input placeholder="Enter password" id="password" name="password" type="password" onChange={this.onChange}/>
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
                            <button className="btn btn-primary waves-effect blue" onClick={this.login}>Login</button>
                            <a href="/auth/create-account">Create an account</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    login = () => {
        console.log('Logging in');
        axios.post('/auth/login',  {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            console.log(response.data);
            if(response.data.success) {
                this.props.loginHandler(response.data.user);
                this.props.history.push('/home');
            }
            else {
                console.error(response.data.message);
                this.errorMessage.textContent = response.data.message;
            }
        })
        .catch(error => {
            console.error(error);
            //this.errorMessage.textContent = error.message;
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}

export default Login;