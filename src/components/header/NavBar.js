import React from 'react';

function NavBar(props) {
  return (
    <nav>
    <div className="nav-wrapper blue-grey lighten-2">
      <a href="/" className="brand-logo">LFGamer</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/">Browse</a></li>
        <li><a href="/">Profile</a></li>
        {props.loggedIn ? <li><a onClick={props.logout}>Logout</a></li> : null}
      </ul>
    </div>
  </nav>
  );
}

export default NavBar;