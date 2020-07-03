import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import Activity from './activity';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

const moment = require('moment');

export default class ActivityList extends Component {
  render() {
    const isEmpty = this.props.activities.length === 0;
    let list;

    // Check if there are activities to show.
    if (isEmpty) {
      list =
      <div style={{ textAlign: "center", marginBottom: '60px' }}>
        <h1 className="mt-5">No activities!</h1>
      </div>
    }
    
    //-------------------------------------------------------------
    
    else {

      // Date to use as reference for grouping activities
      // with the same day, month, and year.
      let date = new Date('May 12, 1996');

      // Sort activities list by date then map
      // each activities into individual components.
      list =
      <React.Fragment>
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
            dateHeader = <ListSubheader style={{ textAlign: "center" }}><Divider />{moment(date).format('YYYY/MM/DD')}</ListSubheader>
          }

          // Complete group of a single Activity component.
          return (
            <React.Fragment key={activity._id}>
              {dateHeader}
              <Activity
                _id={activity._id}
                title={activity.title}
                datetime={activity.datetime}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
              />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    }

    if (this.props.loading) {
      list = <CircularProgress />
    }

    //-------------------------------------------------------------

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper square>
          <List>
            {list}
          </List>
        </Paper>
      </MuiPickersUtilsProvider>
    );
  }
}
