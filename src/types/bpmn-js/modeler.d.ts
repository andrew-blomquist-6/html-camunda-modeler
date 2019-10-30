
declare module 'bpmn-js/lib/Modeler' {
  import { default as Viewer, ErrorHandler } from 'bpmn-js/lib/Viewer';

  export default class Modeler extends Viewer {
    // tslint:disable-next-line:variable-name
    _interactionModules: any[];
    // tslint:disable-next-line:variable-name
    _modelingModules: any[];

    /**
     * Create a new diagram to start modeling.
     */
    createDiagram(done?: ErrorHandler): any;

    /**
     * Collect ids processed during parsing of the definitions object.
     */
    _collectIds(definitions: { $model: any }, context: { elementsById: any[] });
  }
}
