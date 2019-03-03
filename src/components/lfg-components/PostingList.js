import React from 'react';

import { List } from "./../../components/List";
import {Icon} from 'react-materialize';

//import './styles/List.css';
import CreateLfgModal from '../modals/CreateLfgModal';
import PostingPanel from '../lfg-components/PostingPanel';

function PostingList(props) {
    let postings = props.postings;
    return (
        <div className="list">
            <div className="flex-row">
                <div onClick={(e) =>  props.getPostings(props.game._id)}>
                    <Icon>refresh</Icon>
                </div>

                <CreateLfgModal 
                    game={props.game} 
                    user={props.user}
                    getPostings={props.getPostings}
                    joinPostingChat={props.joinPostingChat}
                />
            </div>
            {postings.length > 0 ? (
            <List>
                {postings.map(posting => {
                return (
                    <PostingPanel
                        key={posting._id}
                        id={posting._id}
                        posting={posting}
                        joinPostingChat={props.joinPostingChat}
                    />
                );
                })}
            </List>
            ) : (
            <div>
                <h5>No postings yet</h5>
                <p>Create one now!</p>
            </div>
            )}
        </div>
    );
}

export default PostingList;