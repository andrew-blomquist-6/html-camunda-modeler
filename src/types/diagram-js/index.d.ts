// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js' {
  import { Module, Injector } from 'didi';

  export interface DiagramOptions {
    modules?: Module[];
  }

  export default class Diagram {
    constructor(options?: DiagramOptions, injector?: Injector);

    get: Injector['get'];
    invoke: Injector['invoke'];

    destroy();
    clear();
  }
}
