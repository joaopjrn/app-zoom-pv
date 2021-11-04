const express = require('express');
const router = express.Router();
const UsuariosController = require ('../controllers/usuarios');
// const checkAuth = require('../middleware/check-auth');

// const { create } = require('../models/post');
// const extractFile = require('../middleware/file');

router.get('/:email', UsuariosController.buscarUsuario);
router.post('', UsuariosController.criarUsuario);
/*router.get('', MateriasController.buscarMaterias);
router.get('/:cod', MateriasController.buscarMateria);*/


module.exports = router;
