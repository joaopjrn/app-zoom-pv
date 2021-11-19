const usuarios = {
  _id: 'asdasd',
  nome: 'asdasd',
  email: 'asdasd',
  senha: 'asdasd',
  tipo: 'sadasd',
  materias: ['idmateria1', 'idmateria2']
}

const materia = {
  _id: 'asdasd',
  nomeProf: 'asdasd',
  nome: 'asdasd',
  descricao: 'asdasd',
  diasSemana: [1,3,5],
}

const aula = {
  _id: 'asdasasd',
  idMateria: 'asdasdasd',
  nome: 'asdasd',
  conteudo: 'asdas',
  data: 'asdasd',
  hora: 'asdasd',
  linkZoom: 'asdasdasd'
}

const anotacao = {
  _id: 'asdasdasd',
  idAula: 'asdasdasd',
  idAluno: 'asdasdasd',
  conteudo: 'asdasdasd'
}

type conversa = {
  idMateria: string,
  aluno: { id: string, nome: string },
  professor: { id: string, nome: string },
  notifAluno: boolean,
  notifProf: boolean
};

type mensagem = {
  idEnviou: string;
  conteudo: string;
  createdAt: Date;
}