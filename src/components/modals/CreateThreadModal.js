import React from 'react';
import {Modal, Button, Icon} from 'react-materialize';
import CreateThread from './../forms/CreateThread';

const CreateThreadModal = props => {
  return (
    <Modal
        id='create-thread-modal'
        header='Create New Thread'
        trigger={<Button waves='light'>Create New Thread<Icon right>add</Icon></Button>}>
        <CreateThread getThreads={props.getThreads} gameId={props.game._id} userId={props.user._id} />
    </Modal>
  );
};

export default CreateThreadModal;