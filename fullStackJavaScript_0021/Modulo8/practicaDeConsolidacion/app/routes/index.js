import dotenv from 'dotenv';
import express from 'express';
const router = express.Router()

import User from '../models/user.model.js';

dotenv.config(dotenv)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

router.get('/signup', (req, res, next) => {
  res.render('signup')
});

router.get('/signin', (req, res, next) => {
  res.render('signin')
})

export default router