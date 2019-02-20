import React, {Component} from 'react';
import {Input, Button} from 'react-materialize';
import axios from 'axios';
const $ = window.$;

class CreateThread extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
        }
    }

    componentWillUnmount(){
        this.setState({title:"",text:""})
    }
    render() {
        return (
            <div className="row">
                <Input 
                    s={12}
                    type="text"
                    value={this.state.title}
                    label="Title"
                    name="title"
                    placeholder="Enter thread title"
                    onChange={this.onChange}
                />
                <Input
                    s={12}
                    type="textarea"
                    label="Comment"
                    value={this.state.text}
                    name="text"
                    placeholder="Enter thread body"
                    onChange={this.onChange}    
                />
                <Button onClick={this.onSubmit} onSubmit={this.onSubmit}>Submit</Button>
            </div>
        );
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = {
            userId: this.props.userId,
            gameId: this.props.gameId,
            title: this.state.title,
            text: this.state.text,
        };

        axios.post('/threads/create', data)
        .then(results => {

            this.setState({
                title: '',
                text: '',
            }, () => {
                $('#create-thread-modal').modal('close');
                this.props.getThreads(this.props.gameId);
            });
            
            
        })
        .catch(error => {
            console.error(error);
        });
    }
}

export default CreateThread;