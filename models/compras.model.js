const db = require('../database/connection');
const UsuariosModel = require('./usuarios.model');
const VentasModel = require('./ventas.model');


class ComprasModel {
    async ingresar(cantidad, comprador, id_producto) {
        return new Promise((resolve, reject) => {
            UsuariosModel.buscarUsuarioPorUsername(comprador)
                .catch((err) => reject(err))
                .then((usuario) => {
                    VentasModel.buscarProductoPorId(id_producto)
                        .catch((err) => reject(err))
                        .then((producto) => {
                            let { cantidad_ven } = producto[0];

                            cantidad_ven -= cantidad;

                            db.query(
                                'UPDATE Ventas SET cantidad_ven = ? WHERE id_ven = ?;',
                                [cantidad_ven, id_producto],
                                (err) => {
                                    if (err) reject(err);

                                    db.query(
                                        'INSERT INTO Compras (cantidad_com, id_comprador_com, id_ven_com) VALUES (?, ?, ?);',
                                        [cantidad, usuario.id_usu, id_producto],
                                        (err) => {
                                            if (err) reject(err);
                                            resolve();
                                        });
                                });
                        });
                });
        });
    }

    async mostrarComprasPorProducto(usuario) {
        return new Promise((resolve, reject) => {
            UsuariosModel.buscarUsuarioPorUsername(usuario)
                .catch((err) => reject(err))
                .then((user) => {
                    db.query(
                        'SELECT * FROM Compras INNER JOIN Ventas ON id_ven_com = id_ven INNER JOIN Usuarios ON id_usu_ven = id_usu WHERE id_comprador_com = ?;',
                        [user.id_usu],
                        (err, results) => {
                            if (err) reject(err);
                            resolve(results);
                        });
                });
        });
    }
}


module.exports = new ComprasModel();
