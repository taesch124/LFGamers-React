import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import NavBar from './components/header/NavBar';
import Login from './components/pages/Login';
import CreateAccount from './components/pages/CreateAccount';
import Home from './components/pages/Home';
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
        <NavBar loggedIn={this.state.loggedIn} logout={this.logout}/>
      
        <Route exact path='/' render={(props => <Redirect to="/home"/>)} />
        <Route exact path='/auth/login'  render={props => <Login {...props} loginHandler={this.loginHandler}/>}/>
        <Route exact path='/auth/create-account' component={CreateAccount}/>
        <Route exact path='/home' render={(props) => (
          this.state.loggedIn
          ? <Home user={this.state.currentUser} {...props}/>
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
    axios.get('/auth/logout')
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