const express = require('express');
const UsuariosController = require('../controllers/usuarios.controller');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();

const error = {};


router.get('/registrar', async (req, res) => {
    let message = '';

    if (error) {
        message = error.message
        error.message = '';
    };

    res.render('usuarios/registrar', {
        title: 'Registrar',
        error: message
    });
});

router.get('/login', async (req, res) => {
    let message = '';

    if (error) {
        message = error.message
        error.message = '';
    };

    res.render('usuarios/login', {
        title: 'Login',
        error: message
    });
});

router.get('/logout', checkLogin, async (req, res) => {
    res.clearCookie('token_coded');
    res.redirect('/usuarios/login');
});

router.post('/registrar', async (req, res) => {
    if (req.body.nombre && req.body.apellido && req.body.usuario && req.body.password) {
        const { nombre, apellido, usuario, password } = req.body;

        await UsuariosController.registrar(nombre, apellido, usuario, password, 6)
            .catch((message) => {
                error.message = message;
                res.redirect('/usuarios/registrar');
            })
            .then((token) => res.cookie('token_coded', token).redirect('/documentos'));
    } else {
        res.redirect('/usuarios/register');
    }
});

router.post('/login', async (req, res) => {
    if (req.body.usuario && req.body.password) {
        const { usuario, password } = req.body;

        await UsuariosController.login(usuario, password)
            .catch((message) => {
                error.message = message;
                res.redirect('/usuarios/login');
            })
            .then((token) => res.cookie('token_coded', token).redirect('/documentos'));
    } else {
        res.redirect('/usuarios/login');
    }
});


module.exports = router;
