import { db } from './db.config.js'
import { QueryTypes } from 'sequelize'

export const tableExists = async (tableName) => {
    const result = await db.getQueryInterface().showAllTables()
    return result.includes(tableName)
}

// CREA LA TABLA USERS SI NO EXISTE
export const usersTableInit = async () => {
    try {
        const tableName = 'Users'
        const exists = await tableExists(tableName)
        if (exists) {
            
        } else {
            const createTableUsers = await db.query(
                `
                    CREATE TABLE "${tableName}"(
                        id SERIAL PRIMARY KEY NOT NULL,
                        "firstName" VARCHAR(255) NOT NULL,
                        "lastName" VARCHAR(255) NOT NULL,
                        "email" VARCHAR (255) UNIQUE NOT NULL,
                        "createdAt" TIMESTAMP WITH TIME ZONE,
                        "updatedAt" TIMESTAMP WITH TIME ZONE
                    )
                `, 
                {
                    type: QueryTypes.SELECT
                }
            )
            console.log(`> config/validators.js: Tabla ${tableName} creada correctamente`)
        }
    } catch(error) {
        console.log(`> config/user.data.js: No se pudo crear la tabla ${tableName}`, error)
    }
}