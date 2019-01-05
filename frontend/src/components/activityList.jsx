import React, { Component } from 'react';
import Activity from './activity';
var moment = require('moment');

class ActivityList extends Component {
  render() {
    const isEmpty = this.props.activities.length === 0;
    let list;

    // Check if there are activities to show.
    if (isEmpty) {
      list =
        <div style={{ textAlign: "center" }}>
          <h1 className="mt-5">No activities!</h1>
        </div>;
    } else {

      // Date to use as reference for grouping activities
      // with the same day, month, and year.
      let date = new Date('May 12, 1996');

      // Sort activities list by date then map
      // each activities into individual components.
      list =
        <div className="list-group">
          {this.props.activities.sort(

            // Sort activities list by date.
            (a, b) => { return new Date(b.datetime) - new Date(a.datetime) }
          ).map(activity => {
            let activityDate = new Date(activity.datetime);
            let dateHeader;

            // Group together activities under the same date (dateHeader)
            if (date.getDate() !== activityDate.getDate() ||
              date.getMonth() !== activityDate.getMonth() ||
              date.getFullYear() !== activityDate.getFullYear()) {
              date = activityDate;
              dateHeader = <div>{moment(date).format('YYYY/MM/DD')}</div>
            }

            // Complete group of a single Activity component.
            return <div key={activity._id}>
              {dateHeader}
              <Activity
                id={activity._id}
                title={activity.title}
                datetime={activity.datetime}
                showDelete={this.props.showDelete}
                onDelete={this.props.onDelete}
                showEdit={this.props.showEdit}
                onEdit={this.props.onEdit}
                isEditting={activity.isEditting}
                onSave={this.props.onSave}
                onCancel={this.props.onCancel}
              />
            </div>
          })}
        </div>;
    }

    //-------------------------------------------------------------

    return (
      <React.Fragment>
        {list}
      </React.Fragment>
    );
  }
}

export default ActivityList;
