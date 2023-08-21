import express from 'express';
import { createUser } from '../controllers/user.controller.js'
const router = express.Router();

/* GET Creación de usuario */
router.post('/createUser', function(req, res) {
  console.log("SECRET_KEY:", process.env.SECRET_KEY)
  createUser(req, res);
})

export default router;