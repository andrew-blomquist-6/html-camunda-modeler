// https://github.com/nikku/didi

declare module 'didi' {
  export class Module {
    factory(name: any, factory: any): any;
    value(name: any, value: any): any;
    type(name: any, type: any): any;
    forEach(iterator: any);
  }

  export class Injector {
    constructor(modules: any, parent: any);
    /**
     * @param name    the name of the service
     * @param strict  defaults to true. If false, resolve missing services to null
     */
    get<T>(name: string, strict?: boolean): T;
    invoke(func: any, context: any, locals: any): any;
    instantiate(Type: any);
    createChild(modules: any, forceNewInstances: string[]);
  }

  export function annotate(...args): (...args) => any;

  export function parseAnnotations(fn: (...args) => any): any;
}
