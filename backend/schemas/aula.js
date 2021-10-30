const mongoose = require('mongoose');

const aulaSchema = mongoose.Schema({
  nome: { type: String, required: true },
  idMateria: { type: mongoose.Schema.Types.ObjectId, ref: "Materia", required: true },
  conteudo: { type: String, required: true },
  data: { type: String, required: true },
  hora: { type: String, required: true },
  linkZoom: { type: String, required: true },
});

module.exports = mongoose.model('Aula');
