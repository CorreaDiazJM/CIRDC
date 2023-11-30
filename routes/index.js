const express = require('express');
const usuariosRoutes = require('./usuarios.router');
const documentosRoutes = require('./documentos.router');
const ventasRoutes = require('./ventas.router');
const comprasRoutes = require('./compras.router');

const router = express.Router();


router.use('/usuarios', usuariosRoutes);
router.use('/documentos', documentosRoutes);
router.use('/ventas', ventasRoutes);
router.use('/compras', comprasRoutes);


module.exports = router;
