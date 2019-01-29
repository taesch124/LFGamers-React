import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NavBar from './components/NavBar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loggedIn: false,
        currentUser: null,
        loaded: false
    };
  }

  componentDidMount() {
    axios.get('/auth')
        .then(response => {
          if(!response.data.success) this.loginHandler(null);
          else  this.loginHandler(response.data.user);
        })
        .catch(error => {
            console.error(error);
            //this.errorMessage.textContent = error.message;
        });
  }

  render() {
    return this.state.loaded ? (
      <div className="App">
        <NavBar />

        <Route exact path='/' render={() => ( <Redirect to="/auth/login"/>)}/>
        <Route exact path='/auth/login'  render={props => <Login {...props} loginHandler={this.loginHandler}/>}/>
        <Route exact path='/auth/create-account' component={CreateAccount}/>
        <Route exact path='/home' render={(props) => (
          this.state.loggedIn
          ? <Home {...props}/>
          : <Redirect to='/auth/login' />
        )} />
        
      </div>
    ) : null;
  }

  loginHandler = (user) => {
    this.setState({
      loggedIn: user ?  true : false,
      currentUser: user,
      loaded: true
    });
  }

  
}



export default App;