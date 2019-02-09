import React, {Component} from 'react';
// import Jumbotron from "../components/Jumbotron";

import axios from 'axios';

class GameDetail extends Component {
    state = {
            game: '',
            comments: ''
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        console.log(`/games/${id}`);
        axios.get(`/games/${id}`)
        .then(response => {
            console.log(response);
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="input-field col s12">
                        <h2>saranjeet singh</h2>
                        {/* <input placeholder="Enter username" id="username" name="username" type="text" onChange={this.handleUsernameChange}/>
                        <label htmlFor="username" className="active">Username</label>
                        <span className="helper-text" ref={input => this.usernameValidation = input}></span> */}
                    </div> 
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        {/* <input placeholder="Enter username" id="username" name="username" type="text" onChange={this.handleUsernameChange}/>
                        <label htmlFor="username" className="active">Username</label>
                        <span className="helper-text" ref={input => this.usernameValidation = input}></span> */}
                    </div> 
                </div>
            </div>
        )
    }
}

export default GameDetail;