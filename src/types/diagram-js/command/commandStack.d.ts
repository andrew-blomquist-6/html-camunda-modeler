// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/command/CommandStack.js' {
  import EventBus from 'diagram-js/lib/core/EventBus.js';
  import CommandHandler from 'diagram-js/lib/command/CommandHandler.js';
  import {Injector} from 'didi';

  export default class CommandStack {
    constructor(eventBus: EventBus, injector: Injector);

    execute(command: string, context: any);
    canExecute(command: string, context: any): boolean;
    clear(emit: boolean);
    undo();
    canUndo(): boolean;
    redo();
    canRedo(): boolean;
    register(command: string, handler: CommandHandler);
    registerHandler(command: string, handlerCls: () => void);
  }
}
