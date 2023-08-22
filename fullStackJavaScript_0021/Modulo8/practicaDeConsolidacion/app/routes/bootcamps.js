import express from 'express';
import { createBootcamp, addUser, findById, findAll } from '../controllers/bootcamp.controller.js';
const router = express.Router();

/* POST Creación de Bootcamp */
router.post('/', (req, res) => { // Endpoint Backend para POSTMAN
  createBootcamp(req, res);
});

/* POST Creación de Bootcamp */
router.post('/addUser', (req, res) => { // Endpoint Backend para POSTMAN
  addUser(req, res);
});

/* GET Mostrar Bootcamp por ID */
router.get('/:id', (req, res) => { // Endpoint Backend para POSTMAN
  findById(req, res);
});

/* GET Mostrar todos los Bootcamps */
router.get('/', (req, res) => { // Endpoint Backend para POSTMAN
  findAll(req, res);
});

export default router;