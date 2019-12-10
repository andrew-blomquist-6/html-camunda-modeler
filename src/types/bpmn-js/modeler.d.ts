
declare module 'bpmn-js/lib/Modeler' {
  import { default as Viewer, ErrorHandler } from 'bpmn-js/lib/Viewer';

  export default class Modeler extends Viewer {
    /**
     * Create a new diagram to start modeling.
     */
    createDiagram(done?: ErrorHandler): any;
  }
}
