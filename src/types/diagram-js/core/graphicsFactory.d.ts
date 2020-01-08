// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/core/GraphicsFactory.js' {
  import EventBus from 'diagram-js/lib/core/EventBus.js';
  import ElementRegistry from 'diagram-js/lib/core/ElementRegistry.js';

  export default class GraphicsFactory {
    constructor(eventBus: EventBus, elementRegistry: ElementRegistry);

    create(type: any, element: any, parentIndex: any): any;
    updateContainments(elements: any);
    drawShape(visual: any, element: any): boolean;
    getShapePath(element: any): boolean;
    drawConnection(visual: any, element: any): boolean;
    getConnectionPath(waypoints: any): boolean;
    update(type: any, element: any, gfx: any);
    remove(element: any);
  }
}
