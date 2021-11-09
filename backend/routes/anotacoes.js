const express = require('express');
const router = express.Router();
const AnotacoesController = require ('../controllers/anotacoes');

router.post('', AnotacoesController.criarAnotacao);
router.get('/:idAula/:idUsuario', AnotacoesController.buscarAnotacao);
// router.get('/:id', AulasController.buscarAulas);

module.exports = router;

//http://localhost:3000/api/anotacao/
