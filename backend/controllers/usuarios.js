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
      materias: result.materias,
      verificado: result.verificado
    }
    res.status(200).json({msg: 'Usuário encontrado!', dadosUsuario: dadosUsuario, valido: true});
  }).catch(erro => {
    res.status(500).json({msg: 'Usuário não encontrado!', erro: erro});
  });
}

exports.criarUsuario = (req, res, next) => {
  // this.usuario.email.includes('@saojudas.br') ? 0 : 1,
  const novoUsuario = new Usuario({
    nome: req.body.name,
    email: req.body.email,
    tipo: req.body.email.includes('@saojudas.br') ? 0 : 1,
    materias: [],
    verificado: false
  });

  novoUsuario.save()
  .then(usuarioCriado => {
    console.log("retorno do save(): ")
    const usuario = {
      _id: usuarioCriado._id,
      nome: usuarioCriado.nome,
      email: usuarioCriado.email,
      tipo: usuarioCriado.tipo,
      materias: usuarioCriado.materias,
      verificado: usuarioCriado.verificado
    }
    res.status(201).json({msg: 'Usuário criado com sucesso!', dados: usuario});
  })
  .catch(erro => {
    res.status(500).json({msg: 'Erro ao criar usuário!', erro: erro});
  });
}

exports.controleTurma = (req, res, next) => {
  console.log('atualizar usuario controller usuario');
  console.log(req.body)
  // if(req.body.novaTurma){
    console.log('atualizando apenas array de matérias')
    let query, msg;
    if(req.body.entrar){
      query = Usuario.updateOne({_id: req.body.idUsuario}, {$addToSet: {materias: req.body.idMateria}})
      msg = ' entrou na turma ';
    }else{
      query = Usuario.updateOne({_id: req.body.idUsuario}, {$pull: {materias: req.body.idMateria}})
      msg = ' saiu da turma ';
    }
    query
    .then(result => {
      console.log(result)
      if(result.matchedCount > 0 && result.modifiedCount > 0){
        return res.status(201).json({ msg: 'Usuário'+msg+'com sucesso!', atualizado: true });
      } else if(result.matchedCount > 0 && result.modifiedCount == 0){
        return res.status(201).json({ msg: 'Usuário já está cadastrado nessa turma!', atualizado: false });
      }
    })
    .catch(erro => {
      res.status(500).json({msg: 'Erro ao se juntar à turma!', erro: erro});
    });
}

exports.confirmarVerificado = (req, res, next) => {
  Usuario.updateOne({email: req.body.email}, {$set:{verificado: true}})
  .then(result => {
    console.log(result);
    return res.status(201).json({msg: 'Usuário verificado com sucesso', dados: result});
  })
  .catch(erro => {
    res.status(500).json({msg: 'Incapaz de verificar o usuário', erro: erro});
  });
}


// exports.controleTurma = (req, res, next) => {
//   console.log('atualizar usuario controller usuario');
//   console.log(req.body)
//   // if(req.body.novaTurma){
//     console.log('atualizando apenas array de matérias')
//     Usuario.updateOne({_id: req.body.idUsuario}, {$addToSet: {materias: req.body.idMateria}}).then(result => {
//       console.log(result)
//       if(result.matchedCount > 0 && result.modifiedCount > 0){
//         return res.status(201).json({ msg: 'Usuário entrou na turma com sucesso!', atualizado: true });
//       } else if(result.matchedCount > 0 && result.modifiedCount == 0){
//         return res.status(201).json({ msg: 'Usuário já está cadastrado nessa turma!', atualizado: false });
//       }
//     })
//     .catch(erro => {
//       res.status(500).json({msg: 'Erro ao se juntar à turma!', erro: erro});
//     });
//   // }else{
//   //   console.log(req.body);
//   //   const usuarioAtualizado = new Usuario({
//   //     _id: req.body._id,
//   //     nome: req.body.nome,
//   //     email: req.body.email,
//   //     tipo: req.body.tipo,
//   //     materias: req.body.materias
//   //   });

//   //   Usuario.updateOne({ _id: req.body._id }, usuarioAtualizado)
//   //     .then(usuarioNoBanco => {
//   //       if(usuarioNoBanco.matchedCount > 0){
//   //         res.status(201).json({ msg: 'Usuário atualizado com sucesso!', atualizado: true });
//   //       }
//   //     }).catch(erro => {
//   //       res.status(500).json({msg: 'Erro ao atualizar usuário', erro: erro});
//   //     });
//   // }
// }
