const Aula = require('../schemas/aula');

exports.criarAula = (req, res, next) => {
  const aula = new Aula({
    nome:req.body.nome,
    idMateria: req.body.idMateria,
    conteudo: req.body.conteudo,
    data: req.body.data,
    linkZoomProf: req.body.linkZoomProf,
    linkZoomAluno: req.body.linkZoomAluno,
  });

  aula.save().then(aulaCriada => {
    aulaCriada.data = new Date(aulaCriada.data);
    const aulaRetorno = {
      nome: aulaCriada.nome,
      idMateria: aulaCriada.idMateria,
      conteudo: aulaCriada.conteudo,
      data: aulaCriada.data,
      linkZoom: aulaCriada.linkZoomProf
    }
    console.log(aulaCriada);
    res.status(201).json({ msg: "Aula criada com sucesso!", aula:  aulaRetorno  });
  }).catch(erro => {
    res.status(500).json({ msg: "Falha ao criar aula!" });
  });

}

exports.buscarAulas = (req, res, next) => {
  Aula.find({ idMateria: req.params.id }).then(aulasBuscadas => {
    let aulas = aulasBuscadas.map(aula => {
      return {
        _id: aula._id,
        idMateria: aula.idMateria,
        nome: aula.nome,
        conteudo: aula.conteudo,
        data: new Date(aula.data),
        linkZoom: req.params.tipo == "0" ? aula.linkZoomProf : aula.linkZoomAluno
      }
    });

    res.status(200).json({ msg: "Aulas encontradas com sucesso!", aulas: aulas });
  }).catch(erro => {
    res.status(500).json({ msg: "Falha ao buscar aulas!" });
  });
}

exports.excluirAula = (req, res, next) => {
  Aula.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    if(result.deletedCount > 0){
      return res.status(201).json({msg: 'Aula excluída com sucesso!', excluido: true});
    }
  })
  .catch(erro => {
    res.status(500).json({ msg: "Falha ao excluir aula!" });
  });
}

exports.alterarAula = (req, res, next) => {
  const aulaAtualizada = new Aula({
    _id: req.body._id,
    idMateria: req.body.idMateria,
    nome: req.body.nome,
    conteudo: req.body.conteudo,
    linkZoom: req.body.linkZoom,
    data: req.body.data
  });
  console.log(aulaAtualizada);
  Aula.updateOne({ _id: req.body._id }, aulaAtualizada).then(aulaAlterada => {
    console.log(aulaAlterada);
    return res.status(201).json({msg: 'Aula atualizada com sucesso!', aulaAlterada: aulaAlterada});
  }).catch(erro => {
    res.status(500).json({ msg: "Falha ao atualizar aula!" });
  });

}
