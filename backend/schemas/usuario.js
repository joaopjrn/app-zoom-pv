const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  tipo: { type: Number, required: true },
  materias: { type: String },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
