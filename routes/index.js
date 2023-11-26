const express = require('express');
const usuariosRoutes = require('./usuarios.router');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/usuarios', usuariosRoutes);


module.exports = router;
