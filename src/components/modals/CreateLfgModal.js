import React from 'react';
import {Modal, Button, Icon} from 'react-materialize';
import CreateLfgPosting from './../forms/CreateLfgPosting';

import './styles/Modal.css';

const CreateLfgModal = props => {
  return (
    <Modal
        id='create-lfg-modal'
        header='Create New LFG Posting'
        trigger={<Button className="btn-flat" waves='light'>Create New Posting<Icon right>add</Icon></Button>}>
        <CreateLfgPosting  gameId={props.game._id} userId={props.user._id} />
    </Modal>
  );
};

export default CreateLfgModal;