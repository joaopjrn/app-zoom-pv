export interface Usuario{
  _id: string;
  nome: string;
  email: string;
  tipo: number;
  materias: string[];
  verificado: boolean;
}
