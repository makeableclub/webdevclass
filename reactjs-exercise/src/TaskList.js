import React, {Component} from "react";
import TaskItem from "./TaskItem";
import TaskInput from "./TaskInput";

const APIURL = "/api/tasks";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks:[]
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
    .then(newTask => this.setState({tasks: [...this.state.tasks, newTask]}))
    .catch(error => console.log(error));
  }

  deleteTask(id) {
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
    const taskItems = this.state.tasks.map((task) => (
      <TaskItem
        key={task._id}
        {...task}
        onDelete={this.deleteTask.bind(this, task._id)}
        onToggle={this.toggleTask.bind(this, task)}
      />
    ));

    return (
      <div>
        <h1>TaskList</h1>
        <TaskInput addTask={this.addTask}/>
        <ul>
          {taskItems}
        </ul>
      </div>
    )
  }
}

export default TaskList

/** TODO: refactor network call to another helper files
async loadTasks() {
  let tasks = await Helper.getTasks();
  this.setState({tasks};
}
*/
