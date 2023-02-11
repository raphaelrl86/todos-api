import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.model.js'

const usersRouter = Router()
 
usersRouter.post('/sign-up', async (req, res) => {
    const payload = req.body

    try {
        const newUser = await User.create(payload)
        if(newUser) {
            return res.status(201).json({message: 'Usuário criado'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default usersRouter
