// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/core/ElementRegistry.js' {
  import EventBus from 'diagram-js/lib/core/EventBus.js';

  export default class ElementRegistry {
    constructor(eventBus: EventBus);

    add(element: any, gfx: SVGElement, secondaryGfx: SVGElement);
    remove(element: any);
    updateId(element: any, newId: string);
    get(filter: string | SVGElement): any;
    filter(fn: (element: any, gfx: SVGElement) => any): any[];
    getAll(): any[];
    forEach(fn: (element: any, gfx: SVGElement) => any);
    getGraphics(filter: any, secondary?: boolean): any;
  }
}
