import prisma from "../prismaClient.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const emailExists = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (emailExists) {
    return res.status(409).json({ message: "Email is being used" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const defaultTodo = "Add more todos!";

    await prisma.todos.create({
      data: {
        task: defaultTodo,
        userid: user.id,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    req.status(503);
  }
});

export default router