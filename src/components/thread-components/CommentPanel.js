import React , {Component} from 'react';
import moment from 'moment';
import CreateComment from './../forms/CreateComment';
import {Button} from 'react-materialize';

import './styles/CommentPanel.css';

class CommentPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reply: false
        }
    }
    render() {
        let commentInfo = this.props.commentInfo;
        return (
            <div className={`comment-card card horizontal left-align ${this.props.level % 2 === 1 ? 'shaded': null}`}>
                <div className="card-content">
                    <h5>{commentInfo.title}</h5>
                    <h6>{commentInfo.text}</h6>
                    {commentInfo.postedBy ? <p className="comment-by">By: {commentInfo.postedBy.username} </p> : null}
                    <p className="comment-at">At: {moment(commentInfo.postedAt).format("MM/DD/YYYY HH:mm A")}</p>
                    
                    {this.props.originalComment 
                    ? null 
                    : !this.state.reply ? 
                        <Button className="btn-flat reply-button" onClick={this.toggleCommentForm}>Reply</Button>
                        : <CreateComment 
                        parentCommentId={this.props.commentInfo._id} 
                        threadId={this.props.thread._id} 
                        gameId={this.props.game._id} 
                        userId={this.props.user._id}
                        getThread={this.props.getThread}
                        toggleCommentForm={this.toggleCommentForm}
                        />
                    }
                    {!this.props.originalComment ? commentInfo.children.length > 0 ?
                        commentInfo.children.map(e => {
                            return (<CommentPanel
                                level={this.props.level + 1}
                                key={e._id} 
                                commentInfo={e}
                                getThread={this.props.getThread} 
                                thread={this.props.thread} 
                                parentComment={commentInfo} 
                                game={this.props.game} 
                                user={this.props.user} />)
                        }) : null : null
                    }
                </div>
            </div>
        );
    }

    toggleCommentForm = () => {
        this.setState({
            reply: !this.state.reply
        });
    }

    createChildPanel = (child) => {
        return (<CommentPanel 
            key={child._id} 
            commentInfo={child}
            getThread={this.props.getThread} 
            thread={this.props.thread} 
            parentComment={child} 
            game={this.props.game} 
            user={this.props.user} 
        />)
    }
}

export default CommentPanel;