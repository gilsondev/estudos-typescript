import { View } from "./view.js";
export class NegociacoesView extends View {
    template(model) {
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
    listarNegociacoes(negociacoes) {
        return `
            ${negociacoes.map(item => {
            return `
                <tr>
                    <td>${this.formatar(item.data)}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.valor}</td>
                </tr>
            `;
        }).join('')}
        `;
    }
    formatar(data) {
        return new Intl.DateTimeFormat().format(data);
    }
}
