import { DataTypes as dt } from 'sequelize'
import { db } from './index.js'

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
            EmailValidator(value) {
                if (!value.endsWith('@example.com')) {
                    throw Error('El correo debería tener el formato "correo@example.com"')
                }
            }
        }
    },
    createdAt: {
        type: dt.DATE,
        defaultValue: () => new DATE(),
        allowNull: false
    },
    updatedAt: {
        type: dt.DATE,
        defaultValue: () => new DATE(),
        allowNull: false
    }
})