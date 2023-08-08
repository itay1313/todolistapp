import React from "react"
import Button from "react-bootstrap/Button"
import TodoListItem from "./TodoListItem"
import { Stack } from "react-bootstrap"
import axios from 'axios'


import ComponentTest from "./ComponentTest"

class TodoList extends React.Component {
  constructor() {
    super()

    this.state = {
      list_title: "",
      current_value: '',
      todos: [],
    }

    this.deleteTodoByIndex = this.deleteTodoByIndex.bind(this)
  }

  deleteTodoByIndex(index) {
    this.setState(prevState => (
      {
        todos: [
          ...prevState.todos.slice(0, index),
          ...prevState.todos.slice(index + 1)
        ],
      })
    )
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos/5")
      .then(data => this.setState({ todos: [{ id: data.data.id, title: data.data.title, complete: data.data.completed }] }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <Stack gap={2} className="col-md-7 mx-auto">
        <h2>TodoList...</h2>
        <Stack gap={2} className="col-md-7 mx-auto">
          <label htmlFor="">Add task</label>
          <input
            placeholder="Enter Title"
            type="text"
            value={this.state.list_title}
            onChange={(event) => {
              this.setState({ list_title: event.target.value })
            }}
          />
        </Stack>
        {this.state.todos.map((todo, index) => {
          return <TodoListItem key={index} deleteTodoByIndex={this.deleteTodoByIndex} index={index} title={todo.title} completed={todo.completed} />
        })}
        <Stack gap={2} className="col-md-7 mx-auto">
          <ComponentTest />
          <input
            placeholder="Todolist Item"
            type="text"
            value={this.state.current_value}
            onChange={(event) => { this.setState({ current_value: event.target.value }) }}
          />
          <Button onClick={() => this.setState(prevState => ({
            todos: prevState.todos.concat({ title: this.state.current_value, completed: false }),
            current_value: ''
          }))}
            as="a" variant="primary">
            Add item to list
          </Button>
        </Stack>
      </Stack>
    )
  }
}

export default TodoList
