import React, { Component } from 'react';
import NavBar from './components/navbar';
import ActivityList from './components/activityList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faMinus, faEdit)

class App extends Component {
  state = {
    activities: [{
      id: 1,
      title: "test title",
      datetime: new Date('2018/12/05 19:20'),
    }, {
      id: 2,
      title: "test title 2",
      datetime: new Date('2018/12/06 19:20'),
    }],
    showDelete: false,
    showEdit: false,
  };

  handleNewActivity = _ => {

  }

  handleShowDelete = _ => {
    this.setState({ showDelete: !this.state.showDelete, showEdit: false });
  }
  
  handleDelete = activityId => {
    const activities = this.state.activities.filter(a => a.id !== activityId);
    this.setState({ activities });
  }

  handleShowEdit = _ => {
    this.setState({ showEdit: !this.state.showEdit, showDelete: false })
  }

  handleEdit = activityId => {

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
                onClick={this.handleShowDelete}
              ><FontAwesomeIcon icon="minus"/></button>
            </li>
            <li className="nav-item">
              <button 
                className="btn btn-link"
                onClick={this.handleShowEdit}
              ><FontAwesomeIcon icon="edit"/></button>
            </li>
          </ul>
        </div>
        <main className="container">
          <ActivityList
            activities={this.state.activities}
            showDelete={this.state.showDelete}
            onDelete={this.handleDelete}
            showEdit={this.state.showEdit}
            onEdit={this.handleEdit}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
