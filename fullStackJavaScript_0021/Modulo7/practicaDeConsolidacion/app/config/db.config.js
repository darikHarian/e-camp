import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import { db_connect } from '../models/index.js'

dotenv.config(dotenv)

// CREACION BASE DE DATOS
export const db = new Sequelize(
    'db_bootcamp',
    process.env.DB_USER,
    process.env.DB_PASSWD, {
        host: process.env.DB_HOST,
        dialect:'postgres',
        logging: false
})

db_connect()