import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path='/' component={Login}/>
        <Route exact path='/auth/create-account' component={CreateAccount}/>
      </div>
    );
  }
}

export default App;