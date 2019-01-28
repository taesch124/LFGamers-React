import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NavBar from './components/NavBar';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loggedIn: false,
        currentUser: null
    };
  }

  render() {
    return (
      <div className="App">
        <NavBar />

        <Route exact path='/' render={() => ( <Redirect to="/auth/login"/>)}/>
        <Route exact path='/auth/login'  render={props => <Login {...props} loginHandler={this.loginHandler}/>}/>
        <Route exact path='/auth/create-account' component={CreateAccount}/>
        <Route render={(props) => (
          this.state.loggedIn
          ? <Home {...props}/>
          : <Redirect to='/auth/login' />
        )} />
        
      </div>
    );
  }

  loginHandler = (user) => {
    console.log(user);
    this.setState({
      loggedIn: user ?  true : false,
      currentUser: user
    });
  }

  
}



export default App;