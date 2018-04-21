import React, { Component } from 'react';
import TaskItem from './TaskItem';
import TaskInput from './TaskInput';
import "./App.css";

const APIURL = "/api/tasks";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.addTask = this.addTask.bind(this);
  }

  loadTasks() {
      fetch(APIURL)
      .then(response => {
        if (!response.ok) {
          let error = {errorMessage: "Failed to get response from server"};
          throw error;
        }
        return response.json()
      })
      .then(tasks => this.setState({tasks}))
      .catch(error => console.log(error));
    }

    addTask(taskName) {
      console.log("In TaskList: ", taskName);
      fetch(APIURL, {
        method: "post",
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({name: taskName})
      })
      .then(data => data.json())
      .then(newTask => {
        console.log("new data: " + newTask);
        this.setState({tasks: [...this.state.tasks, newTask]})})
      .catch(error => console.log("error: " + error));
    }


  deleteTask(id) {
      // event.stopPropagation();
      const deleteURL = APIURL + "/" + id;
      fetch(deleteURL, {
        method: "delete"
      })
      .then(() => {
        const newlist = this.state.tasks.filter( task => task._id !== id );
        this.setState({tasks: newlist});
      });
  }

  toggleTask(task) {
    const updateURL = APIURL + "/" + task._id;
    console.log("toggleTask: ", task._id, task.completed);

    fetch(updateURL, {
      method: "put",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({completed: !task.completed})
    })
    .then(data => data.json())
    .then( updatedTask => {
      console.log("updatedTask: ", updatedTask._id, updatedTask.completed);

      const tasks = this.state.tasks.map( task =>
        (task._id === updatedTask._id)? {...task, completed: !task.completed} : task
      );
      this.setState({tasks: tasks});
    });
  }

  componentWillMount() {
    this.loadTasks();
  }

  render() {
    console.log(this.state.tasks);

    const taskItems = this.state.tasks.map((task) => (
        <TaskItem
          key={task._id}
          {...task}
          onToggle={this.toggleTask.bind(this, task)}
          onDelete={this.deleteTask.bind(this, task._id)}
        />
      ));

    return (
      <div>
        <header>
          <h1>Tasks by <span>React.js</span></h1>
          <h2>A single page application for learning React.js</h2>
        </header>

        <section className="form">
        <TaskInput addTask={this.addTask}/>
        </section>
        
        <ul class="list">
          {taskItems}
        </ul>
      </div>
    )
  }
}

export default TaskList;
