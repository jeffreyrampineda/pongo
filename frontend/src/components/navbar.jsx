import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Pongo Activities
        </a>
        </nav>
        <hr />
      </div>
    );
  }
}

export default NavBar;
