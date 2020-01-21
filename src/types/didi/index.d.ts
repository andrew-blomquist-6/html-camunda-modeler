// https://github.com/nikku/didi

declare module 'didi' {
  type ProvidersArray = [string, 'factory' | 'value' | 'type', any][];
  export class Module {
    factory(name: string, factory: any): Module;
    value(name: string, value: any): Module;
    type(name: string, type: any): Module;
    forEach(iterator: (currentValue: any, index?: number, array?: ProvidersArray[], thisArg?: object) => void);
  }

  export class Injector {
    constructor(modules: Module[], parent: Injector);
    /**
     * @param name    the name of the service
     * @param strict  defaults to true. If false, resolve missing services to null
     */
    get<T>(name: string, strict?: boolean): T;
    /**
     * @param context defaults to the global object in non-strict mode when null or undefined
     * @param locals  defaults to an empty object
     */
    invoke(func: (...args) => any, context?: object, locals?: object): any;
    instantiate(Type: (...args) => any): any;
    createChild(modules: Module[], forceNewInstances: string[]): Injector;
  }
}
