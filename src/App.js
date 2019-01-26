import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <Route exact path='/' render={() => ( <Redirect to="/auth/login"/>)}/>
        <Route exact path='/auth/login' component={Login}/>
        <Route exact path='/auth/create-account' component={CreateAccount}/>
        <Route exact path='/home' component={Home} />
        
      </div>
    );
  }

  
}

export default App;