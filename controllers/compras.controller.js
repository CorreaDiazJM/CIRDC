const ComprasModel = require('../models/compras.model');


class ComprasController {
    async ingresar(cantidad, comprador, id_producto) {
        return new Promise((resolve, reject) => {
            ComprasModel.ingresar(cantidad, comprador, id_producto)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }
}


module.exports = new ComprasController();
