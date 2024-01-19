import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ACTIONS } from "../App";
export default function Todo({ todo, onDispatch, onDeleteTodo }) {
  return (
    <ul className="flex justify-evenly space-y-2 bg-gray-300 border border-b-white items-center px-0.5 rounded-md">
      <li className="w-2/4">{todo.id}</li>
      <li
        className="w-1/4 flex items-center pb-1 "
        style={{ color: todo.complete ? "#AAA" : "#000" }}
      >
        {todo.todo}
      </li>
      <li className="flex justify-evenly items-center pb-1 w-1/5">
        <button className="" onClick={() => onDispatch(todo.id)}>
          <FaEdit className="text-xl text-emerald-500 font-semibold" />
        </button>
        <button className="" onClick={() => onDeleteTodo(todo.id)}>
          <MdDelete className="text-xl text-red-500 font-semibold" />
        </button>
      </li>
    </ul>
  );
}
