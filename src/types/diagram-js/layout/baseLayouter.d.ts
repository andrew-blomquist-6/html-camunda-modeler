// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/layout/BaseLayouter.js' {
  import {Connection} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  export interface LayoutConnectionHints {
    connectionStart: Point;
    connectionEnd: Point;
    source: Point;
    target: Point;
  }

  export default class BaseLayouter {
    layoutConnection(connection: Connection, hints?: LayoutConnectionHints): Point[];
  }
}
