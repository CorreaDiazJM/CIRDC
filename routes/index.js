const express = require('express');
const usuariosRoutes = require('./usuarios.router');
const documentosRoutes = require('./documentos.router');

const router = express.Router();


router.use('/usuarios', usuariosRoutes);
router.use('/documentos', documentosRoutes);


module.exports = router;
