import express from "express";
import cors from "cors"
import connectDB from "./config/db.connection.js";
import usersRouter from "./routes/user.routes.js";
import todosRoutes from "./routes/todo.routes.js"
import authRouter from "./routes/auth.routes.js";
import dotenv from 'dotenv/config'
import  jwt  from "jsonwebtoken";


const PORT = 3001

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(todosRoutes)
app.use(usersRouter)
app.use(authRouter)




app.listen (PORT, () => console.log('Server listening on port', PORT))

