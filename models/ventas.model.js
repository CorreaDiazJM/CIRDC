const db = require('../database/connection');
const UsuarioModel = require('./usuarios.model');


class VentasModel {
    async ingresar(producto, cantidad, usuario) {
        return new Promise((resolve, reject) => {
            this.buscarProductoPorDatos(producto, usuario)
                .catch((err) => reject(err))
                .then((productoData) => {
                    if (productoData.length) {
                        reject('El producto ya está registrado');
                    } else {
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
            db.query('SELECT * FROM Ventas WHERE id_ven = ?;', [idVenta], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async aumentarOferta(idVenta) {
        return new Promise((resolve, reject) => {
            this.buscarProductoPorId(idVenta)
                .catch((err) => reject(err))
                .then((producto) => {
                    if (producto) {
                        let { cantidad_ven } = producto[0];

                        cantidad_ven++;
    
                        db.query(
                            'UPDATE Ventas SET cantidad_ven = ? WHERE id_ven = ?;',
                            [cantidad_ven, idVenta],
                            (err) => {
                                if (err) reject(err);
                                resolve();
                            });
                    } else {
                        reject('El producto no está registrado');
                    }
                });
        });
    }
}


module.exports = new VentasModel();
