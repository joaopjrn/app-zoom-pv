const express = require('express');
const router = express.Router();
const UsuariosController = require ('../controllers/usuarios');

router.get('/:email', UsuariosController.buscarUsuario);
router.post('', UsuariosController.criarUsuario);
router.put('', UsuariosController.atualizarUsuario);

module.exports = router;

//http://localhost:3000/api/usuario/