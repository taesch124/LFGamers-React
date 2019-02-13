import React, {Component} from 'react';
import {Input, Button} from 'react-materialize';
import axios from 'axios';

class CreateThread extends Component  {
    render() {
        console.log('user: ' + this.props.user);
        return (
            <div className="row">
                <Input 
                    s={12}
                    type="text"
                    label="Title"
                    placeholder="Enter thread title"
                />
                <Input
                    s={12}
                    type="textarea"
                    label="Comment"
                    placeholder="Enter thread body"    
                />
                <Button onClick={this.onSubmit} onSubmit={this.onSubmit}>Submit</Button>
            </div>
        );
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.gameId);
        console.log(this.props.userId);
        let data = {
            userId: this.props.userId,
            gameId: this.props.gameId,
            title: 'test',
            text: 'test comment',
        };

        axios.post('/threads/create', data)
        .then(results => {
            console.log(results);
        })
        .catch(error => {
            console.error(error);
        });
    }
}

export default CreateThread;