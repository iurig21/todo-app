import { CheckIcon, ChevronRightIcon, Trash, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

function Tasks({ tasks, OnTaskClick, OnDeleteTaskClick, OnEditTaskClick }) {
  const navigate = useNavigate();
  const [SearchedTasks, setSearchedTasks] = useState([]);

  const {isAuthenticated,categorys} = useContext(AuthContext)

  function OnSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.task);
    query.set("description", task.description);
    query.set("category", task.categoryId)
    navigate(`/task?${query.toString()}`);
  }

  function OnSerchBarChange(value) {
    setSearchedTasks(
      tasks.filter(
        (task) =>
          task.task.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  useEffect(() => {
    setSearchedTasks(tasks)
  }, [tasks]);

  return (
    <ul className="list-none space-y-3 bg-zinc-700 p-4 rounded-md shadow-md">

      <select className="p-2 text-white rounded-md bg-zinc-600" onChange={(event) => {
        if(!event.target.value){
          return setSearchedTasks(tasks)
        }
        setSearchedTasks(tasks.filter((task) => task.categoryId === Number(event.target.value)))
      }}>
        <option value=""> Filter by a category: </option>
        {categorys.map((category) => (
          <option value={category.id} key={category.id}> {category.nome}</option>
        ))}
      </select>

      <SearchBar OnSerchBarChange={OnSerchBarChange} />
      {SearchedTasks.length > 0 ? (
        SearchedTasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <button
              className={`cursor-pointer bg-zinc-800 rounded-md p-2 w-full flex gap-2 text-start ${
                task.completed ? "line-through text-red-600" : "text-white"
              }`}
              onClick={() => OnTaskClick(task.id)}
            >
              {task.completed && <CheckIcon />} {task.task}
            </button>
            <Button onClick={() => OnSeeDetailsClick(task)}>
              <ChevronRightIcon />
            </Button>
            <Button onClick={() => OnEditTaskClick(task)}>
              <Pencil />
            </Button>
            <Button onClick={() => OnDeleteTaskClick(task.id)}>
              <Trash />
            </Button>
          </li>
        ))
      ) : isAuthenticated && SearchedTasks.length == 0 ? (
        <li className="text-white text-center p-4">No tasks found</li>
      ) : (
        <li className="text-white text-center p-4">Login/Register to add tasks </li>
      )}
    </ul>
  );
}

export default Tasks;
