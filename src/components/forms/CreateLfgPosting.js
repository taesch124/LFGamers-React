import React, {Component} from 'react';
import {Input, Button, Row} from 'react-materialize';
import axios from 'axios';
const $ = window.$;

class CreateLfgPosting extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            playerLimit: 0,
            startDate: new Date(),
            startTime: null,
            endDate: null,
            endTime: null,
            validationMessage: ''
        }
    }

    componentDidMount() {
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
                    label="Title"
                    value={this.state.title}
                    name="title"
                    placeholder="Enter a title"
                    onChange={this.onChange}
                />
                <Input
                    s={12}
                    type="textarea"
                    label="Description"
                    value={this.state.description}
                    name="description"
                    placeholder="Enter description"
                    onChange={this.onChange}    
                />
                <Row>
                    <Input
                        s={12}
                        m={6}
                        name='startDate' 
                        type='date' 
                        onChange={this.onChange} 
                        label="Start Date"
                    />
                    <Input
                        s={12}
                        m={6}
                        name="startTime"
                        type="time"
                        onChange={this.onChange}
                        label="Start Time"
                    />
                </Row>
                <Row>
                <Input
                        s={12}
                        m={6}
                        name='endDate' 
                        type='date' 
                        onChange={function(e, value) {}} 
                        label="End Date"
                    />
                    <Input
                        s={12}
                        m={6}
                        name="endTime"
                        type="time"
                        onChange={function(e, value) {}}
                        label="End Time"
                    />
                </Row>
                <span className="helper-text">{this.state.validationMessage}</span>
                <Button className="btn-flat submit-comment" onClick={this.onSubmit} onSubmit={this.onSubmit}>Submit</Button>
                <Button className="btn btn-flat" onClick={this.checkState} >Check state</Button>
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
        if(!this.state.title) {
            this.setState({
                validationMessage: 'Posting must have a title'
            });
            return false;
        } else {
            this.setState({
                validationMessage: ''
            });
            return true;
        }
    }

    checkState = () => {
        console.log(this.state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.validateInput()) return;
        let data = {
            userId: this.props.userId,
            gameId: this.props.gameId,
            title: this.state.title,
            text: this.state.description,
        };

        console.log(data);

        // axios.post(`/threads/${data.parentComment}/comments/create`,
        // data)
        // .then(results => {
        //     if($('#create-comment-modal').isOpen) {
        //         $('#create-comment-modal').modal('close');
        //     } else {
                
        //     }
            
        //     this.setState({
        //         text: ''
        //     }, () => {
        //         if($(! '#create-comment-modal').isOpen) this.props.toggleCommentForm();
        //         this.props.getThread(this.props.threadId);
        //         console.log(results);
        //     });
            
        // })
        // .catch(error => {
        //     console.error(error);
        // });
    }
}

export default CreateLfgPosting;