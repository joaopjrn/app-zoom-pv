const Usuario = require('../schemas/usuario');

exports.buscarUsuario = (req, res, next) => {
  Usuario.findOne({email: req.params.email}).then(result => {
    console.log("usuario buscado: "+result)
    if(!result){
      if(req.params.email.includes('@saojudas.br') || req.params.email.includes('@aluno.saojudas.br')){
        return res.status(200).json({msg: 'Usuário não existe', dadosUsuario: null, valido: true});
      }else{
        return res.status(200).json({msg: 'Usuário não existe', dadosUsuario: null, valido: false});
      }
    }
    const dadosUsuario = {
      _id: result._id,
      nome: result.nome,
      email: result.email,
      tipo: result.tipo,
      materias: JSON.parse(result.materias)
    }
    res.status(200).json({msg: 'Usuário encontrado', dadosUsuario: dadosUsuario, valido: true});
  });
}

exports.criarUsuario = (req, res, next) => {
  // this.usuario.email.includes('@saojudas.br') ? 0 : 1,
  const novoUsuario = new Usuario({
    nome: req.body.name,
    email: req.body.email,
    tipo: req.body.email.includes('@saojudas.br') ? 0 : 1,
    materias: JSON.stringify([])
  });

  novoUsuario.save()
  .then(usuarioCriado => {
    console.log("retorno do save(): ")
    console.log(usuarioCriado)
    res.status(201).json({msg: 'Usuário criado com sucesso', dados: usuarioCriado});
  })
  .catch(erro => {
    res.status(500).json({msg: 'Erro ao criar usuário!', erro: erro});
  });
}

exports.atualizarUsuario = (req, res, next) => {
  console.log('atualizar usuario controller usuario');
  console.log(req.body);
  const usuarioAtualizado = new Usuario({
    _id: req.body._id,
    nome: req.body.nome,
    email: req.body.email,
    tipo: req.body.tipo,
    materias: JSON.stringify(req.body.materias)
  });

  Usuario.updateOne({ _id: req.body._id }, usuarioAtualizado)
    .then(usuarioNoBanco => {
      console.log(usuarioNoBanco);
      res.status(201).json({ msg: 'Usuário atualizado com sucesso!' });
    });
}
