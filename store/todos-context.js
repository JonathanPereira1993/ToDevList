import { createContext, useReducer } from "react";

export const TodosContext = createContext({
  todos: [],
  addTodo: ({ title, date }) => {},
  setTodos: (todos) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, { title, date }) => {},
});

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableTodoIndex = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      const updatableTodos = state[updatableTodoIndex];
      const updateItem = { ...updatableTodos, ...action.payload.data };
      const updatedTodos = [...state];
      updatedTodos[updatableTodoIndex] = updateItem;
      return updatedTodos;
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodosContextProvider = ({ children }) => {
  const [todosState, dispatch] = useReducer(todosReducer, []);

  const addTodo = (todoData) => {
    dispatch({ type: "ADD", payload: todoData });
  };

  const setTodos = (todos) => {
    dispatch({ type: "SET", payload: todos });
  };

  const deleteTodos = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateTodos = (id, todoData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: todoData } });
  };

  const value = {
    todos: todosState,
    addTodo: addTodo,
    setTodos: setTodos,
    deleteTodos: deleteTodos,
    updateTodos: updateTodos,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export default TodosContextProvider;
