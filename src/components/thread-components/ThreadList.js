import React from 'react';

import CreateThreadModal from './../modals/CreateThreadModal';
import { List } from "./../../components/List";
import ThreadPanel from "./ThreadPanel"

function ThreadList(props) {
    let threadInfo = props.threadInfo;
    return (
        <div>
            <CreateThreadModal getThreads={props.getThreads} game={props.game} user={props.user} />
            {props.threads.length ? (
            <List>
                {props.threads.map(thread => {
                return (
                    <ThreadPanel getThread={props.getThread} key={thread._id} threadInfo={thread} />
                );
                })}
            </List>
            ) : (
            <div>
                <h5>No Threads Yet</h5>
                <p>Be the first to post!</p>
            </div>
            )}
        </div>
    );
}

export default ThreadList;