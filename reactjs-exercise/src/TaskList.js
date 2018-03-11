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
    .then(data => data.json())
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

  componentWillMount() {
    this.loadTasks();
  }

  render() {
    const taskItems = this.state.tasks.map((task) => (
      <TaskItem key={task._id} {...task}/>
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
