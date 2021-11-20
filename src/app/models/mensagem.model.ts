export interface Mensagem {
  _id: string;
  idConversa: string;
  idEnviou: string;
  conteudo: string;
  createdAt: Date;
}
