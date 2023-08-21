import express from 'express'
const router = express.Router()

import { Bootcamp } from '../models/index.js'

/* GET bootcamps listing. */
router.get('/', function(req, res, next) {
  res.send('> ./app/routes/bootcamp.js: respond with a resource')
})

export default router