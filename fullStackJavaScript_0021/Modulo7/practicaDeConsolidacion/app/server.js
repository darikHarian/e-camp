import { db_connect } from "./models/index.js";
import express from 'express'
import userRoutes from './controllers/user.controller.js'
import bootcampRoutes from './controllers/bootcamp.controller.js'

const app = express();
const PORT = 3100

db_connect()

// RUTAS
app.use(userRoutes)
app.use(bootcampRoutes)

app.listen(PORT, () => {
    console.log(`> Server is running on port ${PORT}`)
})