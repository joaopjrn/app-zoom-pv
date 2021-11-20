const Conversa = require('../schemas/conversa');
const Mensagem = require('../schemas/mensagem');

exports.criarMensagem = (req, res, next) => {
  console.log('enviando mensagem')
  const msg = new Mensagem({
    idConversa: req.body.idConversa,
    idEnviou: req.body.idEnviou,
    conteudo: req.body.conteudo
  });

  msg.save().then(resultado => {
    console.log(resultado);
    res.status(200).json({msg: 'Mensagem enviada!', dados: resultado})
  })
  .catch(erro => {
    res.status(500).json({msg: erro})
  });
}

  exports.buscarMensagens = (req, res, next) => {
  Mensagem.find({idConversa: req.params.idConversa})
  .then(resultado => {
    console.log(resultado);
    const msgs = resultado.reverse();
    res.status(200).json({msg: 'Mensagens encontradas!', dados: msgs})
  })
  .catch(erro => {
    res.status(500).json({msg: erro})
  });
}

exports.buscarConversas = (req, res, next) => {
  Conversa.find({idMateria: req.params.idMateria})
  .then(resultado => {
    console.log(resultado);
    res.status(200).json({msg: 'Conversas encontradas!', dados: resultado})
  })
  .catch(erro => {
    res.status(500).json({msg: erro})
  });
}

exports.buscarConversa = (req, res, next) => {
  console.log(req.params)
  Conversa.findOne({idMateria: req.params.idMateria, "aluno.id": req.params.idAluno})
  .then(resultado => {
    console.log(resultado);
    res.status(200).json({msg: 'Conversa encontrada!', dados: resultado})
  })
  .catch(erro => {
    res.status(500).json({msg: erro})
  });
}

exports.criarConversa = (req, res, next) => {
  const conversa = new Conversa({
    idMateria: req.body.idMateria,
    professor: req.body.professor,
    aluno: req.body.aluno,
    notifProf: false,
    notifAluno: false
  });

  conversa.save()
  .then(resultado => {
    console.log(resultado)
    res.status(201).json({msg: 'Conversa criada com sucesso', dados: resultado})
  })
  .catch(erro => {
    res.status(500).json({msg: erro})
  });
}
