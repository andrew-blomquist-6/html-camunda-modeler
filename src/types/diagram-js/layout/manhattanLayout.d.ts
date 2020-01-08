// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/layout/ManhattanLayout.js' {
  import {Point} from 'diagram-js/lib/util/Geometry.js';
  import {Bounds} from 'diagram-js/lib/layout/LayoutUtil.js';

  // specifies manhattan directions for two points (a and b) in the format '{a-direction}:{b-direction}'
  export type ManhattanDirections = 'h:h' | 'v:v' | 'h:v' | 'v:h';

  export interface ManhattanLayoutHints {
    preserveDocking?: string;
    preferredLayouts?: string[];
    connectionStart?: Point | boolean;
    connectionEnd?: Point | boolean;
  }

  export function connectPoints(a: Point, b: Point, directions: ManhattanDirections): Point[];
  export function connectRectangles(source: Bounds, target: Bounds, start: Point, end: Point, hints: ManhattanLayoutHints): Point[];
  export function connectRectangles(source: Bounds, target: Bounds, hints: ManhattanLayoutHints): Point[];
  export function repairConnection(source: Bounds, target: Bounds, start: Point, end: Point, waypoints?: Point[], hints?: ManhattanLayoutHints): Point[];
  export function repairConnection(source: Bounds, target: Bounds, waypoints?: Point[], hints?: ManhattanLayoutHints): Point[];
  export function tryLayoutStraight(source: Bounds, target: Bounds, start: Point, end: Point, hints: ManhattanLayoutHints): Point[] | null;
  export function withoutRedundantPoints(waypoints: Point[]): Point[];
}
