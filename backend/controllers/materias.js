
const Materia = require('../schemas/materia');

exports.criarMateria = (req, res, next) => {
  console.log('Body: '+req.body.nome);
  const materia = new Materia({
    nome: req.body.nome,
    codMateria: req.body.codMateria,
    descricao: req.body.descricao,
    hue: req.body.hue,
    linkImg: req.body.linkImg,
    diasSemana: req.body.diasSemana,
    nomeProf: req.body.nomeProf
  });

  materia.save().then(materiaCriada => {
    console.log(materiaCriada);
    res.status(201).json({
      msg: 'Matéria criada com sucesso!',
      materia: materiaCriada
    });
  }).catch(erro => {
    res.status(500).json({msg: 'Falha ao criar matéria!'})
  });
}

exports.buscarMaterias = (req, res, next) => {
  const listaMaterias = JSON.parse(req.headers.materias);
  Materia.find({ _id: listaMaterias }).then(materiasBuscadas => {
    res.status(200).json(
      { msg: 'Matérias buscadas com sucesso!', materias: materiasBuscadas }
    );
  }).catch(erro => {
    res.status(500).json({ msg: 'Falha ao buscar matérias!', erro: erro })
  });
}

exports.buscarMateria = (req, res, next) => {
  const cod = req.params.cod.toUpperCase();
  Materia.findOne({ codMateria: cod }).then(materia => {
    if (!materia) {
      return res.status(200).json({ msg: 'Matéria não encontrada!', materiaEncontrada: null });
    }
    res.status(200).json({ msg: 'Matéria encontrada!', materiaEncontrada: materia })
  }).catch(erro => {
    return res.status(500).json({ msg: 'Falha ao buscar matéria!', erro: erro });
  });
}

exports.excluirMateria = (req, res, next) => {
  Materia.deleteOne({_id: req.params.id})
  .then(result => {
    if(result.deletedCount > 0){
      return res.status(201).json({ msg: 'Matéria excluída com sucesso!', excluido: true });
    }
  })
  .catch(erro => {
    return res.status(500).json({ msg: 'Falha ao excluir matéria!', erro: erro });
  });
}

exports.alterarMateria = (req, res, next) => {
  const materia = JSON.parse(req.body.materia);
  Materia.updateOne({_id: materia._id}, materia).then(result => {
    if(result.modifiedCount > 0){
      return res.status(201).json({msg: 'Matéria atualizada com sucesso!', dados: result})
    }else{
      return res.status(200).json({msg: 'Matéria não foi alterada!', dados: result})
    }
  })
  .catch(erro => {
    return res.status(500).json({ msg: 'Falha ao atualizar matéria!', erro: erro });
  });
}

