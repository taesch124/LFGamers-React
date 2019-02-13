import React, {Component} from 'react';
// import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../../components/List";
import CreateThreadModal from "./../modals/CreateThreadModal";

import axios from 'axios';

class GameDetail extends Component {
    state = {
            game: '',
            threads: [],
            comments: [],
            chat: ''
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        console.log(`/games/${id}`);
        axios.get(`/games/${id}`)
        .then(response => {

            this.setState({ game: response.data, comments: ["Nice Game", "Good timepass"], chat: "Chat Placeholder"});
            let _id = response.data._id;

            axios.get('/threads/game/' + _id)
            .then(response => {
                
                this.setState({threads: response.data});
            })
            .catch(error => {
                console.error(error)
            });
        })
        .catch(error => {
            console.error(error);
        });

        
    }
    
    render(){
        let game = this.state.game;
        console.log(this.state.threads);
        return(
            <div className="container">
                <div className="card-panel blue-grey lighten-5">
                    <div className="row">
                        <div className="col s12 m4">
                            {game.cover ? <img src={game.cover.url} alt={`poster for ${game.name}`} /> : null}
                        </div>
                        <div className=" col s12 m8">
                            <h2>{game.name}</h2>
                            <p></p>
                        </div> 
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

                        <CreateThreadModal game={game} user={this.props.user} />
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