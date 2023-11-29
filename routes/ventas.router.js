const express = require('express');
const VentasController = require('../controllers/ventas.controller');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();

const error = {};


router.get('/registrarProducto', checkLogin, async (req, res) => {
    let message = '';

    if (error.message) {
        message = error.message;
        error.message = '';
    }

    res.render('productos/registrar', { message });
});


module.exports = router;
