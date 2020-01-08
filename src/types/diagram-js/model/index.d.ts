// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/model' {
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  export class Base {
    id: string;
    businessObject: any;
    label: any;
    labels: Label[];
    parent: Shape;
    outgoing: Connection[];
    incoming: Connection[];
  }

  export class Shape extends Base {
    isFrame: boolean;
    children: Base[];
    host: Shape;
    attachers: Shape;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }
  export class Root extends Shape {}
  export class Label extends Shape {
    labelTarget: Base;
  }
  export class Connection extends Base {
    source: Base;
    target: Base;
    waypoints?: Point[];
  }

  export function create(type: string, attrs: any);
}
