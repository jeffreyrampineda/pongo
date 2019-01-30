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

import axios from 'axios';
const moment = require('moment');

class App extends Component {

  activitiesUrl = 'http://localhost:3001/api/activities';

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isCreatingActivity: false,
      newTitle: "",
      newDatetime: new Date(),
      loading: false,
    };
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  //-------------------------------------------------------------

  handleCreateActivity = _ => {
    axios.post(this.activitiesUrl, {
      title: this.state.newTitle,
      datetime: this.state.newDatetime
    })
    .then(response => {
      if(response.status===200) {
        const activities = this.state.activities;
        activities.push(response.data);
    
        this.setState({ activities });
        this.toggleCreateActivity();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUpdateActivity = updatedActivity => {
    axios.put(`${this.activitiesUrl}/${updatedActivity._id}`, updatedActivity)
    .then(response => {
      if(response.status===200) {
        const activityIndex = this.state.activities.findIndex(a => a._id === updatedActivity._id);
        const activities = this.state.activities;
        activities[activityIndex] = updatedActivity;

        this.setState({ activities });
      }
    })
  }

  handleDeleteActivity = id => {
    axios.delete(`${this.activitiesUrl}/${id}`)
    .then(response => {
      if(response.status===200) {
        const activities = this.state.activities.filter(a => a._id !== id);
        
        this.setState({ activities });
      }
    })
  }

  getDataFromDb = _ => {
    this.setState({ loading: true });

    axios.get(this.activitiesUrl)
      .then(response => {
        this.setState({ activities: response.data, loading: false })
      })
      .catch(function (error) {
        console.log(error);
      })
  };

//-------------------------------------------------------------

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({[name]: value});
  }

  toggleCreateActivity = _ => {
    this.setState({
      newTitle: "",
      newDatetime: new Date(),
      isCreatingActivity: !this.state.isCreatingActivity });
  };

  //-------------------------------------------------------------

  render() {
    return (
      <React.Fragment>
        <NavBar />
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
            onDelete={this.handleDeleteActivity}
            onUpdate={this.handleUpdateActivity}
          />
        </main>

        {/*-------------------------------------------------------------*/}

        <Dialog 
          open={this.state.isCreatingActivity}
          onClose={this.toggleCreateActivity}
        >
          <DialogTitle id="simple-dialog-title">Create new activity</DialogTitle>
          <DialogContent>
            <TextField
              label="Activity"
              name="newTitle"
              type="text"
              value={this.state.newTitle}
              onChange={this.handleChange} />
            <TextField
              label="Alarm clock"
              type="time"
              defaultValue={moment(this.state.newDatetime).format('HH:mm')}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }} />
          </DialogContent>
          <DialogActions>
            <Button 
              color="primary"
              onClick={() => this.toggleCreateActivity()}
            >Cancel</Button>
            <Button
              color="primary"
              onClick={() => this.handleCreateActivity()}
            >Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default App;
