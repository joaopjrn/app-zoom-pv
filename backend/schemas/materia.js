const mongoose = require('mongoose');

const materiaSchema = mongoose.Schema({
  nome: { type: String, required: true },
  codMateria: { type: String, required: true },
  descricao: { type: String, required: true },
  diasSemana: { type: [Number], required: true },
  nomeProf: { type: String, required: true },
});

module.exports = mongoose.model('Materia');
