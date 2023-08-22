import express from 'express';
import { createUser, login, findAll, findUserById, updateUserById, deleteUserById } from '../controllers/user.controller.js'
const router = express.Router();

/* GET Creación de usuario */
router.post('/createUser', (req, res) => { // Endpoint Backend
  createUser(req, res);
});

/* GET Inicio de sesión */
router.post('/login', (req, res) => { // Endpoint Backend
  login(req, res);
});

/* GET Mostrar todos los usuarios */
router.get('/', (req, res) => { // Endpoint Backend para POSTMAN
  findAll(req, res);
});

/* GET Mostrar Usuario por ID */
router.get('/:id', (req, res) => { // Endpoint Backend para POSTMAN
  findUserById(req, res);
});

/* PUT Actualizar Usuario por ID */
router.put('/:id', (req, res) => { // Endpoint Backend para POSTMAN
  updateUserById(req, res);
});

/* DELETE Eliminar Usuario por ID */
router.delete('/:id', (req, res) => { // Endpoint Backend para POSTMAN
  deleteUserById(req, res);
});

export default router;