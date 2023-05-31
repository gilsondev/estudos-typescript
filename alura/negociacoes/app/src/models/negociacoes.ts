import { Negociacao } from "./negociacao";

export class Negociacoes {
  private _negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao) {
    this._negociacoes.push(negociacao);
  }

  lista(): readonly Negociacao[] {
    return this._negociacoes;
  }
}
