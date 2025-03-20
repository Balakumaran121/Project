import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectToDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 4000
const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

connectToDB()

app.use("/api/todos", todoRoutes)
app.use("/api/", authRoutes)
app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`)
})