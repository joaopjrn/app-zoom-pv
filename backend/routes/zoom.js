const express = require('express');
const router = express.Router();
const ZoomController = require ('../controllers/zoom');

router.post('', ZoomController.criarLinkZoom);
router.post('/usuario', ZoomController.criarUsuario);
router.get('/:email', ZoomController.verificarUsuario);

module.exports = router;

//http://localhost:3000/api/usuario/
