export interface Conversa {
  _id: string;
  idMateria: string;
  aluno: {
    id: string,
    nome: string
  },
  professor: string,
  notifAluno?: boolean,
  notifProf?: boolean
}
