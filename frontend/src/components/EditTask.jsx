import { useState } from "react";
import Input from "./Input";

function EditTask({taskData,SaveEdits,CloseEditTaskModal}) {

    
    const [newTitle,setNewTitle] = useState(taskData.task);
    const [newDesc,setNewDesc] = useState(taskData.description);

    const HandleEditSave = () => {
      if(!newTitle.trim()){
        return alert("O titulo é obrigatorio!");
      }

      SaveEdits(newTitle,newDesc);
    }

    const HandleDiscardChanges = () => {
      setNewTitle(taskData.task);
      setNewDesc(taskData.description);
      CloseEditTaskModal();
    }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-zinc-700 bg-opacity-80 backdrop-blur-md p-12 rounded-xl shadow-xl space-y-8 w-[600px]">
        <Input
          className="w-full h-14 text-lg bg-white/80 backdrop-blur-sm rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          onKeyDown={(event) => event.key === "Enter" ? HandleEditSave() : null}
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <Input
          className="w-full h-14 text-lg bg-white/80 backdrop-blur-md rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          onKeyDown={(event) => event.key === "Enter" ? HandleEditSave() : null}
          value={newDesc}
          onChange={(event) => setNewDesc(event.target.value)}
        />

        <div className="flex w-full gap-2">
          <button className="w-full bg-red-600 text-white p-4 rounded-xl cursor-pointer font-semibold text-lg" onClick={HandleDiscardChanges}>
            Descartar alterações
          </button>
          <button className="w-full bg-zinc-800 text-white p-4 rounded-xl cursor-pointer font-semibold text-lg" onClick={HandleEditSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
