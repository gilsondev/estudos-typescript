export function escape(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    let retorno = originalMethod.apply(this, args);

    if (typeof retorno === "string") {
      console.log(`@escape em acao na classe ${this.constructor.name} 
      para o método ${propertyKey}`);
      retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, "");
    }

    return retorno;
  };

  return descriptor;
}
