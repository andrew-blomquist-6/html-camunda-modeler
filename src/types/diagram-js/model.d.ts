
declare module 'diagram-js/lib/model' {
  export class Base {
    businessObject: any;
    label: any;
    labels: Label[];
    parent: Shape;
    outgoing: Connection[];
    incoming: Connection[];
  }

  export class Shape extends Base {
    children: Base[];
    host: Shape;
    attachers: Shape;
  }
  export class Root extends Shape {}
  export class Label extends Shape {
    labelTarget: Base;
  }
  export class Connection extends Base {
    source: Base;
    target: Base;
  }

  export function create(type: string, attrs: any);
}
