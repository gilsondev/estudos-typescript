import { NegociacaoDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {
  public async obterNegociacoes(): Promise<Negociacao[]> {
    const res = await fetch("http://localhost:8080/dados");
    const listaDados = (await res.json()) as NegociacaoDoDia[];
    return listaDados.map(
      (dado) => new Negociacao(new Date(), dado.vezes, dado.montante)
    );
  }
}
