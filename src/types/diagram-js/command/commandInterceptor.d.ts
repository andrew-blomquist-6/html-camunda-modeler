// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/command/CommandInterceptor.js' {
  import EventBus from 'diagram-js/lib/core/EventBus.js';

  export default class CommandInterceptor {
    constructor(eventBus: EventBus);

    on(events: string | string[], hook: string, priority: number, handlerFn: (event: any) => void, unwrap: boolean, that: any);
    on(events: string | string[], priority: number, handlerFn: (event: any) => void, unwrap: boolean, that: any);
    on(events: string | string[], handlerFn: (event: any) => void, that: any);

    // hook shortcuts
    canExecute(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    canExecute(priority: number, handlerFn: () => void, unwrap: boolean, that: any);

    preExecute(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    preExecute(priority: number, handlerFn: () => void, unwrap: boolean, that: any);

    preExecuted(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    preExecuted(priority: number, handlerFn: () => void, unwrap: boolean, that: any);


    execute(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    execute(priority: number, handlerFn: () => void, unwrap: boolean, that: any);


    executed(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    executed(priority: number, handlerFn: () => void, unwrap: boolean, that: any);


    postExecute(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    postExecute(priority: number, handlerFn: () => void, unwrap: boolean, that: any);


    postExecuted(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    postExecuted(priority: number, handlerFn: () => void, unwrap: boolean, that: any);


    revert(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    revert(priority: number, handlerFn: () => void, unwrap: boolean, that: any);

    reverted(events: string | string[], priority: number, handlerFn: () => void, unwrap: boolean, that: any);
    reverted(priority: number, handlerFn: () => void, unwrap: boolean, that: any);
  }
}
