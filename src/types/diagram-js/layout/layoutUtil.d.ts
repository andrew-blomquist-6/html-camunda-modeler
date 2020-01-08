// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/layout/LayoutUtil.js' {
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  export interface Bounds extends Point {
    width: number;
    height: number;
  }

  export interface TRBL {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }

  export function roundBounds(bounds: Bounds): Bounds;
  export function roundPoint(point: Point): Point;
  export function asTRBL(bounds: Bounds | Point): TRBL;
  export function asBounds(trbl: TRBL): Bounds;
  export function getMid(bounds: Bounds | Point): Point;
  export function getOrientation(rect: Bounds, reference: Bounds, padding?: Point | number): string;
  // TODO: figure out where the type PathDef comes from
  export function getElementLineIntersection(elementPath: any, linePath: any, cropStart: boolean): Point;
  export function getIntersections(a: any, b: any): any[];
  export function filterRedundantWaypoints(waypoints: Point[]): Point[];
}
