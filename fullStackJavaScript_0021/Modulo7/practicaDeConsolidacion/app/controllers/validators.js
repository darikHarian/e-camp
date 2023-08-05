import { db } from '../models/index.js'

export const tableExists = async (tableName) => {
    const result = await db.getQueryInterface().showAllTables()
    return result.includes(tableName)
}