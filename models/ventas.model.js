const db = require('../database/connection');
const UsuarioModel = require('./usuarios.model');


class VentasModel {
    async ingresar(producto, cantidad, usuario) {
        return new Promise((resolve, reject) => {
            UsuarioModel.buscarUsuarioPorUsername(usuario)
                .catch((err) => reject(err))
                .then((user) => {
                    db.query(
                        'INSERT INTO Ventas (producto_ven, cantidad_ven, id_usu_ven) VALUES (?, ?, ?);',
                        [producto, cantidad, user.id_usu],
                        (err) => {
                            if (err) reject(err);
                            resolve();
                        });
                });
        });
    }

    async mostrar(rol) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM Ventas INNER JOIN Usuarios ON id_usu = id_usu_ven WHERE id_rol_usu >= ?;',
                [rol],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }
}


module.exports = new VentasModel();
