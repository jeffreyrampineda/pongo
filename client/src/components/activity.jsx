import React, { Component } from 'react';
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const moment = require('moment');

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      datetime: this.props.datetime,
      isEditting: false,
      anchorEl: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  //-------------------------------------------------------------

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  handleUpdate = () => {
    let updatedActivity = {
      _id: this.props._id,
      title: this.state.title,
      datetime: new Date(moment(this.state.datetime).format('YYYY/MM/DD HH:mm')),
    }

    this.props.onUpdate(updatedActivity);
    this.closeEdit();
  }

  handleDelete = () => {
    this.props.onDelete(this.props._id)
  }

  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  //-------------------------------------------------------------

  howLongAgo() {
    const day = 1440;
    const hour = 60;
    const diff = Math.abs(new Date() - new Date(this.props.datetime));
    const minutes = Math.floor((diff / 1000) / 60);
    var timeAgoString = "";

    // Days
    if (minutes >= day) {
      var days = Math.floor(minutes / day);
      timeAgoString = days + " day" + this.pluralize(days)
    }

    // Hours
    else if (minutes >= hour) {
      var hours = Math.floor(minutes / hour);
      timeAgoString = hours + " hour" + this.pluralize(hours);
    } 
    
    // Minutes
    else {
      timeAgoString = minutes + " minute" + this.pluralize(minutes);
    }

    return timeAgoString + " ago";
  }

  pluralize(number) {
    return number >= 2 ? "s" : "";
  }

  showEdit = () => {
    this.setState({ isEditting: true });
  }

  closeEdit = () => {
    this.setState({ 
      title: this.props.title,
      datetime: this.props.datetime,
      isEditting: false, 
      anchorEl: null 
    });
  }

  //-------------------------------------------------------------

  render() {
    let activity;

    // Check if activity is being editted.
    if (this.state.isEditting) {
      activity =
      <ListItem>
         <TextField
            label="Activity"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <TextField
            label="Alarm clock"
            type="time"
            defaultValue={moment(this.state.datetime).format('HH:mm')}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <DatePicker
            margin="normal"
            label="Date"
            value={this.state.datetime}
          />
          <Button size="small" onClick={this.closeEdit}>Cancel</Button>
          <Button size="small" color="primary" onClick={this.handleUpdate}>Save</Button>
      </ListItem>
    } 

    //-------------------------------------------------------------

    else {
      activity =
      <React.Fragment>
        <ListItem button onClick={this.handleClickMenu}>
          <ListItemText 
            primary={this.props.title}
            secondary={moment(this.props.datetime).format('LT') + ' - ' + this.howLongAgo()} 
          />
        </ListItem>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleCloseMenu} 
        >
          <MenuItem onClick={this.showEdit}>Edit</MenuItem>
          <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
        </Menu>
      </React.Fragment>
    }

    //-------------------------------------------------------------

    return (
      <React.Fragment>
        {activity}
      </React.Fragment>
    );
  }
}

export default Activity;
