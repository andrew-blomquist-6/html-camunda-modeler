// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/core' {
  export default class CoreModule {
    // tslint:disable-next-line:variable-name
    __depends__: any[];
    // tslint:disable-next-line:variable-name
    __init__: any[];
    canvas: any[];
    elementRegistry: any[];
    elementFactory: any[];
    eventBus: any[];
    graphicsFactory: any[];
  }
}
