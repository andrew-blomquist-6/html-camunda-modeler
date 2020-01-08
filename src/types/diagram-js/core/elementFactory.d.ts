// https://github.com/bpmn-io/diagram-js

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
