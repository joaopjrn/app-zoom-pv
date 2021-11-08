const express = require('express');
const router = express.Router();
const MateriasController = require ('../controllers/materias');

router.post('', MateriasController.criarMateria);
router.get('', MateriasController.buscarMaterias);
router.get('/:cod', MateriasController.buscarMateria);


module.exports = router;

//http://localhost:3000/api/materia/