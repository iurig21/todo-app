# Full-Stack Todo App using ReactJS TailwindCSS Node.js Express.js Prisma & PostgreSQL

A full-stack To-Do List application built with React (frontend) and a Node.js/Express/Prisma/PostgreSQL backend. This project allows users to register, authenticate, and manage their personal tasks in an intuitive interface.

## Features

- **User Authentication:** Secure registration and login (JWT-based).
- **Task Management:** Add, edit, complete, delete, and view details for your tasks.
- **Search & Filter:** Easily search your tasks by title.
- **Responsive UI:** Built with React and TailwindCSS for a clean look.
- **Protected Routes:** Task operations require user authentication.
- **RESTful API:** Backend exposes endpoints for all CRUD operations.

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js, Prisma
- **Database:** PostgreSQL

## Getting Started

### Prerequisites

- Node.js and npm installed

### Backend Setup

1. Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    npm run dev
    ```
4. The backend runs by default on `http://localhost:3000`.
   

## API Endpoints

Here are the main endpoints available:

- `POST /auth/register` — Register a new user and obtain a JWT
- `POST /auth/login` — Authenticate and obtain a JWT
- `GET /todos` — Get all todos for authenticated user
- `POST /todos` — Create a new todo
- `PUT /todos/:id` — Update a todo
- `DELETE /todos/:id` — Delete a todo
- `POST /todos/categorys` - Create a new category
  

## Frontend Setup

1. Navigate to the `frontend/` directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure API endpoint:
    - Create a `.env` file in `frontend/` and set:
      ```
      VITE_API_URL=http://localhost:3000
      ```
4. Start the frontend app:
    ```bash
    npm run dev
    ```
5. Visit `http://localhost:5173` (or as indicated by your dev server).

## Usage

- Register or login to start managing your tasks.
- Add a new task with title and optional description.
- Click on a task to toggle its completion status.
- Edit or delete tasks using the provided actions.
- Search tasks by their title.

## Folder Structure

```
todo-app/
├── backend/         # Express backend & API
│   ├── todo-app.rest # Example REST requests
│   └── ...         
├── frontend/        # React frontend app
│   ├── src/
│      ├── components/
│      ├── pages/
│      └── App.jsx
│ 
└── README.md        # Project root README
```

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss any major changes.

## Author

- [iurig21](https://github.com/iurig21)
