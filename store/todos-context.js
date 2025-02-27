import { createContext, useReducer, useEffect, useContext } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "./auth-context";
import { getFormattedDateFull } from "../utils/usefull";

export const TodosContext = createContext({
  todos: [],
  checkTodo: (id, checked) => {},
  addTodo: ({ title, date }) => {},
  setTodos: (todos) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, { title, date }) => {},
  resetTodos: () => {},
});

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "CHECK":
      const checkedTodos = state.map((todo) =>
        todo.docId === action.payload.id
          ? {
              ...todo,
              checked: action.payload.checked,
              updatedAt: action.payload.updatedAt,
            }
          : todo
      );
      return checkedTodos;
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatedTodos = state.map((todo) =>
        todo.docId === action.payload.id
          ? { ...todo, ...action.payload.data }
          : todo
      );
      return updatedTodos;
    case "DELETE":
      return state.filter((todo) => todo.docId !== action.payload);
    case "RESET":
      return [];
    default:
      return state;
  }
};

const TodosContextProvider = ({ children }) => {
  const [todosState, dispatch] = useReducer(todosReducer, []);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchTodos = async () => {
      try {
        const q = query(
          collection(db, "todos"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const loadedTodos = querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "SET", payload: loadedTodos });
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };

    fetchTodos();
  }, [user?.uid]);

  const addTodo = async (todoData) => {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        ...todoData,
        userId: user.uid,
        checked: false,
        createdAt: getFormattedDateFull(new Date()),
      });
      const newTodo = {
        docId: docRef.id,
        ...todoData,
        userId: user.uid,
        checked: false,
        createdAt: getFormattedDateFull(new Date()),
      };
      dispatch({ type: "ADD", payload: newTodo });
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  const deleteTodo = async (id) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "todos", id));
      dispatch({ type: "DELETE", payload: id });
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  const updateTodo = async (docId, todoData) => {
    if (!user) return;

    try {
      const todoRef = doc(db, "todos", docId);
      await updateDoc(todoRef, {
        ...todoData,
        updatedAt: getFormattedDateFull(new Date()),
      });
      dispatch({
        type: "UPDATE",
        payload: {
          id: docId,
          data: {
            ...todoData,
            updatedAt: getFormattedDateFull(new Date()),
          },
        },
      });
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  const checkTodo = async (docId, isChecked) => {
    if (!user) return;

    try {
      const todoRef = doc(db, "todos", docId);
      await updateDoc(todoRef, {
        checked: isChecked,
        updatedAt: getFormattedDateFull(new Date()),
      });

      dispatch({
        type: "CHECK",
        payload: {
          id: docId,
          checked: isChecked,
          updatedAt: getFormattedDateFull(new Date()),
        },
      });
    } catch (error) {
      console.error("Could not check the task: ", error.message);
    }
  };

  const resetTodos = () => {
    dispatch({ type: "RESET" });
  };

  const value = {
    todos: todosState,
    addTodo: addTodo,
    checkTodo: checkTodo,
    setTodos: (todos) => dispatch({ type: "SET", payload: todos }),
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,
    resetTodos: resetTodos,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export default TodosContextProvider;
