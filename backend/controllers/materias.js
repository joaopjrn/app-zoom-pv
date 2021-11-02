const Materia = require('../schemas/materia');

exports.criarMateria = (req, res, next) => {
  console.log('Body: '+req.body.nome);
  const materia = new Materia({
    nome: req.body.nome,
    codMateria: req.body.codMateria,
    descricao: req.body.descricao,
    linkImg: req.body.linkImg,
    diasSemana: req.body.diasSemana,
    nomeProf: req.body.nomeProf
  });

  materia.save().then(materiaCriada => {
    console.log(materiaCriada);
    res.status(201).json({
      msg: 'Matéria criada com sucesso!',
      materia: {
        ...materiaCriada,
        _id: materiaCriada._id
      }
    });
  }).catch(erro => {
    res.status(500).json({msg: 'Falha ao criar Matéria!'})
  });
}

exports.buscarMaterias = (req, res, next) => {
  const listaMaterias = JSON.parse(req.headers.materias);
  Materia.find({ _id: listaMaterias }).then(materiasBuscadas => {
    res.status(200).json(
      { msg: 'Matérias buscadas com sucesso!', materias: materiasBuscadas }
    );
  }).catch(erro => {
    res.status(500).json({ msg: 'Falha ao buscar Matéria!', erro: erro })
  });
}


