// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/layout/ConnectionDocking.js' {
  import {Base, Connection, Shape} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  export interface DockingPointDescriptor {
    point: Point;
    actual: Point;
    idx: number;
  }

  export default class ConnectionDocking {
    getCroppedWaypoints(connection: Connection, source: Base, target: Base): Point[];
    getDockingPoint(connection: Connection, shape: Shape, dockStart?: boolean): DockingPointDescriptor;
  }
}
