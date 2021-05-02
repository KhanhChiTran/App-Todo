import React, { useState, useReducer } from "react";
import "./App.css";
import uuid from "react-uuid";

function App() {
  const [task, setTask] = useState("");

  const initialTodos = [
    {
      id: uuid(),
      task: "Learn React",
      complete: true,
    },
    {
      id: uuid(),
      task: "Learn Firebase",
      complete: true,
    },
    {
      id: uuid(),
      task: "Learn GraphQL",
      complete: false,
    },
  ];
  const [todos, setTodos] = useState(initialTodos);
  const handleSubmit = (e) => {
    if (task) {
      setTodos([...todos, { id: uuid(), task, complete: false }]);
    }
    setTask("");
    e.preventDefault();
  };

  const handleChangeInput = (e) => {
    console.log(e.target.value);
    setTask(e.target.value);
  };
  const handleChangeCheckbox = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, complete: !todo.complete } : todo;
      })
    );
  };

  const filterReducer = (state, action) => {
    switch (action.type) {
      case "SHOW_ALL":
        return "ALL";

      case "SHOW_COMPLETED":
        return "COMPLETED";

      case "SHOW_INCOMPLETED":
        return "INCOMPLETED";

      default:
        throw new Error();
    }
  };
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const handleShowAll = () => {
    dispatchFilter({ type: "SHOW_ALL" });
  };

  const handleShowCompleted = () => {
    dispatchFilter({ type: "SHOW_COMPLETED" });
  };

  const handleShowIncompleted = () => {
    dispatchFilter({ type: "SHOW_INCOMPLETED" });
  };
  const filteredTodos = todos.filter((todo) => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETED" && todo.complete) {
      return true;
    }

    if (filter === "INCOMPLETED" && !todo.complete) {
      return true;
    }

    return false;
  });
  return (
    <div className="App">
      <h1>My Todo App</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChangeInput} />
        <button type="submit">ADD</button>
      </form>
      <div className="show-todo">
        <button type="button" onClick={handleShowAll}>
          All
        </button>
        <button type="button" onClick={handleShowCompleted}>
          Completed
        </button>
        <button type="button" onClick={handleShowIncompleted}>
          Incompleted
        </button>
      </div>
      <div className="todo-list">
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleChangeCheckbox(todo.id)}
                />
                {todo.task}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
