import React, { Component } from 'react';
var moment = require('moment');

class Activity extends Component {

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
    return (
      <div className="list-group-item">
        <div>{this.howLongAgo()}</div>
        <div>
          <div>{this.props.title}</div>
          <div>{moment(this.props.datetime).format('DD/MM/YY, HH:mm')}</div>
          <button
            onClick={() => this.props.onDelete(this.props.id)}
          >Delete</button>
        </div>
      </div>
    );
  }
}

export default Activity;
