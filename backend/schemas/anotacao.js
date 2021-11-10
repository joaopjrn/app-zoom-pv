const mongoose = require('mongoose');

const anotacaoSchema = mongoose.Schema({
  // idAula: { type: mongoose.Schema.Types.ObjectId, ref: "Aula", required: true },
  // idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  codigo: { type: String, required: true },
  conteudo: { type: String, required: true },
});

module.exports = mongoose.model('Anotacao', anotacaoSchema);
