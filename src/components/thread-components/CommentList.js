import React from 'react';

import { List } from "./../../components/List";
import ThreadPanel from './ThreadPanel';

function ThreadList(props) {
    console.log(props);
    return (
        <div>
            <ThreadPanel 
                getThread={null}
                threadInfo={props.thread}
            />
            <p>Comments coming</p>
        </div>
    );
}

export default ThreadList;