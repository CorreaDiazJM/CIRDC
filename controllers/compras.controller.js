const ComprasModel = require('../models/compras.model');


class ComprasController {
    async ingresar(cantidad, comprador, id_producto) {
        return new Promise((resolve, reject) => {
            ComprasModel.ingresar(cantidad, comprador, id_producto)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrarComprasPorProducto(usuario) {
        return new Promise((resolve, reject) => {
            ComprasModel.mostrarComprasPorProducto(usuario)
                .catch((err) => reject(err))
                .then((compras) => resolve(compras));
        });
    }
}


module.exports = new ComprasController();
