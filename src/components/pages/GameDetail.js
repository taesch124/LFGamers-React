import React, {Component} from 'react';
// import Jumbotron from "../components/Jumbotron";
import { List, ListItem, Reviews } from "../../components/List";

import axios from 'axios';

class GameDetail extends Component {
    state = {
            game: '',
            comments: [],
            chat: '',
            poster: ''
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        console.log(`/games/${id}`);
        axios.get(`/games/${id}`)
        .then(response => {
            // console.log(response);
            console.log(response.data.cover.url);

            this.setState({ game: response.data.name, comments: ["Nice Game", "Good timepass"], chat: "Chat Placeholder", poster: response.data.cover.url});

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
                        <h2 style={{width: '100%', height: 80, backgroundColor: '#607d8b'}}>{this.state.game}</h2>
                    </div> 
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                    <label className="active" style={{color: 'black', fontSize:35}}><b>REVIEWS</b></label>
                    <br></br>
                        {this.state.comments.length ? (
                        <Reviews>
                            {this.state.comments.map(comment => {
                            return (
                                <ListItem key={comment}>
                                    <strong>
                                        {comment}                                          
                                    </strong>
                                </ListItem>
                            );
                            })}
                        </Reviews>
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