const db = require('../database/connection');
const UsuariosModel = require('./usuarios.model');


class DocumentosModel {
    async insertar(titulo, contenido, rol, usuario) {
        return new Promise((resolve, reject) => {
            this.mostrarDocumentoPorDatos(titulo, contenido)
                .catch((err) => reject(err))
                .then((documento) => {
                    if (documento.length) {
                        reject('El documento ya existe');
                    } else {
                        db.query(
                            'INSERT INTO Documentos (titulo_doc, contenido_doc) VALUES (?, ?);',
                            [titulo, contenido],
                            (err) => {
                                if (err) reject(err);

                                this.mostrarDocumentoPorDatos(titulo, contenido)
                                    .catch((err) => reject(err))
                                    .then((documento) => {
                                        db.query(
                                            'INSERT INTO Rol_Documento (id_rol_roldoc, id_doc_roldoc) VALUES (?, ?);',
                                            [rol, documento[0].id_doc],
                                            (err) => {
                                                if (err) reject(err);
                                                
                                                UsuariosModel.buscarUsuarioPorUsername(usuario)
                                                    .catch((err) => reject(err))
                                                    .then((user) => {
                                                        db.query(
                                                            'INSERT INTO Usuario_Documento (id_usu_usudoc, id_doc_usudoc) VALUES (?, ?);',
                                                            [user.id_usu, documento[0].id_doc],
                                                            (err) => {
                                                                if (err) reject(err);
                                                                resolve();
                                                            });
                                                    });
                                            });
                                    });
                            });
                    }
                });
        });
    }

    async mostrar(rol) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT titulo_doc, contenido_doc, nombre_usu, apellido_usu FROM Documentos INNER JOIN Rol_Documento ON id_doc = id_doc_roldoc INNER JOIN Usuario_Documento ON id_doc = id_doc_usudoc INNER JOIN Usuarios ON id_usu = id_usu_usudoc WHERE id_rol_roldoc >= ?;',
                [rol],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }

    async mostrarDocumentoPorDatos(titulo, contenido) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM Documentos WHERE titulo_doc = ? AND contenido_doc = ?;',
                [titulo, contenido],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }
}


module.exports = new DocumentosModel();