const express = require('express');
const router = express.Router();
const AulasController = require ('../controllers/aulas');
// const checkAuth = require('../middleware/check-auth');

// const { create } = require('../models/post');
// const extractFile = require('../middleware/file');

router.post('', AulasController.criarAula);
/*router.get('', MateriasController.buscarMaterias);
router.get('/:cod', MateriasController.buscarMateria);*/


module.exports = router;
