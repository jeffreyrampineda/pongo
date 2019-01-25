import React, { Component } from 'react';
import NavBar from './components/navbar';
import ActivityList from './components/activityList';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

class App extends Component {

  activitiesUrl = 'http://localhost:3001/api/activities';

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      showDelete: false,
      showEdit: false,
      isCreatingActivity: false,
      newTitle: "",
      newDatetime: new Date(),
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
    axios.get(this.activitiesUrl)
      .then(response => {
        this.setState({ activities: response.data })
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

  toggleEditActivity = _ => {
    this.setState({ showEdit: !this.state.showEdit, showDelete: false })
  }

  toggleDeleteActivity = _ => {
    this.setState({ showDelete: !this.state.showDelete, showEdit: false });
  }

  //-------------------------------------------------------------

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="pongo-actions">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="btn btn-link"
                onClick={this.toggleCreateActivity}
              ><AddBoxIcon /></button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link"
                onClick={this.toggleDeleteActivity}
              ><DeleteIcon /></button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link"
                onClick={this.toggleEditActivity}
              ><EditIcon /></button>
            </li>
          </ul>
        </div>

        {/*-------------------------------------------------------------*/}

        <main className="container">
          <ActivityList
            activities={this.state.activities}
            showDelete={this.state.showDelete}
            showEdit={this.state.showEdit}
            onDelete={this.handleDeleteActivity}
            onUpdate={this.handleUpdateActivity}
          />
        </main>

        {/*-------------------------------------------------------------*/}

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.isCreatingActivity}
          onClose={this.toggleCreateActivity}
        >
          <div className="example-modal">
            <label>
              Name:
              <input
                name="newTitle"
                type="text"
                value={this.state.newTitle}
                onChange={this.handleChange} />
              <input
                name="newDatetime"
                type="datetime-local"
                value={this.state.newDatetime}
                min="2018-06-07T00:00" max="2018-06-14T00:00"
                onChange={this.handleChange} />
            </label>
            <button
              onClick={() => this.handleCreateActivity()}
            >Submit</button>
            <button
              onClick={() => this.toggleCreateActivity()}
            >Cancel</button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default App;
