import express from 'express'
import { User } from '../models/user.model.js'
import { usersTableInit } from '../config/validators.js'

const tableName = 'Usuarios'

export const users = express.Router()

// INGRESA REGISTROS A LA TABLA Users
users.post('/createUser', async (req, res) => {
    usersTableInit()
    try {
        const { firstName, lastName, email } = req.body
        const newUser = await User.create({ firstName, lastName, email })
        res.json({'Se ha creado el usuario': newUser})
        console.log('> controllers/user.controller.js: Usuario creado')
    } catch(error) {
        console.log(`> controllers/user.controller.js: Error al ingresar el nuevo registro a la tabla ${tableName}`, error)
    }
})

users.get('/usuarios', async (req, res) => {
    res.json({Todo: 'Ok'})
})