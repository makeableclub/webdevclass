import React from 'react';

const TaskItem = ({name, completed}) => (
    <li style={{ textDecoration: completed? "line-through" : "none"}}>
      {name}
    </li>
)

export default TaskItem;
