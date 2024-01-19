import { useState, useReducer, useEffect } from "react";
import Todo from "./components/Todo";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGL_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};
const reducer = (todos, action) => {
  // console.log(todos);
  // console.log(action);
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      const newTodos = [...todos, newTodo(action.payload.todo)];
      //localStorage("todos", JSON.stringify(newTodos));
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case ACTIONS.TOGGL_TODO:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, complete: !todo.complete }
          : todo
      );
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id != action.payload.id);
    default:
      return todos;
  }
};

const newTodo = (todo) => {
  return { id: crypto.randomUUID(), todo: todo, complete: false };
};

function App() {
  const [todos, dispatch] = useReducer(reducer, [], () => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.log("Error parsing localStorage", error);
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { todo: todo } });

    console.log("todos: " + todos);
    setTodo("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handledispatch = (id) => {
    dispatch({ type: ACTIONS.TOGGL_TODO, payload: { id: id } });
  };
  const handleDeleteTodo = (id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: id } });
  };
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex justify-center space-x-1">
        <input
          className="h-8 p-1 rounded-md"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="btn-orange" type="submit">
          Submit
        </button>
      </form>
      <div className="mt-10">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDispatch={handledispatch}
            onDeleteTodo={handleDeleteTodo}
          />
        ))}
      </div>
      <p className="bg-red-600 rounded-md p-8 text-white mt-12">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero doloremque
        dolorum ex nulla, consectetur delectus! Quaerat voluptas ex
        reprehenderit! Ad porro cumque molestiae sequi perferendis nobis odio
        magnam ex incidunt!
      </p>
    </div>
  );
}

export default App;
