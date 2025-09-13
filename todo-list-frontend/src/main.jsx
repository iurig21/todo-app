import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import TaskPage from "./pages/TaskPage";
import AuthProvider from "./Context/AuthContext";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/task" element={<TaskPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
