import React, { Component } from 'react';
import Activity from './activity';

class ActivityList extends Component {
  render() {
    const isEmpty = this.props.activities.length === 0;
    let list;
    
    if (isEmpty) {
      list =
        <div style={{ textAlign: "center" }}>
          <h1 className="mt-5">No activities!</h1>
        </div>;
    } else {

      // Sort activities list by date then map
      // each activities into individual components
      list =
        <div className="list-group">
          {this.props.activities.sort(
            (a, b) => { return new Date(b.datetime) - new Date(a.datetime) }
          ).map(activity =>
            <Activity
              key={activity.id}
              id={activity.id}
              title={activity.title}
              datetime={activity.datetime}
              showDelete={this.props.showDelete}
              onDelete={this.props.onDelete}
              showEdit={this.props.showEdit}
              onEdit={this.props.onEdit}
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
