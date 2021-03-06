const express = require('express');
const router = express.Router();
const UsuariosController = require ('../controllers/usuarios');

router.get('/:email', UsuariosController.buscarUsuario);
router.post('', UsuariosController.criarUsuario);
router.put('', UsuariosController.controleTurma);
router.put('/verificar', UsuariosController.confirmarVerificado);

module.exports = router;

//http://localhost:3000/api/usuario/
