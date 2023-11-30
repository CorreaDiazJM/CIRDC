const express = require('express');
const ComprasController = require('../controllers/compras.controller');
const { checkLogin } = require('../middleware/auth');

const router = express.Router();


router.use((req, res, next) => {
    if (req.query._method === 'POST') {
        req.method = 'POST';
        req.url = req.path;
    }

    next(); 
});

router.get('/historial', checkLogin, async (req, res) => {
    const { usuario } = req.token_data;

    await ComprasController.mostrarComprasPorProducto(usuario)
        .catch((err) => res.send(err))
        .then((compras) => res.render('compras/historial', { compras }));
});

router.post('/comprar/:idComprador/:idProducto', checkLogin, async (req, res) => {
    await ComprasController.ingresar(1, req.params.idComprador, req.params.idProducto)
        .catch((err) => res.send(err))
        .then(() => res.redirect('/ventas'));
});


module.exports = router;
