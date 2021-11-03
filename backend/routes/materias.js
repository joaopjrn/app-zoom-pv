const express = require('express');
const router = express.Router();
const MateriasController = require ('../controllers/materias');
// const checkAuth = require('../middleware/check-auth');

// const { create } = require('../models/post');
// const extractFile = require('../middleware/file');

router.post('', MateriasController.criarMateria);
router.get('', MateriasController.buscarMaterias);
router.get('/:cod', MateriasController.buscarMateria);


module.exports = router;
