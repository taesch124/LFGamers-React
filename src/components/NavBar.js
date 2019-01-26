import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav>
    <div className="nav-wrapper blue-grey lighten-2">
      <a href="/" className="brand-logo">LFGamer</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/">Browse</a></li>
        <li><a href="/">Profile</a></li>
      </ul>
    </div>
  </nav>
  );
}

export default NavBar;