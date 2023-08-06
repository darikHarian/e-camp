import { Sequelize, DataTypes as dt } from 'sequelize'
import { db } from '../config/db.config.js'

export const User = db.define('User', {
    id: {
        type: dt.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: dt.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [2, 255],
                msg: 'Nombre debe tener un mínimo de 2 caracteres'
            }
        }
    },
    lastName: {
        type: dt.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [2, 255],
                msg: 'Apellido debe tener un mínimo de 2 caracteres'
            }
        }
    },
    email: {
        type: dt.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    createdAt: {
        type: dt.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true
    },
    updatedAt: {
        type: dt.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true
    }
})