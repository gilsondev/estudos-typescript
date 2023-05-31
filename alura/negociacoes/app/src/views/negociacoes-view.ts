import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";
import { Negociacao } from "../models/negociacao.js";
import { escape } from "../decorators/escape.js";

export class NegociacoesView extends View<Negociacoes> {
  @escape
  protected template(model: Negociacoes): string {
    return `
            <table class="table table-hover table-bovered">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.listarNegociacoes(model.lista())}
                </tbody>
            </table>
        `;
  }

  private listarNegociacoes(negociacoes: readonly Negociacao[]): string {
    return `
            ${negociacoes
              .map((item) => {
                return `
                <tr>
                    <td>${this.formatar(item.data)}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.valor}</td>
                </tr>
            `;
              })
              .join("")}
        `;
  }

  private formatar(data: Date): string {
    return new Intl.DateTimeFormat().format(data);
  }
}
