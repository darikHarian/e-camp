import dotenv from 'dotenv'
import Sequelize from 'sequelize'

dotenv.config(dotenv)

// CREACION BASE DE DATOS
export const db = (
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
        await db.authenticate()
        .then(() => console.log('> models/index.js: Connection has been established successfully'))
        .catch(err=>console.error("> models/index.js Unable to connect to the database:", err));   
    } catch (error) {
        throw error;
    }  
}