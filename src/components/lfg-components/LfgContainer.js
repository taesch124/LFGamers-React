import React, {Component} from 'react';
import axios from 'axios';

import PostingList from './../lfg-components/PostingList';
import CircleLoader from '../loaders/CircleLoader';

class LfgContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postingsLoaded: false,
            loadingPostings: true,
            lfgPostings: [],
            chat: ''
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
                {this.state.loadingPostings ?
                <CircleLoader /> :
                <PostingList
                    postings={this.state.lfgPostings}
                    user={this.props.user}
                    game={this.props.game}
                    getPostings={this.getPostings}
                />}
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
}

export default LfgContainer;