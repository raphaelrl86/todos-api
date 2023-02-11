import { Router } from "express";
import Todo from "../models/Todo.model.js"
import isAuthenticatedMiddleware from "../middlewares/isAutheticatedMiddleware.js";

const todosRoutes = Router()

todosRoutes.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    console.log(todos)
    res.send(todos)
})

todosRoutes.post('/todos', isAuthenticatedMiddleware, async(req, res) => {
    try {
        const newTodo = await Todo.create(req.body)
        res.status(201).json(newTodo)
    } catch(error) {
        console.log('Erro ao criar tarefa', error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

todosRoutes.get('/todo', async (req, res) => {
    try {
        const todos = await Todo.find({})
        return res.status(200).json(todos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

todosRoutes.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)

        if(!todo) {
            return res.status(404).json({message: 'Tarefa não encontrada'})
        }

        return res.status(200).json(todo)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

todosRoutes.put('/todos/:id', async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.params
        const updatedTodo = await Todo.findOneAndUpdate({_id: id}, payload, { new: true })
        if(!updatedTodo) {
            return res.status(404).json({message: 'Tarefa não encontrada'})
        }
        return res.status(200).json(updatedTodo)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})
todosRoutes.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Todo.findOneAndDelete({_id: id})
        res.status(204).json()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default todosRoutes