const UsuariosModel = require('../models/usuarios.model');


class UsuariosController {
    async registrar(nombre, apellido, usuario, contrasena, rol) {
        return new Promise((resolve, reject) => {
            UsuariosModel.registrar(nombre, apellido, usuario, contrasena, rol)
                .catch((err) => reject(err))
                .then((token) => resolve(token));
        });
    }
    
    async login(usuario, contrasena) {
        return new Promise((resolve, reject) => {
            UsuariosModel.login(usuario, contrasena)
                .catch((err) => reject(err))
                .then((token) => resolve(token));
        });
    }
}


module.exports = new UsuariosController();
