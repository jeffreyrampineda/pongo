import React, { Component } from 'react';
import Activity from './activity';

class ActivityList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activities: [{
          title: "test title",
          datetime: new Date('2018/12/05 19:20'),
        }, {
          title: "test title 2",
          datetime: new Date('2018/12/06 19:20'),
        },
      ]
    };
  }


  render() {
    return (
      <div>
        {this.state.activities.map(activity => <Activity title={activity.title} datetime={activity.datetime}/>)}
      </div>
    );
  }
}

export default ActivityList;
