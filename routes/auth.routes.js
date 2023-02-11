import { Router } from 'express'
import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authRouter = Router()

authRouter.post('/auth/signup', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExists = await User.findOne({email})
        if(userExists) {
            throw new Error('Usuário já existe')
        }
        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const passwordHash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({name, email, passwordHash})

        return res.status(201).json({name: newUser.name, email: newUser.email})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }

})

authRouter.post('/auth/login', async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user) {
            throw new Error('Usuário não encontrado')
        }
        
        if(!bcrypt.compareSync(password, user.passwordHash)){
            return res.status(401).json({message: 'Unauthorized'})
        }
        const expiresIn = process.env.JWT_EXPIRES
        const secret = process.env.JWT_SECRET

        jwt.sign({id:user._id, email:user.email}, secret, {expiresIn})

        const token = jwt.sign({id: user._id, email: user.email}, secret, {expiresIn})

        return res.status(200).json({logged: true, jwt: token})

    } catch (error) {
        onsole.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

export default authRouter