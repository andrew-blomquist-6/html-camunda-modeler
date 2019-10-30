
declare module 'didi' {
  export class Module {
    factory(name: any, factory: any): any;
    value(name: any, value: any): any;
    type(name: any, type: any): any;
    forEach(iterator: any);
  }

  export class Injector {
    constructor(modules: any, parent: any);
    get(name: string, strict: boolean): any;
    invoke(func: any, context: any, locals: any): any;
    instantiate(Type: any);
    createChild(modules: any, forceNewInstances: any);
  }

  export function annotate(...args): (...args) => any;

  export function parseAnnotations(fn: (...args) => any): any;
}
