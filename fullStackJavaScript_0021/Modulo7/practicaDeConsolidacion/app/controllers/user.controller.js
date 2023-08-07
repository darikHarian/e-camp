import express from 'express'
import { User } from '../models/user.model.js'
import { usersTableInit } from '../config/validators.js'

const tableName = 'Users'
export const users = express.Router()

users.use('/createUser', (req, res, next) => {
    usersTableInit(tableName)
    next()
})

// INGRESA REGISTROS A LA TABLA Users
users.post('/createUser', async (req, res) => { 
    try {
        const { firstName, lastName, email } = req.body
        const newUser = await User.create({ firstName, lastName, email })
        res.json({'Se ha creado el usuario': newUser})
        console.log('> controllers/user.controller.js: Usuario creado')
    } catch(error) {
        res.json({'Mensaje': `Creando la tabla ${tableName}`})
        console.log(`> controllers/user.controller.js: Creando la tabla ${tableName}`)
    }
})

// Obtener los Bootcamp de un usuario
users.get('/findUserById', async (req, res) => {
    res.json({Todo: 'Ok'})
})

// Obtener todos los Usuarios incluyendo, los Bootcamp
users.get('/findAll', async (req, res) => {
    res.json({Todo: 'Ok'})
})

// Actualizar usuario por Id
users.put('/updateUserById', async (req, res) => {
    res.json({Todo: 'Ok'})
})

// Eliminar un usuario por Id
users.delete('deleteUserById', async (req, res) => {
    res.json({Todo: 'Ok'})
})