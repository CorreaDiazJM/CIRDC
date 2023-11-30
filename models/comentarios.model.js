const db = require('../database/connection');
const UsuariosModel = require('./usuarios.model');


class ComentariosModel {
    async ingresar(comentario, idDocumento, usuario) {
        return new Promise((resolve, reject) => {
            UsuariosModel.buscarUsuarioPorUsername(usuario)
                .catch((err) => reject(err))
                .then((user) => {
                    db.query(
                        'INSERT INTO Comentarios (comentario_com, id_doc_com, id_usu_com) VALUES (?, ?, ?);',
                        [comentario, idDocumento, user.id_usu],
                        (err) => {
                            if (err) reject(err);
                            UsuariosModel.subirDeNivel(usuario)
                                .catch((err) => reject(err))
                                .then((token) => resolve(token));
                        });
                });
        });
    }

    async mostrarComentariosPorDocumento(idDocumento) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM Comentarios INNER JOIN Documentos ON id_doc_com = id_doc INNER JOIN Usuarios ON id_usu_com = id_usu WHERE id_doc = ?;',
                [idDocumento],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }
}


module.exports = new ComentariosModel();
