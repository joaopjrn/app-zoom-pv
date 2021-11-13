const Anotacao = require('../schemas/anotacao');

exports.criarAnotacao = (req, res, next) => {
  const anotacao = new Anotacao({
    // idAula: req.body.idAula,
    // idUsuario: req.body.idUsuario,
    codigo: req.body.codigo,
    conteudo: req.body.conteudo
  });

  anotacao.save().then(anotacaoCriada => {
    console.log(anotacaoCriada)
    return res.status(200).json({msg: 'Anotação criada com sucesso!', anotacao: anotacaoCriada });
  }).catch(erro => {
    res.status(500).json({msg: 'Erro ao criar anotação!', erro: erro})
  })
}

exports.buscarAnotacao = (req, res, next) => {
  Anotacao.findOne({codigo: req.params.codigo}).then(anotacaoBuscada => {
    console.log(anotacaoBuscada)
    return res.status(200).json({msg: 'Anotação buscada com sucesso!', anotacao: anotacaoBuscada})
  }).catch(erro => {
    res.status(500).json({msg: 'Erro ao carregar anotação!', erro: erro})
  })
}

exports.alterarAnotacao = (req, res, next) => {
  const anotacao = new Anotacao(req.body);
  console.log(anotacao)
  Anotacao.updateOne({_id: anotacao._id}, anotacao).then(result => {
    if(result.modifiedCount > 0){
      res.status(200).json({msg: 'Anotação atualizada com sucesso!', alterada: true})
    }
  })
  .catch(erro => {
    res.status(500).json({msg: 'Erro ao atualizar anotação!', erro: erro})
  });
}

exports.excluirAnotacao = (req, res, next) => {
  Anotacao.deleteOne({_id: req.params.id}).then(result => {
    if(result.deletedCount > 0){
      res.status(200).json({msg: 'Anotação excluída com sucesso!', dados: result})
    }
  })
  .catch(erro => {
    res.status(500).json({msg: 'Erro ao excluir anotação!', erro: erro})
  });
}
