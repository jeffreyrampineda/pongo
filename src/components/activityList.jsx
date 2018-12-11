import React, { Component } from 'react';
import Activity from './activity';
var moment = require('moment');

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

      let date = new Date('May 12, 1996');

      // Sort activities list by date then map
      // each activities into individual components
      list =
        <div className="list-group">
          {this.props.activities.sort(
            (a, b) => { return new Date(b.datetime) - new Date(a.datetime) }
          ).map(activity => {
            let activityDate = new Date(activity.datetime);
            let dateComponent;

            // Group together activities under the same date (dateComponent)
            if (date.getDate() !== activityDate.getDate() ||
              date.getMonth() !== activityDate.getMonth() ||
              date.getFullYear() !== activityDate.getFullYear()) {
              date = activity.datetime;
              dateComponent = <div>{moment(date).format('YYYY/MM/DD')}</div>
            }
            return <div key={activity.id}>
              {dateComponent}
              <Activity
                id={activity.id}
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

    return (
      <React.Fragment>
        {list}
      </React.Fragment>
    );
  }
}

export default ActivityList;
