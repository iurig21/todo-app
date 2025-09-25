import { useContext, useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";
import EditTask from "./components/EditTask";
import DeleteTask from "./components/DeleteTask";
import Modal from "./components/Modal";
import Authentication from "./components/Authentication";
import { AuthContext } from "./Context/AuthContext";
import AddCategory from "./components/AddCategory";
import { LogOut, CircleUser, Pen } from "lucide-react";
import ChangePassword from "./components/ChangePassword";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [taskId, setTaskid] = useState();
  const [taskData, setTaskData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showCategorysModal, setShowCategorysModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const { token, isAuthenticated, Logout, email,categorys,setCategorys } = useContext(AuthContext);
  useEffect(() => {
    async function fetchTasks() {
      try {
        if (!token) {
          console.log("No auth token available");
          return;
        }
        const response = await fetch(import.meta.env.VITE_API_URL + "/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseJSON = await response.json();
        setTasks(responseJSON);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    }
    fetchTasks();
  }, [token]);

  async function OnAddTaskClick(title, desc, categoryId) {
    const data = await fetch(import.meta.env.VITE_API_URL + "/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: title,
        description: desc,
        categoryId: categoryId,
      }),
    });

    if (!data.ok) {
      throw new Error(`HTTP error! Status: ${data.status}`);
    }

    const { newTodo } = await data.json();

    const { id, task, description, categoryId: createdCategoryId } = newTodo;

    const newTask = {
      id: id,
      task: task,
      description: description,
      categoryId: createdCategoryId,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  }

  async function OnTaskClick(taskID) {
    const { completed } = tasks.find((task) => task.id === taskID);

    const updatedTodo = await fetch(
      import.meta.env.VITE_API_URL + "/todos/" + taskID,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      }
    );

    if (!updatedTodo.ok) {
      throw new Error(`HTTP error! Status: ${updatedTodo.status}`);
    }

    const newTasks = tasks.map((task) =>
      task.id === taskID ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  }

  function OnDeleteTaskClick(taskID) {
    setShowDeleteTaskModal(true);
    setTaskid(taskID);
  }

  async function HandleDeleteTask(taskID) {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/todos/" + taskID,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const newTasks = tasks.filter((task) => taskID != task.id);
    setTasks(newTasks);
    CloseDeleteTaskModal();
  }

  function CloseDeleteTaskModal() {
    setShowDeleteTaskModal(false);
  }

  function OnEditTaskClick(task) {
    setEdit(true);
    setTaskData({
      id: task.id,
      task: task.task,
      description: task.description,
    });
  }

  async function SaveEdits(newTitle, newDesc) {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/todos/" + taskData.id,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTask: newTitle, newDesc: newDesc }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP request failed. Status code: ${response.status}`);
    }

    const newTasks = tasks.map((t) =>
      t.id === taskData.id ? { ...t, task: newTitle, description: newDesc } : t
    );
    setTasks(newTasks);
    CloseEditTaskModal();
  }

  const CloseEditTaskModal = () => {
    setEdit(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="h-screen w-screen bg-zinc-800 flex justify-center p-6">
      <main className="w-[500px] space-y-7">
        {showModal && (
          <Modal closeModal={closeModal}>
            <Authentication closeModal={closeModal} />
          </Modal>
        )}

        {showCategorysModal && (
          <Modal closeModal={() => setShowCategorysModal(false)}>
            <AddCategory categorys={categorys} setCategorys={setCategorys}/>
          </Modal>
        )}

        {showChangePasswordModal && (
          <Modal closeModal={() => setShowChangePasswordModal(false)}>
            <ChangePassword />
          </Modal>
        )}

        <div className="flex flex-col gap-4 items-center justify-center">
          <Title>Todo-app</Title>
          {isAuthenticated ? (
            <div className="flex gap-2">
              <button
                className="cursor-pointer bg-red-700 rounded-md p-3 text-white border border-red-950"
                onClick={() => setShowButton(!showButton)}
              >
                <div className="flex gap-3">
                  <CircleUser />
                  {email}
                </div>
              </button>
              {showButton && (
                <div>
                  <button
                    className="cursor-pointer bg-red-700 rounded-md p-3 text-white border border-red-950 w-full"
                    onClick={() => setShowChangePasswordModal(true)}
                  >
                    <div className="flex gap-3 justify-center">
                      <Pen />
                      Change password
                    </div>
                  </button>
                  <button
                    className="cursor-pointer bg-red-700 rounded-md p-3 text-white border border-red-950 w-full"
                    onClick={() => {
                      setTasks([]);
                      Logout();
                    }}
                  >
                    <div className="flex gap-3 justify-center">
                      <LogOut />
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer bg-green-700 rounded-md p-3 text-white border border-green-950"
            >
              Login/register
            </button>
          )}
        </div>
        <AddTask
          OnAddTaskClick={OnAddTaskClick}
          openModal={openModal}
          setShowCategorysModal={setShowCategorysModal}
        />
        {edit && (
          <EditTask
            taskData={taskData}
            SaveEdits={SaveEdits}
            CloseEditTaskModal={CloseEditTaskModal}
          />
        )}
        {showDeleteTaskModal && (
          <DeleteTask
            CloseDeleteTaskModal={CloseDeleteTaskModal}
            HandleDeleteTask={HandleDeleteTask}
            taskId={taskId}
          />
        )}
        <Tasks
          tasks={tasks}
          OnTaskClick={OnTaskClick}
          OnDeleteTaskClick={OnDeleteTaskClick}
          OnEditTaskClick={OnEditTaskClick}
        />
      </main>
    </div>
  );
}

export default App;
