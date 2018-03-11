import React, { Component } from 'react';
import TaskList from './TaskList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  render() {
    return (
      <div className="App">
        <TaskList/>
      </div>
    );
  }
}

export default App;
