import React, {Component} from 'react';
import axios from 'axios';

import PostingList from './../lfg-components/PostingList';
import CircleLoader from '../loaders/CircleLoader';
import ChatContainer from '../chat-components/ChatContainer';
import {Toast} from 'react-materialize';

class LfgContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postingsLoaded: false,
            loadingPostings: true,
            lfgPostings: [],
            chat: false,
            chatChannel: null
        };
    }

    componentWillReceiveProps() {
        if(!this.state.postingsLoaded && this.props.game) {
            this.getPostings(this.props.game._id);
        }
    }

    render() {
        return (
            <div>
                {this.state.chat ? 
                <ChatContainer 
                    channelId={this.state.chatChannel}
                /> :
                this.state.loadingPostings ?
                    <CircleLoader /> :
                    <PostingList
                        postings={this.state.lfgPostings}
                        user={this.props.user}
                        game={this.props.game}
                        getPostings={this.getPostings}
                        joinPostingChat={this.joinPostingChat}
                    />
                }
            </div>
        )
    }

    getPostings = (id) => {
        this.setState({loadingPostings: true},
            () => {
                axios.get(`/api/lfg/postings/${id}`)
                .then(response => {
                    this.setState({
                        lfgPostings: response.data,
                        postingsLoaded: true,
                        loadingPostings: false
                    })
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }

    joinPostingChat = (id) => {
        //window.Materialize.toast(`Joining posting ${id}`, 4000);
        this.setState({
            chat: true,
            chatChannel: `${this.props.game._id}-${id}`,
        });
    }
}

export default LfgContainer;