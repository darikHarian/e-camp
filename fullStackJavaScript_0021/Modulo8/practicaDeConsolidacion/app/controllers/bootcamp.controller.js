import express from 'express';
import { User, Bootcamp } from '../models/index.js';

/* Ruta para crear un nuevo Bootcamp */
export const createBootcamp = async (req, res, err) => {
    try {
        const { title, cue, description } = req.body;
        const newBootcamp = await Bootcamp.create({ title, cue, description });
        res.json({'Se ha creado el Bootcamp': newBootcamp});
        console.log('> controllers/bootcamp.controller.js: Bootcamp creado');
    } catch(error) {
        res.json({'Mensaje': `Creando la tabla ${tableName}`});
        console.log(`> controllers/bootcamp.controller.js: Error al ingresar el nuevo registro a la tabla ${tableName}`, error);
    };
};

export const addUser = async (req, res, err) => {
    try {
        const { bootcampId, userId } = req.body;
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) return res.status(404).json({Mensaje: 'Bootcamp no encontrado'});

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({Mensaje: 'Usuario no encontrado'});

        await bootcamp.addUser(user);

        res.json({'Usuario agregado al bootcamp correctamente': {'Usuario': user ,'Bootcamp': bootcamp}});
        console.log(`> controllers/bootcamp.controller.js: Usuario id = ${user.id} se ha añadido al Bootcamp id = ${bootcamp.id}`);
    } catch(error) {
        res.json({Mensaje: 'No se ha podido agregar al Usuario en el Bootcamp'});
        console.log('> controllers/bootcamp.controller.js: No se llevó a cabo el registro', error);
    };
};

export const findById = async (req, res, err) => {
    try {
        const id = req.params.id;
        const bootcamp = await Bootcamp.findByPk(id, {include: { model: User, as: 'users' }});

        if (!bootcamp) {
            res.json({'Mensaje': 'El bootcamp no existe'});
            console.log('> controllers/bootcamp.controller.js: El Bootcamp no existe');
        } else {
            res.json({'Bootcamp': bootcamp});
            console.log('> controllers/bootcamp.controller.js: Bootcamp encontrado');
        }
    } catch(error) {
        res.json({'Mensaje': 'El bootcamp no pudo ser encontrado'});
        console.log('> controllers/bootcamp.controller.js: El bootcamp no pudo ser encontrado', error);
    };
};
export const findAll = async (req, res, err) => {
    try {
        const bootcamps = await Bootcamp.findAll({include: { model: User, as: 'users' }});
        res.json(bootcamps);
        console.log('> controllers/bootcamp.controller.js: Bootcamps y sus Usuarios encontrados');
    } catch(error) {
        res.json({Mensaje: 'No se pudo obtener la lista de Bootcamps'});
        console.log('> controllers/bootcamp.controller.js: No se pudo obtener la lista de Bootcamps', error);
    };
};