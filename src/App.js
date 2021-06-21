import React, { useState, useReducer, useRef, useEffect } from "react";
import uuid from "react-uuid";
import axios from "axios";
import "./App.css";

import { todosReducer, initialTodos } from "./todoReducers";

export default function App() {
  const todoInput = useRef();
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/todos/get-all")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = todoInput.current.value;
    axios
      .post("http://localhost:5000/todos/add-todo", {
        task
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    dispatch({
      type: "ADD_TODO",
      task: todoInput.current.value,
      id: uuid()
    });
    todoInput.current.value = "";
  };
  const handleDone = (id) => {
    dispatch({
      type: "DONE_TODO",
      id
    });
  };
  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_TODO",
      id
    });
  };
  const handleSelectOption = (value) => {
    dispatch({
      type: value
    });
  };

  return (
    <div className="App">
      {/* <Button>This is a Button </Button> */}
      <h1>My Todo App</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="e.g reading" ref={todoInput} required />
        <button className="submit-btn" type="submit">
          Add
        </button>
        <select
          defaultValue="all"
          onChange={(e) => handleSelectOption(e.target.value)}
          id="show"
          name="todo"
        >
          <option value="all">All</option>
          <option value="SHOW_DONE_TODO">Completed</option>
          <option value="SHOW_PENDING_TODO">Incompleted</option>
        </select>
      </form>
      <div className="show-todo">
        {todos.map((todo, i) => {
          if (todo.isShow)
            return (
              <div key={i}>
                <p
                  style={{
                    textDecoration: todo.completed ? "line-through" : null
                  }}
                >
                  {todo.title}{" "}
                </p>
                <button className="btn" onClick={() => handleDone(todo.id)}>
                  Done
                </button>
                <button className="btn" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
                <hr className="line-style" />
              </div>
            );
        })}
      </div>
    </div>
  );
}
