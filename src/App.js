import React, { Component } from 'react';
import NavBar from './components/navbar';
import ActivityList from './components/activityList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faMinus, faEdit, faCheck, faTimes)

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
      }],
      showDelete: false,
      showEdit: false,
    };
  }

  handleNewActivity = _ => {
    const activities = this.state.activities;
    activities.push({
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
              ><FontAwesomeIcon icon="plus" /></button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link"
                onClick={this.handleShowDeleteActivity}
              ><FontAwesomeIcon icon="minus" /></button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link"
                onClick={this.handleShowEditActivity}
              ><FontAwesomeIcon icon="edit" /></button>
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
