import React, { Component } from 'react';
import Activity from './activity';

class ActivityList extends Component {
  render() {
    const isEmpty = this.props.activities.length === 0;
    let list;

    if (isEmpty) {
      list = 
      <div style={{textAlign: "center"}}>
        <h1 className="mt-5">No activities!</h1>
      </div>;
    } else {
      list =
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
        </div>;
    }

    return (
      <React.Fragment>
        {list}
      </React.Fragment>
    );
  }
}

export default ActivityList;
