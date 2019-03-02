import React, {Component} from 'react';
import moment from 'moment';

import {Button} from 'react-materialize';

import './styles/PostingPanel.css'

class PostingPanel extends Component {
    
    render() {
        let posting = this.props.posting;
        return (
            <div className="posting-card card ">
                <div className="row row-fluid flex-row left-align no-margin">
                    <div className="col s8">
                        <h5>{posting.title}</h5>
                        <p>{posting.description}</p>
                        <div>
                            <span>Start: {moment(posting.startDate).format("MM/DD/YYYY HH:mm A")}</span>
                            {posting.endDate ? <span> - End: {moment(posting.endDate).format("MM/DD/YYYY HH:mm A")}</span> : null}
                        </div>
                        <p>Platform: {posting.platform.name}</p>
                        <p>Player Limit: {posting.playerLimit}</p>
                        
                        {posting.players.length === 0 ?
                        null :
                        <div>
                            <p>Players:</p>
                            <li>{posting.players.map(e => <ul key={e._id}>{e.username}</ul>)}</li>
                        </div>
                        }
                        <p className="posted-by">By: {posting.postedBy.username}</p>
                        <p className="posted-at">At: {moment(posting.postedAt).format("MM/DD/YYYY HH:mm A")}</p>
                    </div>
                    
                    <div className="col s4 flex-column">
                        <div onClick={e => this.props.joinPostingChat(posting._id)}>
                            <Button>Join</Button>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

    
}

export default PostingPanel;