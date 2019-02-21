import React from 'react';
import {Modal, Button, Icon} from 'react-materialize';
import CreateComment from './../forms/CreateComment';

import './styles/Modal.css';

const CreateCommentModal = props => {
  return (
    <Modal
        id='create-comment-modal'
        header='Create New Comment'
        trigger={<Button className="btn-flat" waves='light'>Create New Comment<Icon right>add</Icon></Button>}>
        <CreateComment 
            parentCommentId={props.parentComment._id} 
            threadId={props.thread._id} 
            gameId={props.game._id} 
            userId={props.user._id}
            getThread={props.getThread}
        />
    </Modal>
  );
};

export default CreateCommentModal;