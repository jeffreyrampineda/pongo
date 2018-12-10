import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var moment = require('moment');

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      datetime: this.props.datetime
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reset() {
    this.setState({
      title: this.props.title,
      datetime: this.props.datetime
    });
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    let newActivity = {
      id: this.props.id,
      title: this.state.title,
      datetime: new Date(moment(this.state.datetime).format('YYYY/MM/DD HH:mm')),
      isEditting: false,
    }

    this.props.onSave(newActivity);
    event.preventDefault();
  }

  howLongAgo() {
    const day = 1440;
    const hour = 60;
    const diff = Math.abs(new Date() - this.props.datetime);
    const minutes = Math.floor((diff / 1000) / 60);
    var timeAgoString = "";

    // Days
    if (minutes >= day) {
      var days = Math.floor(minutes / day);
      timeAgoString = days + " day" + this.pluralize(days)

      // Hours
    } else if (minutes >= hour) {
      var hours = Math.floor(minutes / hour);
      timeAgoString = hours + " hour" + this.pluralize(hours);

      // Minutes
    } else {
      timeAgoString = minutes + " minute" + this.pluralize(minutes);
    }

    return timeAgoString + " ago";
  }

  pluralize(number) {
    return number >= 2 ? "s" : "";
  }

  render() {
    let activity;

    if (this.props.isEditting) {
      activity =
        <form onSubmit={this.handleSubmit}>
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
            type="submit"
          ><FontAwesomeIcon icon="check" /></button>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.reset();
              this.props.onCancel(this.props.id);
            }}
          ><FontAwesomeIcon icon="times" /></button>
        </form>

    } else {
      activity =
        <div>
          <div>{this.howLongAgo()}</div>
          <div>{this.props.title}</div>
          <div>{moment(this.props.datetime).format('DD/MM/YY, HH:mm')}</div>
          {this.props.showDelete &&
            <button
              className="btn btn-danger"
              onClick={() => this.props.onDelete(this.props.id)}
            ><FontAwesomeIcon icon="minus" /></button>
          }
          {this.props.showEdit &&
            <button
              className="btn btn-primary"
              onClick={() => this.props.onEdit(this.props.id)}
            ><FontAwesomeIcon icon="edit" /></button>
          }
        </div>
    }

    return (
      <div className="list-group-item">
        {activity}
      </div>
    );
  }
}

export default Activity;
