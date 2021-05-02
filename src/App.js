import React, { useState, useReducer, useRef } from "react";
import uuid from "react-uuid";

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { title: action.task, id: action.id, completed: false, isShow: true },
      ];
    case "DONE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: true } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "SHOW_DONE_TODO":
      return state.map((todo) =>
        todo.completed ? { ...todo, isShow: true } : { ...todo, isShow: false }
      );
    case "SHOW_PENDING_TODO":
      return state.map((todo) =>
        todo.completed ? { ...todo, isShow: false } : { ...todo, isShow: true }
      );

    default:
      return state.map((todo) => ({ ...todo, isShow: true }));
  }
};

const initialTodos = [];
export default function App() {
  const todoInput = useRef();
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      task: todoInput.current.value,
      id: uuid(),
    });
    todoInput.current.value = "";
  };
  const handleDone = (id) => {
    dispatch({
      type: "DONE_TODO",
      id,
    });
  };
  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_TODO",
      id,
    });
  };
  const handleSelectOption = (value) => {
    dispatch({
      type: value,
    });
  };
  console.log("rerender....");
  return (
    <div>
      <h1>My Todo App</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="e.g reading" ref={todoInput} required />
        <button type="submit">ADD</button>
        <select
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
        {todos.map((todo) => {
          if (todo.isShow)
            return (
              <div>
                <p
                  style={{
                    textDecoration: todo.completed ? "line-through" : null,
                  }}
                >
                  {todo.title}{" "}
                </p>
                <button onClick={() => handleDone(todo.id)}>done</button>
                <button onClick={() => handleDelete(todo.id)}>delete</button>
                <hr />
              </div>
            );
        })}
      </div>
    </div>
  );
}
