import React from 'react';
import './NavBar.css';


function NavBar(props) {
  return (
    <nav>
    <div className="nav-wrapper navbar">
      
      {props.loggedIn ? <span className="left" >{props.user.username}</span> : null}
      <a href="/" className="brand-logo">LFGamer</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {props.loggedIn ? <li><a href="/">Browse</a></li> : null}
        {props.loggedIn ? <li><a href="/profile">Profile</a></li> : null}
        {props.loggedIn ? <li><a onClick={props.logout}>Logout</a></li> : null}
      </ul>
    </div>
  </nav>
  );
}

export default NavBar;