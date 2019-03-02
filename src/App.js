import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import axios from 'axios';

import NavBar from './components/header/NavBar';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import CreateAccount from './components/pages/CreateAccount';
import Home from './components/pages/Home';
import GameDetail from './components/pages/GameDetail';



import './App.css';

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
    axios.get('/')
    .then(connected => {
      axios.get('/api/auth')
      .then(response => {
        if(!response.data.success) this.loginHandler(null);
        else  this.loginHandler(response.data.user);
      })
      .catch(error => {
          console.error(error);
          //this.errorMessage.textContent = error.message;
      });
    })
    .catch(error => {
      console.error(error);
    })
    
  }

  render() {
    return this.state.loaded ? (
      <div className="App">
        <NavBar user={this.state.currentUser} loggedIn={this.state.loggedIn} logout={this.logout}/>
      
        <Route exact path='/' render={(props => <Redirect to="/home"/>)} />
        <Route exact path='/auth/login'  render={props => <Login {...props} loginHandler={this.loginHandler}/>}/>
        <Route exact path='/auth/create-account' component={CreateAccount}/>
        <Route exact path='/home' render={(props) => (
          this.state.loggedIn
          ? <Home user={this.state.currentUser} {...props}/>
          : <Redirect to='/auth/login' />
        )} />
        <Route exact path='/profile' render={(props) => (
          this.state.loggedIn
          ? <Profile user={this.state.currentUser} {...props}/>
          : <Redirect to='/auth/login' />
        )} />
        <Route path='/games/:id' render={(props) => (
          this.state.loggedIn
          ? <GameDetail user={this.state.currentUser} {...props}/>
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

  logout = () => {
    axios.get('/api/auth/logout')
    .then(response => {
      console.log(response.data);
        if(response.data.success) {
          this.loginHandler(null);
        }
    })
    .catch(error => {
        throw error;
    });
  }
  
}



export default App;