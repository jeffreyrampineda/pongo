import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class NavBar extends Component {
  render() {
    return (
      <div className="container">
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h2" color="inherit">
              Pongo
            </Typography>
          </Toolbar>
        </AppBar>
        <hr />
      </div>
    );
  }
}

export default NavBar;
