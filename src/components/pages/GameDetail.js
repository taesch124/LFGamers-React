import React, {Component} from 'react';
// import Jumbotron from "../components/Jumbotron";
import { List, ListItem, Reviews } from "../../components/List";

import axios from 'axios';

import axios from 'axios';
import ThreadList from '../thread-components/ThreadList';
import CommentList from './../thread-components/CommentList';

import './styles/GameDetail.css';
import { Icon } from 'react-materialize';

class GameDetail extends Component {
    state = {
            game: '',
            threads: [],
            currentThread: null,
            chat: ''
    };

    componentDidMount() {
        let id = this.props.match.params.id;
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
        let game = this.state.game;
        return(
            <div className="container">
                <div className="row">
                    <div className="input-field col s12">
                        <h2 style={{width: '100%', height: 80, backgroundColor: '#607d8b'}}>{this.state.game}</h2>
                    </div> 
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        {!this.state.currentThread ? 
                        <ThreadList 
                            threads={this.state.threads} 
                            getThreads={this.getThreads} 
                            user={this.props.user}
                            game={game}
                            getThread={this.getThread} />
                        :
                        <div>
                            <div
                            className="left-align" 
                            onClick={this.removeCurrentThread}>
                                <Icon>arrow_back</Icon>
                            </div>
                            <CommentList
                                user={this.props.user}
                                game={game}
                                thread={this.state.currentThread}
                                getThread={this.getThread}
                            />
                        </div>
                        }
                        
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

    getThread = (threadId) => {
        axios.get('/threads/comments/' + threadId)
        .then(response => {
            this.setState({
                currentThread: response.data
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    removeCurrentThread = () => {
        this.setState({
            currentThread: null
        }, () => {
            this.getThreads(this.state.game._id);
        });
    }
}

export default GameDetail;