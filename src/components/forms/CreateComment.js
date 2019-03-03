import React, {Component} from 'react';
import {Input, Button} from 'react-materialize';
import axios from 'axios';
const $ = window.$;

class CreateComment extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            validationMessage: ''
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
                    type="textarea"
                    label="Comment"
                    value={this.state.text}
                    name="text"
                    placeholder="Enter comment body"
                    onChange={this.onChange}    
                />
                <span className="helper-text">{this.state.validationMessage}</span>
                <Button className="btn-flat submit-comment" onClick={this.onSubmit} onSubmit={this.onSubmit}>Submit</Button>
                {this.props.toggleCommentForm ?
                <Button className="btn-flat close-comment-form" onClick={this.props.toggleCommentForm}>Close</Button> :
                null}
            </div>
        );
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validateInput = () => {
        if(!this.state.text) {
            this.setState({
                validationMessage: 'Comment must have text'
            });
            return false;
        } else {
            this.setState({
                validationMessage: ''
            });
            return true;
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.validateInput()) return;
        let data = {
            userId: this.props.userId,
            gameId: this.props.gameId,
            parentComment: this.props.parentCommentId,
            title: this.state.title,
            text: this.state.text,
        };

        axios.post(`/api/threads/${data.parentComment}/comments/create`,
        data)
        .then(results => {
            //debugger;
            
            this.setState({
                text: ''
            }, () => {
                if($(! '#create-comment-modal').isOpen) this.props.toggleCommentForm();
                else $('#create-comment-modal').modal('close');
                this.props.getThread(this.props.threadId);
                console.log(results);
            });
            
        })
        .catch(error => {
            console.error(error);
        });
    }
}

export default CreateComment;