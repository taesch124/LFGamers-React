import React from 'react';

import { List } from "./../../components/List";
import CommentPanel from './CommentPanel';
import CreateCommentModel from './../modals/CreateCommentModal';

import './styles/List.css';

function CommentList(props) {
    let originalComment = props.thread.originalComment;
    return (
        <div className="list">
            <CommentPanel
                commentInfo={originalComment}
                originalComment={true}
            />
            <CreateCommentModel 
                getThread={props.getThread} 
                thread={props.thread} 
                parentComment={props.thread.originalComment} 
                game={props.game} 
                user={props.user} 
            />
            {props.thread.originalComment.children.length ? (
            <List>
                {props.thread.originalComment.children.map(comment => {
                return (
                    <CommentPanel
                        level={0}
                        key={comment._id} 
                        commentInfo={comment}
                        getThread={props.getThread} 
                        thread={props.thread} 
                        parentComment={props.thread.originalComment} 
                        game={props.game} 
                        user={props.user} />
                );
                })}
            </List>
            ) : (
            <div>
                <h5>No comments Yet</h5>
                <p>Be the first to post!</p>
            </div>
            )}
        </div>
    );
}

export default CommentList;