export function logarTempoDeExecucao(emSegundos = false) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unidade = "milisegundos";
            if (emSegundos) {
                divisor = 1000;
                unidade = "segundos";
            }
            const t1 = performance.now();
            const returnValue = originalMethod.apply(this, args);
            const t2 = performance.now();
            console.log(`O tempo gasto foi do método ${propertyKey} foi de ${(t2 - t1) / divisor} ${unidade}`);
            returnValue;
        };
        return descriptor;
    };
}
