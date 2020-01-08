// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/command/CommandHandler.js' {
  import {Base} from 'diagram-js/lib/model';

  export default class CommandHandler {
    execute(context: any): Base[];
    canExecute(context: any): boolean;
    preExecute(context: any);
    postExecute(context: any);
    revert(context: any): Base[];
  }
}
