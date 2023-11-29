const DocumentosModel = require('../models/documentos.model');


class DocumentosController {
    async insertar(titulo, contenido, rol, usuario) {
        return new Promise((resolve, reject) => {
            DocumentosModel.insertar(titulo, contenido, rol, usuario)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrar(rol) {
        return new Promise((resolve, reject) => {
            DocumentosModel.mostrar(rol)
                .catch((err) => reject(err))
                .then((documentos) => resolve(documentos));
        });
    }
}


module.exports = new DocumentosController();
