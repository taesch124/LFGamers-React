import React from 'react';
import moment from 'moment';

function ThreadPanel(props) {
    let threadInfo = props.threadInfo;
    return (
        <div onClick={e => props.getThread(threadInfo._id)} id={threadInfo._id} className="card horizontal">
            <div className="card-content">
                <h6>{threadInfo.originalComment.title}</h6>
                <p>Posted by: {threadInfo.postedBy.username}</p>
                <p>Posted at: {moment(threadInfo.postedAt).format("MM/DD/YYYY HH:mm A")}</p>
                <p>{threadInfo.originalComment.text}</p>
            </div>
        </div>
    );
}

export default ThreadPanel;