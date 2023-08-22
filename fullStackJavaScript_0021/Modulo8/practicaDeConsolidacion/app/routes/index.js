import session from 'express-session';
import dotenv from 'dotenv';
import express from 'express';
import { verifySignUp } from '../middleware/index.js';
const router = express.Router();

import User from '../models/user.model.js';
import { createUser, login } from '../controllers/user.controller.js';

dotenv.config(dotenv);

/* GET Página de inicio */
router.get('/', function(req, res, next) {  // Endpoint para Frontend
  res.render('index', { session: req.session, title: 'Moódulo 8 - Práctica de consolidación' });
});

/* GET Página de registro */
router.get('/signup', (req, res, next) => { // Endpoint para Frontend
  res.render('session/signup');
});

/* POST Crear Usuario */
router.post('/signup', verifySignUp, (req, res, next) => { // Endpoint Backend para POSTMAN y Frontend
  createUser(req, res);
});

/* GET Página de inicio de sesión */
router.get('/signin', (req, res, next) => { // Endpoint para Frontend
  req.session.isLoggedIn = true;
  res.render('session/signin');
});

/* POST Loguear Usuario */
router.post('/signin', (req, res, next) => { // Endpoint Backend para POSTMAN y Frontend
  login(req, res);
});

/* GET Pagina de confirmación de cierre de sesión */
router.get('/signout', (req, res) => { // Endpoint para Frontend
  req.session.isLoggedIn = false;
  res.render('session/signout');
});

export default router;