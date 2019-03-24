import React, {Component} from 'react';
import axios from 'axios';

import ThreadList from '../thread-components/ThreadList';
import CommentList from './../thread-components/CommentList';
import CircleLoader from './../loaders/CircleLoader';
import { Icon } from 'react-materialize';

import './styles/ThreadContainer.css';

class ThreadContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            threads: [],
            currentThread: null,
            loadingThreads: true,
            loadingThread: false,
            threadsLoaded: false,
        };

    }

    componentWillReceiveProps() {
        if(!this.state.threadsLoaded && this.props.game) {
            this.getThreads(this.props.game._id);
        }
    }

    render() {
        let game = this.props.game;
        if (!game) return (<CircleLoader />) 
        else return (
            <div className="thread-container">
            {!this.state.currentThread ? 
                this.state.loadingThreads ? 
                <CircleLoader /> :
                <ThreadList 
                    threads={this.state.threads} 
                    getThreads={this.getThreads} 
                    user={this.props.user}
                    game={game}
                    getThread={this.getThread} />
                : this.state.loadingThread ?
                    <CircleLoader /> :
                    <div className="comment-container">
                        <div className="flex-row">

                            <div
                            className="left-align" 
                            onClick={this.removeCurrentThread}>
                                <Icon>arrow_back</Icon>
                            </div>

                            <div onClick={e => this.getThread(this.state.currentThread._id)}>
                                <Icon>refresh</Icon>
                            </div>
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
        )
    }

    getThreads = (id) => {
        this.setState({loadingThreads: true},
            () => {
                axios.get('/api/threads/game/' + id)
                .then(response => {
                    this.setState({
                        threads: response.data,
                        loadingThreads: false,
                        threadsLoaded: true
                    });
                })
                .catch(error => {
                    console.error(error)
                });
        });
    }

    getThread = (threadId) => {
        this.setState({loadingThread: true},
            () => {
                axios.get('/api/threads/comments/' + threadId)
                .then(response => {
                    this.setState({
                        currentThread: response.data,
                        loadingThread: false,
                        threadsLoaded: false
                    });
                })
                .catch(error => {
                    console.error(error);
                });
            });
        
    }

    removeCurrentThread = () => {
        this.setState({
            currentThread: null
        }, () => {
            this.getThreads(this.props.game._id);
        });
    }
}

export default ThreadContainer;