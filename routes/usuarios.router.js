const express = require('express');
const UsuariosController = require('../controllers/usuarios.controller');

const router = express.Router();

const error = {};


router.get('/registrar', async (req, res) => {
    res.render('usuarios/registrar', { title: 'Registrar' });
});

router.get('/login', async (req, res) => {
    res.render('usuarios/login', { title: 'Login' });
});

router.post('/registrar', async (req, res) => {
    if (req.body.nombre && req.body.apellido && req.body.usuario && req.body.password) {
        const { nombre, apellido, usuario, password } = req.body;

        await UsuariosController.registrar(nombre, apellido, usuario, password, 6)
            .catch((message) => {
                error.message = message;
                res.redirect('/usuarios/registrar');
            })
            .then((token) => {
                
            });
    }
});


module.exports = router;
