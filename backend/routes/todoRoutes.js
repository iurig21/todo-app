import prisma from '../prismaClient.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req,res) => {
    const todos = await prisma.todos.findMany({
        where: {
            userid: req.userID
        }
    })

    res.json(todos)
})

router.post('/' , async (req,res) => {
    const {task,description} = req.body
    
    const newTodo = await prisma.todos.create({
        data: {
            task,
            description,
            userid: req.userID
        }
    })

    res.json({newTodo})
})
    
router.put('/:id' , async (req,res) => {
    const {newTask,newDesc,completed} = req.body
    const {id} = req.params

    await prisma.todos.update({
        where: {
            id: Number(id)
        },

        data: {
            task: newTask,
            description: newDesc,
            completed: completed
        }
    })

    res.status(200).send({message: "Task updated successfully"})
})

router.delete('/:id', async (req,res) => {
    const {id} = req.params

    await prisma.todos.delete({
        where: {
            id: Number(id)
        }
    })

    res.status(200).send({message: "Task deleted succesffuly"})
})

export default router

