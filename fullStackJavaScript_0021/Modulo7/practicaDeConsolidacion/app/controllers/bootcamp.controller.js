import express from 'express'
import { Bootcamp } from "../models/bootcamp.model.js"
import { bootcampsTableInit } from '../config/validators.js'

const tableName = 'Bootcamps'
export const bootcamps = express.Router()

bootcamps.use('/createBootcamp', (req, res, next) => {
    bootcampsTableInit(tableName)
    next()
})

// INGRESA REGISTROS A LA TABLA Bootcamps
bootcamps.post('/createBootcamp', async (req, res) => {
    try {
        const { title, cue, description } = req.body
        const newBootcamp = await Bootcamp.create({ title, cue, description })
        res.json({'Se ha creado el Bootcamp': newBootcamp})
        console.log('> controllers/bootcamp.controller.js: Bootcamp creado')
    } catch(error) {
        res.json({'Mensaje': `Creando la tabla ${tableName}`})
        console.log(`> controllers/bootcamp.controller.js: Error al ingresar el nuevo registro a la tabla ${tableName}`, error)
    }
})

// Agrega un Usuario al Bootcamp
bootcamps.post('/addUser', async (req, res) => {
    res.json({Todo: 'Ok'})
})

// Obtener los Bootcamp por id
bootcamps.get('/findById/:id', async (req, res) => {
    try {
        const id = req.params.id
        const bootcamp = await Bootcamp.findByPk(id)
        if (!bootcamp) {
            res.json({'Mensaje': 'El bootcamp no existe'})
        } else {
            res.json({'Bootcamp': bootcamp})
            console.log('> controllers/bootcamp.controller.js: Bootcamp encontrado')
        }
    } catch(error) {
        res.json({'Mensaje': 'El bootcamp no pudo ser encontrado'})
        console.log('El bootcamp no pudo ser encontrado', error)
    }
})

// Obtener todos los Usuarios incluyendo los Bootcamp
bootcamps.get('/findAll', async (req, res) => {
    res.json({Todo: 'Ok'})
})