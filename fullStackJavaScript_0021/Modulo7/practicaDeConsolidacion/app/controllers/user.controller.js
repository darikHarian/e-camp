import express from 'express'
import { User, Bootcamp } from "../models/index.js"

const tableName = 'Users'
export const users = express.Router()

// INGRESA REGISTROS A LA TABLA Users
users.post('/createUser', async (req, res) => { 
    try {
        const { firstName, lastName, email } = req.body
        const newUser = await User.create({ firstName, lastName, email })
        res.json({'Se ha creado el usuario': newUser})
        console.log('> app/controllers/user.controller.js: Usuario creado')
    } catch(error) {
        res.json({'Mensaje': `Creando la tabla ${tableName}`})
        console.log(`> app/controllers/user.controller.js: Creando la tabla ${tableName}`)
    }
})

// Obtener los Bootcamp de un usuario
users.get('/findUserById/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id, {include: { model: Bootcamp, as: 'bootcamps' }})
        if (!user) {
            res.json({'Mensaje': 'El Usuario no existe'})
            console.log('> app/controllers/user.controller.js: El Usuario no existe')
        } else {
            res.json({'Usuario': user})
            console.log('> app/controllers/user.controller.js: Usuario encontrado')
        }
    } catch(error) {
        res.json({'Mensaje': 'El Usuario no pudo ser encontrado'})
        console.log('> app/controllers/user.controller.js: El Usuario no pudo ser encontrado', error)
    }
})

// Obtener todos los Usuarios incluyendo, los Bootcamp
users.get('/findAll', async (req, res) => {
    try {
        const users = await User.findAll({include: { model: Bootcamp, as: 'bootcamps' }})
        res.json(users)
        console.log('> app/controllers/user.controller.js: Usuarios y sus Bootcamps encontrados')
    } catch(error) {
        res.json({Mensaje: 'No se pudo obtener la lista de usuarios'})
        console.log('> app/controllers/user.controller.js: No se pudo obtener la lista de usuarios', error)
    }
})

// Actualizar usuario por Id
users.put('/updateUserById/:id', async (req, res) => {
    try {
        const id = req.params.id
        const firstName = req.body.firstName
        const lastName  = req.body.lastName
        const email = req.body.email

        await User.update(
            {firstName, lastName, email},
            {where: {id}}
        )

        res.json({'Mensaje': 'Usuario actualizado correctamente'})
        console.log('> app/controllers/user.controller.js: Usuario actualizado')
    } catch(error) {
        res.json({'Mensaje': 'El usuario no pudo ser actualizado'})
        console.log('> app/controllers/user.controller.js: El usuario no pudo ser actualizado', error)
    }
})

// Eliminar un usuario por Id
users.delete('/deleteUserById/:id', async (req, res) => {
    try {
        const id = req.params.id
        await User.destroy({where: {id}})
        res.json({'Mensaje': 'Usuario eliminado correctamente'})
        console.log('> app/controllers/user.controller.js: Usuario eliminado')
    } catch(error) {
        res.json({'Mensaje': 'No se ha podido eliminar el usuario'})
        console.log('> app/controllers/user.controller.js: No se ha podido eliminar el usuario', error)
    }
})