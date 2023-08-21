import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

/* Ruta para crear un nuevo Usuario */
export const createUser = async (req, res) => {
    //Recibir los parámetros del formulario
    const {firstName, lastName, email, password, passwordConfirm} = req.body;
  
    // Verificar que todos los campos hayan sido ingresados
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        console.log('> ./app/controllers/user.controller.js: Debe ingresar todos los campos', err)
        return res.status(400).json({
            err: '> ./app/controllers/user.controller.js: Debe ingresar todos los campos'
        });
    };
  
    // Verificar que las contraseñas coincidan
    if (password != passwordConfirm) {
        console.log('> ./app/controllers/user.controller.js: Las contraseñas no coinciden', err)
        return res.staus(400).json({
            err: '> ./app/controllers/user.controller.js: Las contraseñas no coinciden'
        });
    };
  
    // Verificar que el email no exista en la Base de Datos
    const userExist = await User.findOne({where:{email}});
    if (userExist) {
        console.log(`> ./app.controllers/user.controller.js: El Usuario con ese Correo ya existe`, err)
        return res.status(400).json({
            err: `> ./app.controllers/user.controller.js: El Usuario con ese Correo ya existe`
        });
    };
  
    // Agregar el Usuario con Password Encriptado a la Base de Datos
    let newUser;
    try {
        const passwordEncrypt = await bcrypt.hash(password, 10);
        newUser = await User.create({firstName, lastName, email, password: passwordEncrypt});
    } catch(err) {
        return res.status(400).json(err);
    }
  
    // Generar un nuevo Token y enviarlo al Usuario
    const token = jwt.sign(
        {
            data: {
                id: newUser.id,
                email
            }
        }, process.env.SECRET_KEY, {'expiresIn':'1h'}
    );
  
    // Retornar Token al Cliente
    res.json(token);
};