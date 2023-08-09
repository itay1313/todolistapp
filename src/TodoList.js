import React from 'react';
import Button from 'react-bootstrap/Button';
import TodoListItem from './TodoListItem';
import { Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import ComponentTest from './ComponentTest';

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      list_title: '',
      current_value: '',
      current_description: '',
      todos: [],
    };

    this.deleteTodoByIndex = this.deleteTodoByIndex.bind(this);
  }

  deleteTodoByIndex(index) {
    this.setState((prevState) => ({
      todos: [
        ...prevState.todos.slice(0, index),
        ...prevState.todos.slice(index + 1),
      ],
    }));
  }

  componentDidMount() {
    // Load todos from localStorage first
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.setState({ todos: JSON.parse(savedTodos) });
    }

    axios
      .get('http://localhost:4000/todos/1') // Adjust the id as needed
      .then((response) => {
        const todoData = response.data;
        if (
          !savedTodos ||
          (savedTodos &&
            !JSON.parse(savedTodos).some((todo) => todo.id === todoData.id))
        ) {
          this.setState((prevState) => ({
            todos: [
              ...prevState.todos,
              {
                id: todoData.id,
                title: todoData.title,
                description: todoData.description,
                complete: todoData.completed,
              },
            ],
          }));
        }
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the todos have changed, and if so, save them to localStorage
    if (JSON.stringify(prevState.todos) !== JSON.stringify(this.state.todos)) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  render() {
    const canProceed = this.state.current_value.trim() && this.state.current_description.trim();
    return (
      <Container>
        <Row>
          <Col>
            <Stack gap={2} className="mt-4 pb-4">
              <h2>TodoList...</h2>
              {/* <Stack gap={2} className="col-md-7 mx-auto">
                <label htmlFor="">Add task</label>
                <input
                  placeholder="Enter Title"
                  type="text"
                  value={this.state.list_title}
                  onChange={(event) => {
                    this.setState({ list_title: event.target.value })
                  }}
                />
              </Stack> */}
              <Stack gap={2} className="col-md-7 mx-auto">
                <label>What's you're going to do?</label>
                <input
                  placeholder="Todolist Item"
                  type="text"
                  value={this.state.current_value}
                  onChange={(event) => {
                    this.setState({ current_value: event.target.value });
                  }}
                />

                <label>And how you gonna do that?</label>
                <textarea
                  placeholder="Task description"
                  value={this.state.current_description}
                  onChange={(event) => {
                    this.setState({ current_description: event.target.value });
                  }}
                />

                {!canProceed && (
                  <div style={{ color: 'red', marginTop: '10px' }}>
                    Please provide text in both fields to proceed.
                  </div>
                )}

                <Button
                  onClick={() => {
                    if (canProceed) {
                      this.setState((prevState) => ({
                        todos: prevState.todos.concat({
                          title: this.state.current_value,
                          description: this.state.current_description,
                          completed: false,
                        }),
                        current_value: '',
                        current_description: '',
                      }));
                    }
                  }}
                  as="a"
                  variant="primary"
                  disabled={!canProceed} // Disabling if either field is empty or contains only whitespace
                >
                  Add item to list
                </Button>
              </Stack>
              <Stack gap={2} className="col-md-7 mx-auto">
                {this.state.todos.map((todo, index) => {
                  return (
                    <TodoListItem
                      key={index}
                      deleteTodoByIndex={this.deleteTodoByIndex}
                      index={index}
                      title={todo.title}
                      description={todo.description}
                      completed={todo.completed}
                    />
                  );
                })}
              </Stack>
              <ComponentTest />
            </Stack>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TodoList;
