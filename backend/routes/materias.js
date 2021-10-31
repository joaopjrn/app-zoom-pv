const express = require('express');
const router = express.Router();
const MateriasController = require ('../controllers/materias');
// const checkAuth = require('../middleware/check-auth');
// const extractFile = require('../middleware/file');

// const { create } = require('../models/post');

router.post('', MateriasController.criarMateria);
router.get('', MateriasController.oi);

module.exports = router;
