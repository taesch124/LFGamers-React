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
            accounts: [],
            platform: 'none',
            account: '',
            playerLimit: 0,
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            validationMessage: ''
        }
    }

    componentDidMount() {
        $('select').formSelect();
        this.getUserAccounts();
    }

    render() {
        return (
            <div className="row">
                <Row>
                    <Input
                        s={12}
                        type="text"
                        label="Title"
                        value={this.state.title}
                        name="title"
                        placeholder="Enter a title"
                        onChange={this.onChange}
                    />
                </Row>
                <Row>
                    <Input
                        s={12}
                        type="textarea"
                        label="Description"
                        value={this.state.description}
                        name="description"
                        placeholder="Enter description"
                        onChange={this.onChange}    
                    />
                </Row>
                <Row>
                    <div 
                        className="input-field col s12 player-limit-select"
                        
                    >
                        <select 
                            name="playerLimit"
                            value={this.state.playerLimit}
                            onChange={this.onPlayerLimitChange}
                        >
                            <option value={0} defaultValue disabled>Select an option</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                        </select>
                        <label>Player Limit</label>
                    </div>
                </Row>
                <Row>
                    <div className="col s12">
                        <div className="input-field">
                            <select 
                                name="platform"
                                className="platform-select"
                                value={this.state.platform}
                                onChange={this.onChange}
                            >
                                <option key="none" value="none" defaultValue disabled>Select one</option>
                                {this.state.accounts.map(e => {
                                    console.log(e);
                                    return (
                                        <option 
                                            key={e.platform}
                                            value={e.platform}
                                        >{e.platform}
                                        </option>
                                    )
                                })}
                                
                            </select>
                            <label>Platform</label>
                        </div>
                    </div>
                </Row>
                <Row>
                    <Input
                        s={12}
                        m={6}
                        name='startDate' 
                        value={this.state.startDate}
                        type='date' 
                        onChange={this.onChange} 
                        label="Start Date"
                    />
                    <Input
                        s={12}
                        m={6}
                        name="startTime"
                        value={this.state.startTime}
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
                        value={this.state.endDate}
                        type='date' 
                        onChange={this.onChange} 
                        label="End Date"
                    />
                    <Input
                        s={12}
                        m={6}
                        name="endTime"
                        value={this.state.endTime}
                        type="time"
                        onChange={this.onChange}
                        label="End Time"
                    />
                </Row>
                <Row>
                    <span className="helper-text">{this.state.validationMessage}</span>
                </Row>
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

    onPlayerLimitChange = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        });
    }

    validateInput = () => {
        if(!this.state.title) {
            this.setState({
                validationMessage: 'Posting must have a title'
            });
            return false;
        }
        else if(!this.state.description) {
            this.setState({
                validationMessage: 'Posting must have a description'
            });
            return false;
        } 
        else if(this.state.playerLimit === 0) {
            this.setState({
                validationMessage: 'Posting requires at least 2 players'
            })
        } else if(!this.state.startDate) {
            this.setState({
                validationMessage: 'Posting must have a start date'
            });
        }
        else if(!this.state.startTime) {
            this.setState({
                validationMessage: 'Posting must have a start time'
            });
        }
        else {
            this.setState({
                validationMessage: ''
            });
            return true;
        }
    }

    getUserAccounts = () => {
        axios.get('/api/user/platforms')
        .then(response => {
            console.log(response.data);
            this.setState({
                accounts: response.data
            }, () => {
                $('.platform-select').formSelect();
            });
        })
        .catch(error => {
            console.error(error);
        })
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
            description: this.state.description,
            playerLimit: this.state.playerLimit,
            startDate: this.state.startDate,
            startTime: this.state.startTime,
            endDate: this.state.endDate,
            endTime: this.state.endTime
        };

        axios.post(`/api/lfg/postings/create`,
        data)
        .then(results => {
            if($('#create-lfg-modal').isOpen) {
                $('#create-lfg-modal').modal('close');
            }
            
            this.setState({
                title: '',
                description: '',
                playerLimit: 0,
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null,
                validationMessage: ''
            });
            
        })
        .catch(error => {
            console.error(error);
        });
    }
}

export default CreateLfgPosting;