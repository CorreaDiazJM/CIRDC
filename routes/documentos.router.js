const express = require('express');
const DocumentosController = require('../controllers/documentos.controller');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();

const error = {};


router.get('/', checkLogin, async (req, res) => {
    await DocumentosController.mostrar(req.token_data.rol)
        .catch((err) => res.send(err))
        .then((documentos) => res.send(documentos));
});

router.get('/ingresar', checkLogin, async (req, res) => {
    res.render('documentos/registrar', {
        title: 'Ingresar Documento',
        error: ''
    });
});

router.post('/ingresar', checkLogin, async (req, res) => {
    if (req.body.titulo && req.body.contenido) {
        const { titulo, contenido } = req.body;
        const { rol, usuario } = req.token_data;
        
        await DocumentosController.insertar(titulo, contenido, rol, usuario)
            .catch((err) => {
                error.message = err;
                res.redirect('/documentos/ingresar');
            })
            .then(() => res.redirect('/documentos'));
    } else {
        error.message = 'Todos los datos son obligatorios';
        res.redirect('/documentos/ingresar');
    }
});


module.exports = router;
