import db from '../config/db.config.js'
import User from './user.model.js'
import Bootcamp from './bootcamp.model.js'

User.belongsToMany(Bootcamp, {through: 'UserBootcamp', as: 'bootcamps'})
Bootcamp.belongsToMany(User, {through: 'UserBootcamp', as: 'users'})

try {
    db.sync()
    console.log('> ./app/models/index.js: Se ha sincronizado con la Base de Datos')
} catch(err) {
    console.log('> ./app/models/index.js: No se pudo sincronizar con la Base de Datos', err);
}

export { User, Bootcamp }