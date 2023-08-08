import React from "react";

const TodoListItem = (props) => {
  console.log(props)
  return (
    <div>
      <input type="checkbox" checked={props.completed} />
      <span>{props.title}</span>
      <button onClick={() => props.deleteTodoByIndex(props.index)}>Delete todo</button>
    </div>

  )
}

export default TodoListItem