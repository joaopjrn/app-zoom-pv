const express = require('express');
const router = express.Router();
const AulasController = require ('../controllers/aulas');

router.post('', AulasController.criarAula);
router.get('/:id', AulasController.buscarAulas);
router.delete('/:id', AulasController.excluirAula);
router.put('', AulasController.alterarAula);

module.exports = router;

//http://localhost:3000/api/aula/
