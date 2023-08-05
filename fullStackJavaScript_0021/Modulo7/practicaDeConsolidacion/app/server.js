import { db_connect } from "./models/index.js";
import express from 'express'
import { usersTableInit, userRoutes } from './controllers/user.controller.js'
import bootcampRoutes from './controllers/bootcamp.controller.js'

const app = express();
const PORT = 3100

db_connect()

// RUTAS
app.use(userRoutes)
app.use(bootcampRoutes)

usersTableInit()

app.listen(PORT, () => {
    console.log(`> server.js: Server is running on port ${PORT}`)
})