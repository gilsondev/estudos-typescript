export function logarTempoDeExecucao(emSegundos: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: Array<any>) {
      let divisor = 1;
      let unidade = "milisegundos";

      if (emSegundos) {
        divisor = 1000;
        unidade = "segundos";
      }

      const t1 = performance.now();
      const returnValue = originalMethod.apply(this, args);
      const t2 = performance.now();

      console.log(
        `O tempo gasto foi do método ${propertyKey} foi de ${
          (t2 - t1) / divisor
        } ${unidade}`
      );
      returnValue;
    };

    return descriptor;
  };
}
