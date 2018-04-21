import React, {Component} from "react";

class TaskItem extends Component {

  deleteClick(e) {
    e.stopPropagation();
    this.props.onDelete();
  }

  // name, completed, onDelete, onToggle
  render() {
    let cname = "task";
    if( this.props.completed ) {
      cname = cname + " done";
    }

    return (
      <li className={cname} onClick={this.props.onToggle}>
        {this.props.name}
        <span onClick={this.deleteClick.bind(this)}> X </span>
      </li>
    )
  }
}

export default TaskItem;
