import { useContext, useState } from "react";
import Input from "./Input";
import { AuthContext } from "../Context/AuthContext";
import { CirclePlus } from 'lucide-react';

function AddTask({ OnAddTaskClick, openModal }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(false);
  const [chosenCategory,setChosenCategory] = useState(null);

  const { isAuthenticated,categorys } = useContext(AuthContext);

  const handleSubmit = () => {
    if (!isAuthenticated) {
      return openModal();
    }

    if (!title.trim()) {
      return setError(true);
    }


    OnAddTaskClick(title,desc,chosenCategory);
    setTitle("");
    setDesc("");
    setChosenCategory("");
  };

  return (
    <div className="bg-zinc-700 p-5 rounded-md shadow-md space-y-4">
      <Input
        value={title}
        onChange={(event) => {
          setError(false);
          setTitle(event.target.value);
        }}
        onKeyDown={(event) => (event.key === "Enter" ? handleSubmit() : null)}
        type="text"
        name=""
        id=""
        placeholder="Task"
      />

      {error && <p className="text-red-600"> Title is required </p>}

      <Input
        value={desc}
        onChange={(event) => setDesc(event.target.value)}
        onKeyDown={(event) => (event.key === "Enter" ? handleSubmit() : null)}
        type="text"
        placeholder="Description (optional)"
      />

      <div className="flex gap-3">
        <select onChange={(event) => setChosenCategory(event.target.value)} value={chosenCategory} className="text-white bg-zinc-600 rounded-md p-2">
            <option value={""}> Select a categorie: </option>
          {categorys.map((categorie, idx) => (
            <option value={idx}  key={idx}>
              {categorie}
            </option>
          ))}
        </select>
        <button className="cursor-pointer" title="Add a category"> <CirclePlus color="#FFFCFC" />  </button> 
      </div>
      <button
        className="w-full bg-zinc-800 text-white p-3 rounded-md cursor-pointer font-medium"
        onClick={handleSubmit}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
