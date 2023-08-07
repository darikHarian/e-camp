import express from 'express'
import { users } from './controllers/user.controller.js'
import { bootcamps } from './controllers/bootcamp.controller.js'

const app = express();
const PORT = 3100

// MIDLEWARES
app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )

// RUTAS
app.use('/users', users)
app.use('/bootcamps', bootcamps)

// SERVER
app.listen(PORT, () => {
    console.log(`> server.js: Server is running on port ${PORT}`)
})