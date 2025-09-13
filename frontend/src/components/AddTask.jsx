import { useContext, useState } from "react";
import Input from "./Input";
import { AuthContext } from "../Context/AuthContext";

function AddTask({ OnAddTaskClick,openModal}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error,setError] = useState(false);

  const {isAuthenticated} = useContext(AuthContext)

  const handleSubmit = () => {

    if(!isAuthenticated){
      return openModal()
    }

    if (!title.trim()) {
      return setError(true);
    }
    
    OnAddTaskClick(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="bg-zinc-700 p-5 rounded-md shadow-md space-y-4">
      <Input
        value={title}
        onChange={(event) => {
          setError(false);
          setTitle(event.target.value)
        }}
        onKeyDown={(event) => (event.key === "Enter" ? handleSubmit() : null)}
        type="text"
        name=""
        id=""
        placeholder="Titulo da tarefa"
      />

      {error && (
        <p className="text-red-600"> Title is required </p>
      )}

      <Input
        value={desc}
        onChange={(event) => setDesc(event.target.value)}
        onKeyDown={(event) => (event.key === "Enter" ? handleSubmit() : null)}
        type="text"
        placeholder="Descricao da tarefa (opcional)"
      />
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
