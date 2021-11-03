import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Aula } from "../models/aula.model";

const BACKEND_URL = environment.apiUrl + "/aula/";
@Injectable({ providedIn: 'root' })
export class AulasService {
  constructor(private http: HttpClient) {}
 
  novaAula(nome: string, idMateria: string, conteudo: string, data: string, hora: string) {
    const aula = {
      nome: nome,
      idMateria: idMateria,
      conteudo: conteudo,
      data: data,
      hora: hora
    }
    return this.http.post<{msg: string, aula: Aula}>(BACKEND_URL, aula);
  }
}
