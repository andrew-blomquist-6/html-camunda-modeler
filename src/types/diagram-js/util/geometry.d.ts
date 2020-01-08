// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/util/Geometry.js' {
  export interface Point {
    x: number;
    y: number;
  }
  export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  /**
   * Computes the distance between two points
   * @param a
   * @param b
   */
  export function pointDistance(a: Point, b: Point): number;

  /**
   * Returns true if the point r is on the line between p and q
   * @param p
   * @param q
   * @param r
   * @param accuracy [accuracy=5] accuracy for points on line check (lower is better)
   */
  export function pointsOnLine(p: Point, q: Point, r: Point, accuracy?: number): boolean;

  /**
   * Check whether two points are horizontally or vertically aligned. Can pass the two points as separate params or in a single array.
   * @param a
   * @param b
   */
  export function pointsAligned(a: Point | Point[], b?: Point): 'h' | 'v' | boolean;

  /**
   * Check whether two points are horizontally aligned. Can pass the two points as separate params or in a single array.
   * @param a
   * @param b
   */
  export function pointsAlignedHorizontally(a: Point | Point[], b?: Point): boolean;

  /**
   * Check whether two points are vertically aligned. Can pass the two points as separate params or in a single array.
   * @param a
   * @param b
   */
  export function pointsAlignedVertically(a: Point | Point[], b?: Point): boolean;

  /**
   * Returns true if the point p is inside the rectangle rect.
   * @param p
   * @param rect
   * @param tolerance [tolerance=0] higher is more tolerant, 0 is exact
   */
  export function pointInRect(p: Point, rect: Rect, tolerance?: number): boolean;

  /**
   * Returns a point in the middle of points p and q
   * @param p
   * @param q
   */
  export function getMidPoint(p: Point, q: Point): Point;
}
