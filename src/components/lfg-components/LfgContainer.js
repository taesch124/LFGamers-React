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
            chatChannel: null,
            selectedPosting: null,
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
                    selectedPosting={this.state.selectedPosting}
                    channel={this.state.chatChannel}
                    leavePostingChat={this.leavePostingChat}
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

    joinPostingChat = (posting) => {
        //window.Materialize.toast(`Joining posting ${id}`, 4000);
        console.log(posting);
        let chatChannel = {
            id: `${this.props.game._id}-${posting._id}`,
            name: `${this.props.game.name} posting - ${posting.title}`
        };

        this.setState({
            chat: true,
            chatChannel: chatChannel,
            selectedPosting: posting,
        });
    }

    leavePostingChat = () => {
        console.log(this.state.selectedPosting._id);
        axios.post('/api/lfg/postings/delete',
        {_id: this.state.selectedPosting._id})
        .then(response => {
            this.setState({
                chat: false,
                chatChannel: null,
                selectedPosting: null
            }, () => {
                this.getPostings(this.props.game._id);
            });
        })
        .catch(error => {
            console.error(error);
        });
        
    }
}

export default LfgContainer;