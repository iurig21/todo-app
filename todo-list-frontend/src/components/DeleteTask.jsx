function DeleteTask({ CloseDeleteTaskModal,HandleDeleteTask,taskId}) {

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
        <div className="bg-zinc-700 bg-opacity-80 backdrop-blur-md p-12 rounded-xl shadow-xl space-y-8 w-[600px]">

          <p className="text-white text-2xl">Tem certeza que quer deletar a tarefa?</p>

          <div className="flex w-full gap-2">
            <button className="w-full bg-red-600 text-white p-4 rounded-xl cursor-pointer font-semibold text-lg" onClick={CloseDeleteTaskModal}>
              Cancelar
            </button>
            <button className="w-full bg-zinc-800 text-white p-4 rounded-xl cursor-pointer font-semibold text-lg" onClick={() => HandleDeleteTask(taskId)}>
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
