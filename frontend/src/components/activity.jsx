import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';
var moment = require('moment');

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      datetime: this.props.datetime,
      isEditting: false
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

  handleUpdate() {
    let updatedActivity = {
      _id: this.props._id,
      title: this.state.title,
      datetime: new Date(moment(this.state.datetime).format('YYYY/MM/DD HH:mm')),
    }

    this.props.onUpdate(updatedActivity);
    this.toggleEditting();
  }

  handleDelete() {
    this.props.onDelete(this.props._id)
  }

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

  toggleEditting() {
    this.setState({
      title: this.props.title,
      datetime: this.props.datetime,
      isEditting: !this.state.isEditting 
    });
  }

  //-------------------------------------------------------------

  render() {
    let activity;

    // Check if activity is being editted.
    if (this.state.isEditting) {
      activity =
      <Grid container spacing={12}>
        <Grid item xs={10}>
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
        </Grid>
        <Grid item xs={2}>
          <button
            className="btn btn-success"
            onClick={() => this.handleUpdate()}
          ><CheckIcon /></button>
          <button
            className="btn btn-danger"
            onClick={() => this.toggleEditting()}
          ><CancelIcon /></button>
        </Grid>
      </Grid>
    } 

    //-------------------------------------------------------------

    else {
      activity =
      <Grid container spacing={12}>
        <Grid item xs={8}>
          <div>{this.howLongAgo()}</div>
          <div>{this.props.title}</div>
          <div>{moment(this.props.datetime).format('HH:mm')}</div>
        </Grid>
        <Grid item xs={4}>
          {/* If deleting */}
          {this.props.showDelete &&
            <button
              className="btn btn-danger float-right"
              onClick={() => this.handleDelete()}
            ><DeleteIcon /></button>
          }

          {/* If Editting */}
          {this.props.showEdit &&
            <button
              className="btn btn-primary float-right"
              onClick={() => this.toggleEditting()}
            ><EditIcon /></button>
          }
        </Grid>
      </Grid>
    }

    //-------------------------------------------------------------

    return (
      <div className="list-group-item">
        {activity}
      </div>
    );
  }
}

export default Activity;
