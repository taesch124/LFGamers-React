import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: []
        }
    }

    componentWillMount() {
        axios.get('/games')
        .then(response => {
            this.setState({
                games: response.data
            });
        })
        .catch(error => {
            console.error(error);
            //this.errorMessage.textContent = error.message;
        });
    }

    render() {
        console.log(this.props);
        return(
            <div className="container">
                <h2>Welcome {this.props.user.username}</h2>
                {this.state.games.map(e => <h3 key={e.id}>{e.name}</h3>)}
                <button onClick={this.getUser}>User</button>
            </div>
        )
    }

    getUser = () => {
        axios.get('/auth')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
            //this.errorMessage.textContent = error.message;
        });
    }

}

export default Home;