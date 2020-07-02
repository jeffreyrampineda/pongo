import React, { Component } from 'react';
import NavBar from './components/navbar';
import ActivityList from './components/activityList';
import AddCircle from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { ActivityService } from './services/ActivityService';
const moment = require('moment');

const activityService = new ActivityService();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isCreatingActivity: false,
      newTitle: '',
      newDatetime: new Date(),
      loading: false,
    };
  }

  componentDidMount() {
    this.getActivities();
  }

  //-------------------------------------------------------------

  createActivity = _ => {
    activityService.createActivity(this.state.newTitle, this.state.newDatetime)
      .then(result => {
        if (result) {
          const activities = this.state.activities;
          activities.push(result);

          this.setState({ activities });
          this.toggleCreateActivity();
        }
      }).catch(error => {
        console.log(error);
      });
  }

  updateActivity = (id, updatedActivity) => {
    activityService.updateActivity(id, updatedActivity).then(result => {
      if (result) {
        const activities = this.state.activities.map(activity => {
          if (activity._id === id) {
            activity.title = result.title;
            activity.datetime = result.datetime;
          }
          return activity;
        });
        this.setState({ activities });
      }
    }).catch(error => {
      console.log(error);
    })
  }

  deleteActivity = id => {
    activityService.deleteActivity(id).then(result => {
      if (result) {
        const activities = this.state.activities.filter(a => a._id !== id);
        
        this.setState({ activities });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  getActivities = _ => {
    this.setState({ loading: true });

    activityService.getActivities().then(result => {
        this.setState({ activities: result });
      }).catch(error => {
        console.log(error);
      }).finally(_ => {
        this.setState({ loading: false });
      });
  };

//-------------------------------------------------------------

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({[name]: value});
  }

  handleChangeTime = (event) => {
    
    let value = new Date(this.state.newDatetime);
    const name = event.target.name;
    const hoursMinutes = event.target.value.split(':')

    value.setHours(hoursMinutes[0], hoursMinutes[1])
    this.setState({[name]: value});
  }

  toggleCreateActivity = _ => {
    this.setState({
      newTitle: 'Pee',
      newDatetime: new Date(),
      isCreatingActivity: !this.state.isCreatingActivity });
  };

  //-------------------------------------------------------------

  render() {
    return (
      <React.Fragment>
        <NavBar />

        {/*-------------------------------------------------------------*/}

          <div className="pongo-actions">
            <button
              className="btn btn-link"
              onClick={this.toggleCreateActivity}
            ><AddCircle fontSize="large" /></button>
          </div>

          {/*-------------------------------------------------------------*/}

          <main className="container">
            <ActivityList 
                loading={this.state.loading}
                activities={this.state.activities}
                onDelete={this.deleteActivity}
                onUpdate={this.updateActivity}
              />
          </main>

        {/*-------------------------------------------------------------*/}

        <Dialog 
          open={this.state.isCreatingActivity}
          onClose={this.toggleCreateActivity}
        >
          <DialogTitle id="simple-dialog-title">Create new activity</DialogTitle>
          <DialogContent>
            <form autoComplete="off">
              <FormControl>
                <InputLabel htmlFor="newTitle-simple">Activity</InputLabel>
                <Select
                  label="Activity"
                  name="newTitle"
                  value={this.state.newTitle}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'newTitle',
                    id: 'newTitle-simple',
                  }}
                >
                  <MenuItem value='Pee'>Pee</MenuItem>
                  <MenuItem value='Poop'>Poop</MenuItem>
                  <MenuItem value='Meal'>Meal</MenuItem>
                  <MenuItem value='Walk Start'>Walk Start</MenuItem>
                  <MenuItem value='Walk End'>Walk End</MenuItem>
                  <MenuItem value='Wash Feet'>Wash Feet</MenuItem>
                  <MenuItem value='Wake Up'>Wake Up</MenuItem>
                  <MenuItem value='Sleep'>Sleep</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                  label="Alarm clock"
                  type="time"
                  defaultValue={moment(this.state.newDatetime).format('HH:mm')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }} 
                  name="newDatetime"
                  onChange={this.handleChangeTime}
                />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button 
              color="primary"
              onClick={() => this.toggleCreateActivity()}
            >Cancel</Button>
            <Button
              color="primary"
              onClick={() => this.createActivity()}
            >Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default App;
