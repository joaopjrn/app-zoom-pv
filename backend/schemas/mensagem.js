const mongoose = require('mongoose');

const mensagemSchema = mongoose.Schema({
  // idAula: { type: mongoose.Schema.Types.ObjectId, ref: "Aula", required: true },
  // idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  idEnviou: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  conteudo: { type: String, required: true },
}, {timestamps: true});

module.exports = mongoose.model('Mensagem', mensagemSchema);
