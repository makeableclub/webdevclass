import React, {Component} from "react";
import "./App.css";

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: "do something fun"};
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleClick(){
    console.log(this.state.inputValue);
    this.props.addTask(this.state.inputValue);
  }
  //          <input type="text"></input>
  render() {
      return (
        <div>
          <input className="taskInput"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}>
          </input>

          <button className="addButton"
            onClick={this.handleClick}>
            Add
          </button>
        </div>
      )
  }
}

export default TaskInput;
