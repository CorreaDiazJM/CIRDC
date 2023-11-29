const VentasModel = require('../models/ventas.model');


class VentasController {
    async ingresar(producto, cantidad, usuario) {
        return new Promise((resolve, reject) => {
            VentasModel.ingresar(producto, cantidad, usuario)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrar(rol) {
        return new Promise((resolve, reject) => {
            VentasModel.mostrar(rol)
                .catch((err) => reject(err))
                .then((ventas) => resolve(ventas));
        });
    }
}


module.exports = new VentasController();
