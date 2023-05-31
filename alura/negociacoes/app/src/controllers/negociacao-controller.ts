import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
import { DiaDaSemana } from "../enums/dia-da-semana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { domInjector } from "../decorators/dom-injector.js";
import { NegociacaoDoDia } from "../interfaces/negociacao-do-dia.js";
import { NegociacoesService } from "../services/negociacoes-service.js";

export class NegociacaoController {
  @domInjector("#data")
  private inputData: HTMLInputElement;

  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement;

  @domInjector("#valor")
  private inputValor: HTMLInputElement;
  private negociacoes: Negociacoes = new Negociacoes();
  private negociacoesView: NegociacoesView = new NegociacoesView(
    "#negociacoesView"
  );
  private mensagemView: MensagemView = new MensagemView("#mensagemView");
  private negociacaoService: NegociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @logarTempoDeExecucao()
  public adiciona(): void {
    const negociacao = this.criaNegociacao();
    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apenas negociações em dias úteis são aceitas");
      return;
    }

    this.negociacoes.adiciona(negociacao);
    this.atualizaView();
    this.limparFormulario();
  }

  public importarDados(): void {
    this.negociacaoService
      .obterNegociacoes()
      .then((negociacoes: Negociacao[]) => {
        for (let negociacao of negociacoes) {
          this.negociacoes.adiciona(negociacao);
        }
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private ehDiaUtil(data: Date): boolean {
    return (
      data.getDay() > DiaDaSemana.DOMINGO && data.getDay() < DiaDaSemana.SABADO
    );
  }

  private criaNegociacao(): Negociacao {
    return Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
  }

  public limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso");
  }
}
