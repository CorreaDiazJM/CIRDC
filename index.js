const express = require('express');
const usuariosRoutes = require('./usuarios.router');
const documentosRoutes = require('./documentos.router');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);
  res.render('index', { title: 'Express' });
});

router.use('/usuarios', usuariosRoutes);
router.use('/documentos', documentosRoutes);


module.exports = router;
