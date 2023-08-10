import { db } from "../config/db.config.js";
// import { Sequelize, DataTypes as dt } from 'sequelize'
import { User } from './user.model.js'
import { Bootcamp } from './bootcamp.model.js'



// // MODELO TABLA INTERMEDIA
// const UserBootcamp = db.define('User_Bootcamp', {
//     createdAt: {
//         type: dt.DATE,
//         defaultValue: Sequelize.NOW,
//         allowNull: true,
//         validate: {
//             noUpdate(value) {
//                 if (this.changed('createdAt')) {
//                     throw new Error('No se puede actualizar el campo createdAt');
//                 }
//             }
//         }
//     },
//     updatedAt: {
//         type: dt.DATE,
//         defaultValue: Sequelize.NOW,
//         allowNull: false
//     },
//     user_id: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'users',
//             key: 'id'
//         },
//         allowNull: false
//     },
//     bootcamp_id:{
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'bootcamps',
//             key: 'id'
//         },
//         allowNull: false
//     }
// })



User.belongsToMany(Bootcamp, {through: 'UserBootcamp', as: 'bootcamps'})
Bootcamp.belongsToMany(User, {through: 'UserBootcamp', as: 'users'})

try {
    db.sync()
} catch(err) {
    console.error('> models/index.js: No se pudo sincronizar con la tabla User_Bootcamp', err)
}

export {User, Bootcamp}