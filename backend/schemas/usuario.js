const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  tipo: { type: Number, required: true },
  materias: { type: [mongoose.Schema.Types.ObjectId], ref: "Materia", required: true },
  verificado: { type: Boolean, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
