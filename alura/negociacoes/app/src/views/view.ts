import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export abstract class View<T> {
  protected element: HTMLElement;

  constructor(selector: string) {
    const element = document.querySelector(selector);

    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw Error(`Selector ${element} does not exists`);
    }
  }

  protected abstract template(model: T): string;

  @logarTempoDeExecucao()
  @inspect
  public update(model: T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  }
}
