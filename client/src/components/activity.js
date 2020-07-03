import React, { Component } from 'react';
import { DatePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const moment = require('moment');

export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      datetime: this.props.datetime,
      isEditting: false,
      anchorEl: null,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  //-------------------------------------------------------------

  handleTitleChange(event) {
    const value = event.target.value;
    this.setState({ title: value });
  }

  handleTimeChange(event) {
    let datetime = new Date(this.state.datetime);
    const hoursMinutes = event.target.value.split(':')

    datetime.setHours(hoursMinutes[0], hoursMinutes[1]);
    this.setState({ datetime });
  }

  handleDateChange(datetime) {
    this.setState({ datetime })
  }

  handleUpdate = () => {
    let updatedActivity = {
      title: this.state.title,
      datetime: new Date(moment(this.state.datetime).format('YYYY/MM/DD HH:mm')),
    }

    this.props.onUpdate(this.props._id, updatedActivity);
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
    this.setState({
      title: this.props.title,
      datetime: this.props.datetime,
      isEditting: true
    });
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
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <TextField
            label="Alarm clock"
            type="time"
            value={moment(this.state.datetime).format('HH:mm')}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={this.handleTimeChange}
          />
          <DatePicker
            label="Date"
            value={this.state.datetime}
            onChange={this.handleDateChange}
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
