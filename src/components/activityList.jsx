import React, { Component } from 'react';
import Activity from './activity';

class ActivityList extends Component {
  render() {
    return (
      <div class="list-group">
        {this.props.activities.map(activity =>
          <Activity
            key={activity.id}
            id={activity.id}
            title={activity.title}
            datetime={activity.datetime}
            onDelete={this.props.onDelete}
          />
        )}
      </div>
    );
  }
}

export default ActivityList;
