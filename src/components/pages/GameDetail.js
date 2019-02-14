import React, {Component} from 'react';
// import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../../components/List";
import CreateThreadModal from "./../modals/CreateThreadModal";

import axios from 'axios';
import ThreadPanel from '../thread-components/ThreadPanel';

import './styles/GameDetail.css';

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
            this.getThreads(_id);
            
        })
        .catch(error => {
            console.error(error);
        });
        
    }
    
    render(){
        let game = this.state.game;
        console.log(this.state.threads);
        return(
            <div className="container container-fluid">
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
                        <CreateThreadModal getThreads={this.getThreads} game={game} user={this.props.user} />
                        {this.state.comments.length ? (
                        <List>
                            {this.state.threads.map(thread => {
                            return (
                                <ThreadPanel key={thread._id} threadInfo={thread} />
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

    getThreads = (id) => {
        axios.get('/threads/game/' + id)
        .then(response => {
            
            this.setState({threads: response.data});
        })
        .catch(error => {
            console.error(error)
        });
    }
}

export default GameDetail;