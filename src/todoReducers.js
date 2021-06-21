export const initialTodos = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList")).map((todo) => ({
      ...todo,
      isShow: true
    }))
  : [];
export const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { title: action.task, id: action.id, completed: false, isShow: true }
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
