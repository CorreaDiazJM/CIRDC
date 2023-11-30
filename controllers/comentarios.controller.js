const ComentariosModel = require('../models/comentarios.model');


class ComentariosController {
    async ingresar(comentario, idDocumento, usuario) {
        return new Promise((resolve, reject) => {
            ComentariosModel.ingresar(comentario, idDocumento, usuario)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrarComentariosPorDocumento(idDocumento) {
        return new Promise((resolve, reject) => {
            ComentariosModel.mostrarComentariosPorDocumento(idDocumento)
                .catch((err) => reject(err))
                .then((comentarios) => resolve(comentarios));
        });
    }
}


module.exports = new ComentariosController();
