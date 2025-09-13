import express from 'express'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())


app.use('/auth',authRoutes)
app.use('/todos',authMiddleware,todoRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})