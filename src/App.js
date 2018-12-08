import React, { Component } from 'react';
import NavBar from './components/navbar';
import ActivityList from './components/activityList';

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
    },
    ]
  };

  handleDelete = activityId => {
    const activities = this.state.activities.filter(a => a.id !== activityId);
    this.setState({ activities });
  }

  // handleNewActivity()
  // handleShowDeleteActivitySelect()

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="pongo-actions">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="btn btn-link">Add</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link">Remove</button>
            </li>
          </ul>
        </div>
        <main className="container">
          <ActivityList
            activities={this.state.activities}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
