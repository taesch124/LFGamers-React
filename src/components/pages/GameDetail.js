import React, {Component} from 'react';
// import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../../components/List";

import axios from 'axios';

class GameDetail extends Component {
    state = {
            game: '',
            comments: [],
            chat: ''
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        console.log(`/games/${id}`);
        axios.get(`/games/${id}`)
        .then(response => {
            console.log(response);
            console.log(response.data);

            this.setState({ game: response.data.name, comments: ["Nice Game", "Good timepass"], chat: "Chat Placeholder"});

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
                        <h2>{this.state.game}</h2>
                    </div> 
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        
                        {this.state.comments.length ? (
                        <List>
                            {this.state.comments.map(comment => {
                            return (
                                <ListItem key={comment}>
                                    <strong>
                                        {comment}                                          
                                    </strong>
                                </ListItem>
                            );
                            })}
                        </List>
                        ) : (
                        <h3>No Results to Display</h3>
                        )}
                    </div>
                    <div className="input-field col s12 m6">
                        <strong>{this.state.chat}</strong>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameDetail;