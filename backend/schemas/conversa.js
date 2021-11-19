const mongoose = require('mongoose');

const conversaSchema = mongoose.Schema({
  idMateria: { type: mongoose.SchemaTypes.ObjectId, ref: 'Materia', required: true },
  aluno: { type: {}, required: true },
  professor: { type: {}, required: true },
  notifAluno: { type: Boolean, required: true },
  notifProf: { type: Boolean, required: true },
});

module.exports = mongoose.model('Conversa', conversaSchema);
