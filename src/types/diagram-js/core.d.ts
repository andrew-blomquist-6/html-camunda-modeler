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

declare module 'diagram-js/lib/core/Canvas.js' {
  import {Point} from 'bpmn-moddle';
  import EventBus from 'diagram-js/lib/core/EventBus.js';
  import GraphicsFactory from 'diagram-js/lib/core/GraphicsFactory.js';
  import ElementRegistry from 'diagram-js/lib/core/ElementRegistry.js';
  import {Base, Connection, Root, Shape} from 'diagram-js/lib/model';

  export default class Canvas {
    constructor(config?: any, eventBus?: EventBus, graphicsFactory?: GraphicsFactory, elementRegistry?: ElementRegistry);

    getDefaultLayer(): SVGElement;
    getLayer(name: string, index: number): SVGElement;
    getContainer(): HTMLElement;

    addMarker(element: string | Base, marker: string);
    removeMarker(element: string | Base, marker: string);
    hasMarker(element: string | Base, marker: string): boolean;
    toggleMarker(element: string | Base, marker: string);
    // tslint:disable-next-line:ban-types
    getRootElement(): Object | Root;
    // tslint:disable-next-line:ban-types
    setRootElement(element: Object | Root, override: boolean): Object | Root;

    addShape(shape: Shape, parent: Base, parentIndex: number);
    addConnection(connection: Connection, parent: Base, parentIndex: number);
    removeShape(shape: Shape): Shape;
    removeConnection(connection: Connection): Connection;

    getGraphics(element: string | Base, secondary: boolean): SVGElement;
    viewbox(box?: { x: number, y: number, width: number, height: number }): any;
    scroll(delta: { dx: number, dy: number }): { x: number, y: number };
    zoom(newScale: string | number, center: string | Point): number;
    getSize(): { width: number, height: number };
    getAbsoluteBBox(element: any): { x: number, y: number, width: number, height: number };
    resized();
  }
}

declare module 'diagram-js/lib/core/ElementFactory.js' {
  import {Connection, Label, Root, Shape} from 'diagram-js/lib/model';

  export default class ElementFactory {
    constructor();

    createRoot(attrs: any): Root;
    createLabel(attrs: any): Label;
    createShape(attrs: any): Shape;
    createConnection(attrs: any): Connection;
    create(type: string, attrs: any);
  }
}

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

declare module 'diagram-js/lib/core/EventBus.js' {
  export default class EventBus {
    constructor();

    /**
     * @param [events] either a single event name or list of event names to add the callback as a listener to
     * @param [callback] the function that will be called when any of the passed events are fired
     * @param [that] if set, the callback function will be bound to it
     */
    on(events: string | string[], callback: () => void, that?: any);
    on(events: string | string[], priority: number, callback: () => void, that?: any);

    once(event: string, callback: () => void, that: any);
    once(event: string, priority: number, callback: () => void, that: any);

    off(events: string | string[], callback: () => void);

    createEvent(data: any): InternalEvent;

    /**
     * @param [name] can either be the name of a registered event, or an event object TODO: can we type out an "event" object?
     * @param [additional] arguments to be passed to the callback functions watching the fired event
     */
    fire(name: string | { type: string }, ...additional: any): boolean;

    handleError(error: any): boolean;
  }

  export class InternalEvent {
    constructor();

    stopPropagation();
    preventDefault();
    init(data: any);
  }
}

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
