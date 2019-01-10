import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
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
        <div>
          <label>
            Name:
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange} />
            <input
              name="datetime"
              type="datetime-local"
              value={this.state.datetime}
              min="2018-06-07T00:00" max="2018-06-14T00:00"
              onChange={this.handleChange} />
          </label>
          <button
            className="btn btn-success"
            onClick={() => this.handleUpdate()}
          ><CheckIcon /></button>
          <button
            className="btn btn-danger"
            onClick={() => this.toggleEditting()}
          ><CancelIcon /></button>
        </div>

    } 

    //-------------------------------------------------------------

    else {
      activity =
        <div>
          <div>{this.howLongAgo()}</div>
          <div>{this.props.title}</div>
          <div>{moment(this.props.datetime).format('HH:mm')}</div>

          {/* If deleting */}
          {this.props.showDelete &&
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete()}
            ><DeleteIcon /></button>
          }

          {/* If Editting */}
          {this.props.showEdit &&
            <button
              className="btn btn-primary"
              onClick={() => this.toggleEditting()}
            ><EditIcon /></button>
          }
        </div>
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
