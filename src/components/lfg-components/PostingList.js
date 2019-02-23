import React from 'react';

import { List } from "./../../components/List";

//import './styles/List.css';
import CreateLfgModal from '../modals/CreateLfgModal';

function PostingList(props) {
    return (
        <div className="list">
            <CreateLfgModal 
                game={props.game} 
                user={props.user} 
            />
            {props.postings ? (
            <List>
                {props.postings.map(posting => {
                return ( null
                    // <CommentPanel
                    //     level={0}
                    //     key={comment._id} 
                    //     commentInfo={comment}
                    //     getThread={props.getThread} 
                    //     thread={props.thread} 
                    //     parentComment={props.thread.originalComment} 
                    //     game={props.game} 
                    //     user={props.user} />
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