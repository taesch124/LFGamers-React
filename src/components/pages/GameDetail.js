import React, {Component} from 'react';
// import Jumbotron from "../components/Jumbotron";

import axios from 'axios';
import ThreadContainer from '../thread-components/ThreadContainer';
import LfgContainer from '../lfg-components/LfgContainer';

import './styles/GameDetail.css';
import GameHeader from '../game-components/GameHeader';



class GameDetail extends Component {
    state = {
            game: '',
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/api/games/${id}`)
        .then(response => {

            this.setState({ game: response.data, chat: "Chat Placeholder"});
            let _id = response.data._id;

            this.getPostings(_id);

        })
        .catch(error => {
            console.error(error);
        });
    }
    
    render(){
        return(
            <div className="container container-fluid">
                <GameHeader 
                    game={this.state.game} 
                />

                <div className="row">
                    <div className="input-field col s12 m6">

                        <ThreadContainer 
                            game={this.state.game} 
                            user={this.props.user}
                        />
                        
                    </div>
                    <div className="input-field col s12 m6">

                        <LfgContainer
                            game={this.state.game}
                            user={this.props.user}
                        />

                    </div>
                </div>
            </div>
        )
    }

    getPostings = (id) => {
        axios.get(`/api/lfg/postings/${id}`)
        .then(response => {
            this.setState({
                lfgPostings: response.data
            })
        })
        .catch(error => {
            console.error(error);
        });
    }
}

export default GameDetail;