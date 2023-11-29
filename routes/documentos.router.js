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

module.exports = router;
