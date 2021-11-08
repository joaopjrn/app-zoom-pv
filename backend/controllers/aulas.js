const Aula = require('../schemas/aula');

exports.criarAula = (req, res, next) => {
  const aula = new Aula({
    nome:req.body.nome,
    idMateria: req.body.idMateria,
    conteudo: req.body.conteudo,
    data: req.body.data,
    linkZoom: "www.google.com.br"
  });

  aula.save().then(aulaCriada => {
    aulaCriada.data = new Date(aulaCriada.data);
    console.log(aulaCriada);
    res.status(201).json({ msg: "Aula criada com sucesso!", aula:  aulaCriada  });
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
        linkZoom: aula.linkZoom
      }  
    });
    
    res.status(200).json({ msg: "Aulas encontradas com sucesso!", aulas: aulas });
  });
}

