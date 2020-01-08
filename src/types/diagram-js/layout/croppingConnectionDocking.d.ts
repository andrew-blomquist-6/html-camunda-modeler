// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/layout/CroppingConnectionDocking.js' {
  import ElementRegistry from 'diagram-js/lib/core/ElementRegistry.js';
  import GraphicsFactory from 'diagram-js/lib/core/GraphicsFactory.js';
  import ConnectionDocking from 'diagram-js/lib/layout/ConnectionDocking.js';

  export default class CroppingConnectionDocking extends ConnectionDocking {
    constructor(elementRegistry: ElementRegistry, graphicsFactory: GraphicsFactory);
  }
}
