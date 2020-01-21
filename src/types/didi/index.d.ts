// https://github.com/nikku/didi

declare module 'didi' {
  type ProvidersArray = [string, 'factory' | 'value' | 'type', any][];
  type unknownFunction = (...args: any[]) => any;
  type unknownClass = new (...args: any[]) => any;
  type unknownFunctionOrClass = unknownFunction | unknownClass;

  export class Module {
    factory(name: string, factory: any): Module;
    value(name: string, value: any): Module;
    type(name: string, type: any): Module;
    forEach(iterator: (currentValue: any, index?: number, array?: ProvidersArray[], thisArg?: object) => void);
  }

  export class Injector {
    constructor(modules: (Module | object)[], parent?: Injector);
    /**
     * @param name    the name of the service
     * @param strict  defaults to true. If false, resolve missing services to null
     */
    get<T>(name: string, strict?: boolean): T;
    /**
     * @param context defaults to the global object in non-strict mode when null or undefined
     * @param locals  defaults to an empty object
     */
    invoke(func: unknownFunction, context?: object, locals?: object): any;
    instantiate(Type: unknownFunction): any;
    createChild(modules: Module[], forceNewInstances: string[]): Injector;
  }

  // annotation.js
  /**
   * Accepts a variable amount of arguments. The last argument should be the function to annotate.
   * The first argument can be an array of arguments.
   * Otherwise, each argument except the last is treated as arguments for the function to annotate.
   *
   * @returns the passed function
   */
  export function annotate(args: any[], fn: unknownFunctionOrClass): unknownFunctionOrClass;
  export function annotate(...args: any[]): unknownFunctionOrClass;
  export function parseAnnotations(fn: unknownFunctionOrClass): any[];
}
