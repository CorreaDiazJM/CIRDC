const express = require('express');
const VentasController = require('../controllers/ventas.controller');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();

const error = {};


router.use((req, res, next) => {
    if (req.query._method === 'DELETE') {
        req.method = 'DELETE';
        req.url = req.path;
    } else if (req.query._method === 'PUT') {
        req.method = 'PUT';
        req.url = req.path;
    }

    next(); 
});

router.get('/', checkLogin, async (req, res) => {
    const { rol } = req.token_data;

    await VentasController.mostrar(rol)
        .catch((err) => res.send(err))
        .then((productos) => res.render('productos/home', { productos }));

    res.render('productos/home');
});

router.get('/registrarProducto', checkLogin, async (req, res) => {
    let message = '';

    if (error.message) {
        message = error.message;
        error.message = '';
    }

    res.render('productos/registrar', {
        title: 'Registrar Producto',
        error: message
    });
});

router.post('/registrarProducto', checkLogin, async (req, res) => {
    const { usuario } = req.token_data;

    console.log(req.body);

    if (req.body.producto && req.body.cantidad) {
        const { producto, cantidad } = req.body;

        await VentasController.ingresar(producto, cantidad, usuario)
            .catch((err) => {
                error.message = err;
                res.redirect('/ventas/registrarProducto');
            })
            .then(() => res.redirect('/ventas'));
    } else {
        error.message = 'Todos los datos son requeridos';
        res.redirect('/ventas/registrarProducto');
    }
});

router.put('/aumentarCantidad/:idVenta', checkLogin, async (req, res) => {
    await VentasController.aumentarOferta(req.params.idVenta)
        .catch((err) => res.send(err))
        .then(() => res.redirect('/ventas'));
});


module.exports = router;
