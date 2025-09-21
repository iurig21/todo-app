import prisma from "../prismaClient.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await prisma.todos.findMany({
      where: {
        userid: req.userID,
      },
    });

    res.json(todos);
  } catch (err) {
    console.error("GET /todos failed:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { task, description, categoryId } = req.body;

    if (!task.trim()) {
      return res.status(400).json({ message: "Task is required" });
    }

    const finalCategoryId = categoryId ? Number(categoryId) : null;

    const newTodo = await prisma.todos.create({
      data: {
        task,
        description,
        categoryId: finalCategoryId,
        userid: req.userID,
      },
    });

    res.json({ newTodo });
  } catch (err) {
    console.error("POST /todos failed:", err);
    res.status(500).send({ message: "Error creating a task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { newTask, newDesc, completed } = req.body;
    const { id } = req.params;

    await prisma.todos.update({
      where: {
        id: Number(id),
      },

      data: {
        task: newTask,
        description: newDesc,
        completed: completed,
      },
    });

    res.status(200).send({ message: "Task updated successfully" });
  } catch (err) {
    console.log("PUT /todos/:id failed:", err);
    res.status(500).json({ message: "Error editing the task" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.todos.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).send({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("DELETE /todos/:id failed:", err);
    res.status(500).json({ message: "Error deleting the task" });
  }
});

router.get("/categorys", async (req, res) => {
  try {
    const categorys = await prisma.categorys.findMany({
      where: {
        userid: req.userID,
      },
    })

    res.json(categorys)
  } catch (err) {
    console.error("GET /categorys failed:", err);
    res.status(500).json({ message: "Error fetching categorys" });
  }
});

router.post("/categorys", async (req, res) => {
  try {
    const { category } = req.body;

    const alreadyExists = await prisma.categorys.findFirst({
      where: {
        nome: category,
        userid: req.userID
      },
    });

    if (alreadyExists) {
      return res.status(404).json({ message: "Category already exists" });
    }

    const newCategory = await prisma.categorys.create({

      data: {
        nome: category,
        userid: req.userID
      },
    });

    res.status(201).json(newCategory);
  } catch (err) {
    console.error("POST /categorys failed :", err);
    res.status(500).json({ message: "Creating a category failed" });
  }
});

export default router;
