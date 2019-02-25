import React from 'react';

import CreateThreadModal from './../modals/CreateThreadModal';
import { List } from "./../../components/List";
import ThreadPanel from "./ThreadPanel";
import {Icon} from 'react-materialize';

import './styles/List.css';

function ThreadList(props) {
    let threadInfo = props.threadInfo;
    return (
        <div className="list">
            <div className="flex-row">
                <div onClick={e => props.getThreads(props.game._id)}>
                    <Icon>refresh</Icon>
                </div>

                <CreateThreadModal 
                    getThreads={props.getThreads} 
                    game={props.game} 
                    user={props.user} 
                />
            </div>
            
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