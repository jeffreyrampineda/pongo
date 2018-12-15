import React, { Component } from 'react';
import NavBar from './components/navbar';
import ActivityList from './components/activityList';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [{
        id: 1,
        title: "test title",
        datetime: new Date('2018/12/05 19:20'),
        isEditting: false,
      }, {
        id: 2,
        title: "test title 2",
        datetime: new Date('2018/12/06 19:20'),
        isEditting: false,
      }, {
        id: 3,
        title: "test title 3",
        datetime: new Date('2018/12/06 19:25'),
        isEditting: false,
      }],
      showDelete: false,
      showEdit: false,
    };
  }

  handleNewActivity = _ => {
    const activities = this.state.activities;
    activities.push({

      // Logic error - If an activity is deleted, the next newActivity conflicts with another.
      id: this.state.activities.length + 1,

      title: "",
      datetime: new Date(),
      isEditting: true
    });

    this.setState({ activities });
  }

  handleShowDeleteActivity = _ => {
    this.setState({ showDelete: !this.state.showDelete, showEdit: false });
  }

  handleDeleteActivity = activityId => {
    const activities = this.state.activities.filter(a => a.id !== activityId);
    this.setState({ activities });
  }

  handleShowEditActivity = _ => {
    this.setState({ showEdit: !this.state.showEdit, showDelete: false })
  }

  handleEditActivity = activityId => {
    const activityIndex = this.state.activities.findIndex(a => a.id === activityId);
    const activities = this.state.activities;
    activities[activityIndex].isEditting = true;
    this.setState({ activities, showEdit: false });
  }

  handleSaveActivity = newActivity => {
    const activityIndex = this.state.activities.findIndex(a => a.id === newActivity.id);
    const activities = this.state.activities;
    activities[activityIndex] = newActivity;
    this.setState({ activities });
  }

  handleCancelEdit = activityId => {
    const activityIndex = this.state.activities.findIndex(a => a.id === activityId);
    const activities = this.state.activities;
    activities[activityIndex].isEditting = false;
    this.setState({ activities });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="pongo-actions">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="btn btn-link"
                onClick={this.handleNewActivity}
              ><AddBoxIcon /></button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link"
                onClick={this.handleShowDeleteActivity}
              ><DeleteIcon /></button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link"
                onClick={this.handleShowEditActivity}
              ><EditIcon /></button>
            </li>
          </ul>
        </div>
        <main className="container">
          <ActivityList
            activities={this.state.activities}
            showDelete={this.state.showDelete}
            onDelete={this.handleDeleteActivity}
            showEdit={this.state.showEdit}
            onEdit={this.handleEditActivity}
            onSave={this.handleSaveActivity}
            onCancel={this.handleCancelEdit}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;