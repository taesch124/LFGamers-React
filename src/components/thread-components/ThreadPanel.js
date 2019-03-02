import React from 'react';
import moment from 'moment';

import './styles/CommentPanel.css'

function ThreadPanel(props) {
    let threadInfo = props.threadInfo;
    return (
        <div onClick={e => props.getThread ? props.getThread(threadInfo._id) : e.preventDefault(e)} id={threadInfo._id} className="card horizontal left-align">
            <div className="card-content">
                <h5>{threadInfo.originalComment.title}</h5>
                <h6>{threadInfo.originalComment.text}</h6>
                <p className="comment-by">By: {threadInfo.postedBy.username}</p>
                <p className="comment-at">At: {moment(threadInfo.postedAt).format("MM/DD/YYYY HH:mm A")}</p>
            </div>
        </div>
    );
}

export default ThreadPanel;