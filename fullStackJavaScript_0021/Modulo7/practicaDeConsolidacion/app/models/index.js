import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import express from 'express'

dotenv.config(dotenv)

const app = express();
const PORT = 3100

// CREACION BASE DE DATOS
const sequelize = (
    new Sequelize(
        'db_bootcamp',
        process.env.DB_USER,
        process.env.DB_PASSWD, {
            host: process.env.DB_HOST,
            dialect:'postgres'
        }
    )
)

// CONEXIÓN BASE DE DATOS
export const db_connect = async () => {
    try {
        await sequelize.authenticate()
        .then(() => console.log('> Connection has been established successfully'))
        .catch(err=>console.error("> Unable to connect to the database:", err));   
    } catch (error) {
        throw error;
    } 
    
    app.listen(PORT, () => {
        console.log(`> Server is running on port ${PORT}`)
    })
}