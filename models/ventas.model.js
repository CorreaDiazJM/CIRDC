const db = require('../database/connection');
const UsuarioModel = require('./usuarios.model');


class VentasModel {
    async ingresar(producto, cantidad, usuario) {
        return new Promise((resolve, reject) => {
            this.buscarProductoPorDatos(producto, usuario)
                .catch((err) => reject(err))
                .then((productoData) => {
                    if (productoData) {
                        reject('El producto ya está registrado');
                    } else {
                        db.query(
                            'INSERT INTO Ventas (producto_ven, cantidad_ven, id_usu_ven) VALUES (?, ?, ?);',
                            [producto, cantidad, productoData.id_usu],
                            (err) => {
                                if (err) reject(err);
                                resolve();
                            });
                    }
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

    async buscarProductoPorDatos(producto, usuario) {
        return new Promise((resolve, reject) => {
            UsuarioModel.buscarUsuarioPorUsername(usuario)
                .catch((err) => reject(err))
                .then((user) => {
                    db.query(
                        'SELECT * FROM Ventas INNER JOIN Usuarios ON id_usu = id_usu_ven WHERE producto_ven = ? AND id_usu_ven = ?;',
                        [producto, user.id_usu],
                        (err, results) => {
                            if (err) reject(err);
                            resolve(results);
                        });
                });
        });
    }

    async buscarProductoPorId(idVenta) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Ventas WHERE id_ven = ?;', [idVenta])
        });
    }

    async aumentarOferta(usuario, producto) {
        return new Promise((resolve, reject) => {
            this.buscarProductoPorDatos(producto, usuario)
                .catch((err) => reject(err))
                .then((productosData) => {
                    let { cantidad_ven, id_ven } = productosData;
                    
                    cantidad_ven += 1;

                    db.query('UPDATE Ventas SET cantidad_ven = ' + cantidad_ven + ' WHERE id_ven = ' + id_ven)
                        .catch((err) => reject(err))
                        .then(() => resolve());
                });
        });
    }
}


module.exports = new VentasModel();
