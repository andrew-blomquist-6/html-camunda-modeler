// https://github.com/bpmn-io/diagram-js

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
