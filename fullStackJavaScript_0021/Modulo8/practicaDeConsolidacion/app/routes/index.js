import session from 'express-session'
import dotenv from 'dotenv';
import express from 'express';
const router = express.Router()

import User from '../models/user.model.js';
import { createUser, login } from '../controllers/user.controller.js';

dotenv.config(dotenv)

/* GET Página de inicio */
router.get('/', function(req, res, next) {
  res.render('index', { session: req.session, title: 'Moódulo 8 - Práctica de consolidación' })
});

/* GET Página de registro */
router.get('/signup', (req, res, next) => {
  res.render('session/signup');
});

/* POST Crear Usuario */
router.post('/signup', (req, res, next) => { // Endpoint Backend para POSTMAN
  createUser(req, res);
});

/* GET Página de inicio de sesión */
router.get('/signin', (req, res, next) => {
  req.session.isLoggedIn = true;
  res.render('session/signin');
});

/* POST Loguear Usuario */
router.post('/signin', (req, res, next) => { // Endpoint Backend para POSTMAN
  login(req, res);
});

/* GET Pagina de confirmación de cierre de sesión */
router.get('/signout', (req, res) => {
  req.session.isLoggedIn = false;
  res.render('session/signout');
});

// /* GET Página donde se gestionan los Users */
// router.get('/user', (req, res) => {
//   req.session.isLoggedIn = true;
//   res.render('users/index')
// });

// /* GET Página donde se gestionan los Bootcamps */
// router.get('/bootcamp', (req, res) => {
//   req.session.isLoggedIn = true;
//   res.render('bootcamps/index')
// });

export default router