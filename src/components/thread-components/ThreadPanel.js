import React from 'react';

function ThreadPanel(props) {
    let threadInfo = props.threadInfo;
    return (
        <div id={threadInfo._id} className="card horizontal">
            <div className="card-content">
                <h6>{threadInfo.originalComment.title}</h6>
                <p>Posted by: {threadInfo.postedBy.username}</p>
                <p>Posted at: {threadInfo.postedAt}</p>
                <p>{threadInfo.originalComment.text}</p>
            </div>
        </div>
    );
}

export default ThreadPanel;