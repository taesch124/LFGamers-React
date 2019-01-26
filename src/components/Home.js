import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '', 
            password: ''
        };
    }

    render() {
        return(
            <div className="container">
                <h1>Home page</h1>
            </div>
        )
    }

}

export default Home;