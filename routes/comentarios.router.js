const express = require('express');
const ComentariosController = require('../controllers/comentarios.controller');
const DocumentosController = require('../controllers/documentos.controller');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();


router.use((req, res, next) => {
    if (req.query._method === 'POST') {
        req.method = 'POST';
        req.url = req.path;
    }

    next(); 
});

router.get('/:idDocumento', checkLogin, async (req, res) => {
    const { rol, usuario } = req.token_data;

    await ComentariosController.mostrarComentariosPorDocumento(req.params.idDocumento)
        .catch((err) => res.send(err))
        .then((comentarios) => {
            DocumentosController.mostrar(rol)
                .catch((err) => res.send(err))
                .then((documentos) => {
                    let documento;

                    for (const doc of documentos) {
                        if (parseInt(req.params.idDocumento) === parseInt(doc.id_doc)) {
                            documento = doc;
                        }
                    }

                    res.render('comentarios/comentarios', { comentarios, documento, usuario });
                });
        });
});

router.post('/:idDocumento/:usuario', checkLogin, async (req, res) => {
    if (req.body.comentario) {
        const { comentario } = req.body;
        const { idDocumento, usuario } = req.params;

        await ComentariosController.ingresar(comentario, idDocumento, usuario)
            .catch((err) => res.send(err))
            .then((token) => {
                req.cookies.token_coded = token;
                res.redirect('/comentarios/' + idDocumento);
            });
    }
});


module.exports = router;
