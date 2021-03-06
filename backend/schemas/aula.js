const mongoose = require('mongoose');

const aulaSchema = mongoose.Schema({
  nome: { type: String, required: true },
  idMateria: { type: mongoose.Schema.Types.ObjectId, ref: "Materia", required: true },
  conteudo: { type: String, required: true },
  data: { type: String, required: true },
  linkZoomProf: { type: String },
  linkZoomAluno: { type: String },
  idMeeting: { type: String }
});

module.exports = mongoose.model('Aula', aulaSchema);
