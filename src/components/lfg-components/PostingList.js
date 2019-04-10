import React, {Component} from 'react';
import axios from 'axios';

import { List } from "./../../components/List";
import {Icon} from 'react-materialize';

//import './styles/List.css';
import CreateLfgModal from '../modals/CreateLfgModal';
import PostingPanel from '../lfg-components/PostingPanel';

import './styles/PostingList.css'

class PostingList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            search: '',
            platform: 'none',
            postings: [],
            filterPostings: false
        }
    }

    componentWillMount() {
        this.getUserAccounts();
        this.setState({postings: this.props.postings});
    }

    render() {
        let postings = this.props.postings;
        return (
            <div className="list">
                <div className="flex-row">
                    <CreateLfgModal 
                        game={this.props.game} 
                        user={this.props.user}
                        getPostings={this.props.getPostings}
                        joinPostingChat={this.props.joinPostingChat}
                    />

                    <div onClick={(e) => this.togglePostingFilter()}>
                        <Icon className={this.state.filterPostings ? `filter-active`: null}>filter_list</Icon>
                    </div>

                    <div onClick={(e) =>  this.props.getPostings(this.props.game._id)}>
                        <Icon>refresh</Icon>
                    </div>
                </div>
                {postings.length > 0 ? (
                <div>
                    <div className="row">
                    <div className="col s6 offset-s3">
                        
                        <form className={this.state.filterPostings ? null : `hidden`} onSubmit={this.handleFormSubmit} id="game-search">
                            <div className="input-field">
                                <input id="search" name="search" type="search" value={this.state.search} onChange={this.onChange} required/>
                                <label className="label-icon search-label" htmlFor="search"><i className="material-icons search-icon">search</i></label>
                                <i className="material-icons close-search-label">close</i>
                                
                            </div>
                        <div className="row">
                                <div className="col s12">
                                
                                    <label class=" align-left platform-label">Platform</label>
                                    <select 
                                        name="platform"
                                        className="platform-select"
                                        value={this.state.platform}
                                        onChange={this.onChange}
                                    >
                                        <option key="none" value="none" defaultValue>Select one</option>
                                        {this.state.accounts.map(e => {
                                            return (
                                                <option 
                                                    key={e.platform._id}
                                                    value={e.platform._id}
                                                >{e.platform.name} - {e.account}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    <List>
                        {this.state.postings.map(posting => {
                        return (
                            <PostingPanel
                                key={posting._id}
                                id={posting._id}
                                posting={posting}
                                joinPostingChat={this.props.joinPostingChat}
                            />
                        );
                        })}
                    </List>
                </div>
                ) : (
                <div>
                    <h5>No postings yet</h5>
                    <p>Create one now!</p>
                </div>
                )}
            </div>
        );
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.search);
        console.log(this.state.platform);
        let url = `/api/lfg/postings/game/${this.props.game._id}/filter`
        if(!this.state.search && (!this.state.platform || this.state.platform === 'none')) return;
        else if (this.state.search &&  this.state.platform === 'none') url += `?titleSearch=${this.state.search}`;
        else if (!this.state.search && this.state.platform !== 'none') url += `?platform=${this.state.platform}`;
        else if (this.state.search && this.state.platform !== 'none') url += `?titleSearch=${this.state.search}&platform=${this.state.platform}`

        console.log(url);
        axios.get(url)
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        postings: response.data
                    });
                })
                .catch(error => {
                    console.error(error);
                });
    }

    togglePostingFilter = () => {
        this.setState({
            filterPostings: !this.state.filterPostings
        })
    }

    getUserAccounts = () => {
        axios.get('/api/user/platforms')
        .then(response => {
            this.setState({
                accounts: response.data
            });
        })
        .catch(error => {
            console.error(error);
        })
    }
    
}

export default PostingList;