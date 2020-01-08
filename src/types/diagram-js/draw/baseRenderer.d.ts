// https://github.com/bpmn-io/diagram-js\

// TODO: flesh this out once djs and Snap are typed out
declare module 'diagram-js/lib/BaseRenderer.js' {
  import EventBus from 'diagram-js/lib/core/EventBus.js';
  import {Base, Connection, Shape} from 'diagram-js/lib/model';

  export default class BaseRenderer {
    constructor(eventBus: EventBus, priority?: number);
    canRender(element: Base): boolean;
    drawShape(visuals: any, shape: Shape): any;
    drawConnection(visuals: any, connection: Connection): any;
    getShapePath(shape: Shape): string;
    getConnectionPath(connection: Connection): string;
  }
}
