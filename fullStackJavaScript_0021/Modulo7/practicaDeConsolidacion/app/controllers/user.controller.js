import { Router } from 'express'
import { QueryTypes } from 'sequelize'
import { db } from '../models/index.js'
import { User } from '../models/user.model.js'
import { tableExists } from './validators.js'

const router = Router()
let tableName = ''

export const usersTableInit = async () => {
    try {
        // CREA LA TABLA USERS SI NO EXISTE
        tableName = 'Users'
        const exists = await tableExists(tableName)
        if (exists) {
            console.log(`> controllers/user.controller: La tabla ${tableName} ya existe`)
        } else {
            const createTableUsers = await db.query(
                `CREATE TABLE IF NOT EXISTS "Users"(
                    id SERIAL PRIMARY KEY NOT NULL,
                    firstName VARCHAR(255) NOT NULL,
                    lastName VARCHAR(255) NOT NULL,
                    email VARCHAR (255) UNIQUE NOT NULL,
                    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
                    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL)`, 
                {
                    type: QueryTypes.SELECT
                }
            )
        }
    } catch(error) {
        console.log("Error", error);
    }
}

// RUTAS
export const userRoutes = async () => {
    router.get('/users'), async (req, res) => {

    }
}