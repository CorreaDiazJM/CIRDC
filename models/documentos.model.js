const db = require('../database/connection');


class DocumentosModel {
    async insertar(titulo, contenido, rol, usuario) {
        return new Promise((resolve, reject) => {
            this.mostrarDocumentoPorDatos(titulo, contenido)
                .catch((err) => {
                    if (err === 'err') {
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
                                            [rol, documento.id_doc],
                                            (err) => {
                                                if (err) reject(err);
                                                resolve();
                                            });
                                    });
                            });
                    }
                })
                .then(() => reject('El documento ya existe'));
        });
    }

    async mostrar(rol) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM Documentos INNER JOIN Rol_Documento ON id_doc = id_doc_roldoc WHERE id_rol_roldoc >= ?;',
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
                    if (!results.length) reject('err');
                    resolve(results[0]);
                });
        });
    }
}


module.exports = new DocumentosModel();
