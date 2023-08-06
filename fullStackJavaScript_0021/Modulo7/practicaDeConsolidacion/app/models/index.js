import { db } from "../config/db.config.js";

// CONEXIÓN BASE DE DATOS
export const db_connect = async () => {
    try {
        await db.authenticate()
        .then(() => console.log('> config/db.config.js: Connection has been established successfully'))
        .catch(err=>console.error("> config/db.config.js: Unable to connect to the database:", err));   
    } catch (error) {
        throw error;
    }  
}