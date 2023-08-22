import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Bootcamp } from '../models/index.js';
import { verifyEmail } from '../middleware/verifySignUp.js';

/* Ruta para crear un nuevo Usuario */
export const createUser = async (req, res, err) => {
    //Recibir los parámetros del formulario
    const {firstName, lastName, email, password, passwordConfirm} = req.body;
  
    // Verificar que todos los campos hayan sido ingresados
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
        console.log('> ./app/controllers/user.controller.js: Debe ingresar todos los campos', err);
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

    verifyEmail(email);
  
    // // Verificar que el email no exista en la Base de Datos
    // const userExist = await User.findOne({where:{email}});
    // if (userExist) {
    //     console.log(`> ./app.controllers/user.controller.js: El Usuario con ese Correo ya existe`, err);
    //     return res.status(400).json({
    //         err: `> ./app.controllers/user.controller.js: El Usuario con ese Correo ya existe`
    //     });
    // };
  
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
                email,
                firstName
            }
        }, process.env.SECRET_KEY, {'expiresIn':'1h'}
    );
  
    // Retornar Token al Cliente
    res.json({Mensaje: 'Usuario creado correctamente', token});
};

/* Ruta para iniciar sesión */
export const login = async (req, res) => {
    // Recibir los parámetros del formulario
    const {email, password} = req.body;

    // Verificar que el Usuario exista en la Base de Datos
    const user = await User.findOne({where:{email}});
    if (!user) {
        return res.status(404).json({error: `No existe el Usuario con el email: ${email}`})
    };

    // Verificar que la contraseña es la correcta
    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) {
        return res.status(400).json({'Contraseña incorrecta': 'Inténtelo otra vez'});
    };

    // Crear Token
    const token = jwt.sign({
        data: {
            id: user.id,
            email: user.email,
            nombre: user.nombre
        }
    }, process.env.SECRET_KEY, {'expiresIn':'1h'});

    // Retornar Token al Cliente
    res.json({Mensaje: 'Usuario logueado correctamente', token});
};

export const findAll = async (req, res) => {
    try {
        const users = await User.findAll({include: { model: Bootcamp, as: 'bootcamps' }});
        res.json(users);
        console.log('> app/controllers/user.controller.js: Usuarios y sus Bootcamps encontrados');
    } catch(error) {
        res.json({Mensaje: 'No se pudo obtener la lista de usuarios'});
        console.log('> app/controllers/user.controller.js: No se pudo obtener la lista de usuarios', error);
    };
};

export const findUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id, {include: { model: Bootcamp, as: 'bootcamps' }});
        if (!user) {
            res.json({'Mensaje': 'El Usuario no existe'});
            console.log('> app/controllers/user.controller.js: El Usuario no existe');
        } else {
            res.json({'Usuario': user});
            console.log('> app/controllers/user.controller.js: Usuario encontrado');
        }
    } catch(error) {
        res.json({'Mensaje': 'El Usuario no pudo ser encontrado'});
        console.log('> app/controllers/user.controller.js: El Usuario no pudo ser encontrado', error);
    };
};

export const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const firstName = req.body.firstName;
        const lastName  = req.body.lastName;
        const email = req.body.email;

        await User.update(
            {firstName, lastName, email},
            {where: {id}}
        );

        res.json({'Mensaje': 'Usuario actualizado correctamente'});
        console.log('> app/controllers/user.controller.js: Usuario actualizado');
    } catch(error) {
        res.json({'Mensaje': 'El usuario no pudo ser actualizado'});
        console.log('> app/controllers/user.controller.js: El usuario no pudo ser actualizado', error);
    };
};

export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.destroy({where: {id}});
        res.json({'Mensaje': 'Usuario eliminado correctamente'});
        console.log('> app/controllers/user.controller.js: Usuario eliminado');
    } catch(error) {
        res.json({'Mensaje': 'No se ha podido eliminar el usuario'});
        console.log('> app/controllers/user.controller.js: No se ha podido eliminar el usuario', error);
    };
};