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
        axios.get('http://localhost:8080/games')
        .then(response => {
            console.log(response.data);
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
        console.log(this);
        return(
            <div className="container">
                {/* <h1>Welcome {this.props.userSate.currentUser.username}</h1> */}
                <h2>Welcome</h2>
                {this.state.games.map(e => <h3>{e.name}</h3>)}
            </div>
        )
    }

}

export default Home;