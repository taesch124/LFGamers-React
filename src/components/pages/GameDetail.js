import React, {Component} from 'react';
// import Jumbotron from "../components/Jumbotron";

import axios from 'axios';
import ThreadList from '../thread-components/ThreadList';
import CommentList from './../thread-components/CommentList';
import PostingList from './../lfg-components/PostingList';

import './styles/GameDetail.css';
import { Icon } from 'react-materialize';

import CircleLoader from './../loaders/CircleLoader';

class GameDetail extends Component {
    state = {
            game: '',
            threads: [],
            currentThread: null,
            loadingThread: false,
            chat: ''
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/games/${id}`)
        .then(response => {

            this.setState({ game: response.data, chat: "Chat Placeholder"});
            let _id = response.data._id;
            this.getThreads(_id);
            
        })
        .catch(error => {
            console.error(error);
        });
        
    }
    
    render(){
        let game = this.state.game;
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
                        {!this.state.currentThread ? 
                        <ThreadList 
                            threads={this.state.threads} 
                            getThreads={this.getThreads} 
                            user={this.props.user}
                            game={game}
                            getThread={this.getThread} />
                        : this.state.loadingThread ?
                            <CircleLoader /> :
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
                        <PostingList
                            user={this.props.user}
                            game={game}
                        />
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
        this.setState({loadingThread: true});
        axios.get('/threads/comments/' + threadId)
        .then(response => {
            this.setState({
                currentThread: response.data,
                loadingThread: false
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