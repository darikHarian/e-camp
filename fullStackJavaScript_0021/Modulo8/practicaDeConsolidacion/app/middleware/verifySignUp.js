import { User } from '../models/index.js'

export const verifyEmail = async (req, res, next, email, err) => {
    // Verificar que el email no exista en la Base de Datos
    const userExist = await User.findOne({where:{email}});
    if (userExist) {
        console.log(`El Usuario con ese Correo ya existe`, err);
        return res.status(400).json({
            err: `El Usuario con ese Correo ya existe`
        });
    };
    next();
}