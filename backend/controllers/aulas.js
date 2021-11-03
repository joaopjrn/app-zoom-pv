const Aula = require('../schemas/aula');

exports.criarAula = (req, res, next) => {
  const aula = new Aula({
    nome:req.body.nome,
    idMateria: req.body.idMateria,
    conteudo: req.body.conteudo,
    data: req.body.data,
    hora: req.body.hora,
    linkZoom: "www.google.com.br"
  });

  aula.save().then(aulaCriada => {
    console.log(aulaCriada);
    res.status(201).json({ msg: "Aula criada com sucesso!", aula: { ...aulaCriada, _id: aulaCriada._id } })
      .catch(erro => {
        res.status(500).json({ msg: "Falha ao criar aula!" });
      });
  })
}